import { NextResponse } from "next/server";

export const runtime = "nodejs";

/* =========================================================
   URL HELPERS
========================================================= */

function normalizeUrl(raw) {
  let u = String(raw || "").trim();

  if (!/^https?:\/\//i.test(u)) {
    u = `https://${u}`;
  }

  return u;
}

/* =========================================================
   BASIC HTML HELPERS
========================================================= */

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function countMatches(html, regex) {
  return (html.match(regex) || []).length;
}

function getFirstMatch(html, regex) {
  const match = html.match(regex);
  return match ? match[1]?.trim() || "" : "";
}

function extractYearsNearCopyright(html) {
  const years = [];

  const re =
    /(?:©|&copy;|copyright)[^\d]{0,30}((?:19|20)\d{2})/gi;

  let match;

  while ((match = re.exec(html)) !== null) {
    years.push(parseInt(match[1], 10));
  }

  return years;
}

/* =========================================================
   TECHNOLOGY DETECTION
========================================================= */

function detectTechnologies(html, headers) {
  const technologies = [];

  const checks = [
    {
      name: "Next.js",
      regex: /__next|_next\/static|next-router/i,
    },
    {
      name: "React",
      regex: /react|reactdom|data-reactroot/i,
    },
    {
      name: "Vue.js",
      regex: /vue\.js|vuejs|data-v-[a-z0-9]/i,
    },
    {
      name: "Angular",
      regex: /ng-version|angular\.js|angular/i,
    },
    {
      name: "Nuxt",
      regex: /__nuxt|nuxt/i,
    },
    {
      name: "WordPress",
      regex: /wp-content|wp-includes|wordpress/i,
    },
    {
      name: "Shopify",
      regex: /cdn\.shopify\.com|shopify/i,
    },
    {
      name: "Wix",
      regex: /wixstatic\.com|wix\.com/i,
    },
    {
      name: "Webflow",
      regex: /webflow/i,
    },
    {
      name: "Bootstrap",
      regex: /bootstrap/i,
    },
    {
      name: "Tailwind CSS",
      regex: /tailwind/i,
    },
    {
      name: "Material UI",
      regex: /mui|material-ui/i,
    },
    {
      name: "jQuery",
      regex: /jquery/i,
    },
    {
      name: "Google Analytics",
      regex: /google-analytics|gtag\(|googletagmanager/i,
    },
    {
      name: "Google Tag Manager",
      regex: /googletagmanager/i,
    },
    {
      name: "Facebook Pixel",
      regex: /connect\.facebook\.net|fbq\(/i,
    },
    {
      name: "Stripe",
      regex: /js\.stripe\.com|stripe/i,
    },
    {
      name: "Cloudflare",
      regex: /cloudflare/i,
    },
  ];

  for (const check of checks) {
    if (check.regex.test(html)) {
      technologies.push(check.name);
    }
  }

  const poweredBy = headers.get("x-powered-by");

  if (poweredBy) {
    technologies.push(`Server: ${poweredBy}`);
  }

  return [...new Set(technologies)];
}

/* =========================================================
   SCORE HELPERS
========================================================= */

function createScore() {
  return {
    design: 100,
    mobile: 100,
    seo: 100,
    performance: 100,
    accessibility: 100,
    security: 100,
    technical: 100,
    conversion: 100,
  };
}

function clampScore(score) {
  return Math.max(0, Math.min(100, Math.round(score)));
}

/* =========================================================
   GET API
========================================================= */

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const raw = searchParams.get("url");

  if (!raw) {
    return NextResponse.json(
      {
        error: "Missing url parameter",
      },
      { status: 400 }
    );
  }

  const targetUrl = normalizeUrl(raw);

  let parsedUrl;

  try {
    parsedUrl = new URL(targetUrl);
  } catch {
    return NextResponse.json(
      {
        error: "Invalid website URL",
      },
      { status: 400 }
    );
  }

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    return NextResponse.json(
      {
        error: "Only HTTP and HTTPS URLs are supported",
      },
      { status: 400 }
    );
  }

  /* =========================================================
     FETCH WEBSITE
  ========================================================= */

  let response;
  let html = "";
  let fetchError = null;

  const startedAt = Date.now();

  try {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 12000);

    response = await fetch(targetUrl, {
      redirect: "follow",
      signal: controller.signal,

      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; WebsiteAuditBot/1.0)",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },

      cache: "no-store",
    });

    clearTimeout(timeout);

    html = await response.text();
  } catch (error) {
    fetchError =
      error?.name === "AbortError"
        ? "Website request timed out"
        : error?.message || "Could not reach this website";
  }

  const loadTimeMs = Date.now() - startedAt;

  /* =========================================================
     WEBSITE UNREACHABLE
  ========================================================= */

  if (fetchError || !response) {
    return NextResponse.json({
      url: targetUrl,
      reachable: false,

      error: fetchError || "Website unreachable",

      score: null,

      verdict: "Website could not be analyzed",

      flags: [
        {
          label: "Website could not be reached",
          severity: "bad",
        },
      ],

      goodSignals: [],

      scores: null,
    });
  }

  /* =========================================================
     BASIC INFORMATION
  ========================================================= */

  const finalUrl = response.url || targetUrl;

  const headers = response.headers;

  const lowerHtml = html.toLowerCase();

  const textContent = stripHtml(html);

  const scores = createScore();

  const flags = [];

  const goodSignals = [];

  const recommendations = [];

  const criticalIssues = [];

  /* =========================================================
     HTTPS / SECURITY
  ========================================================= */

  if (finalUrl.startsWith("https://")) {
    goodSignals.push("Website uses HTTPS");

  } else {
    flags.push({
      label: "Website does not use HTTPS",
      severity: "bad",
      category: "Security",
    });

    criticalIssues.push(
      "HTTPS should be enabled"
    );

    scores.security -= 30;
  }

  /* HSTS */

  const hsts = headers.get("strict-transport-security");

  if (hsts) {
    goodSignals.push("HSTS security header detected");
  } else {
    flags.push({
      label: "HSTS header is missing",
      severity: "warning",
      category: "Security",
    });

    scores.security -= 8;

    recommendations.push(
      "Enable Strict-Transport-Security (HSTS)"
    );
  }

  /* X-Content-Type */

  if (headers.get("x-content-type-options")) {
    goodSignals.push("X-Content-Type-Options detected");
  } else {
    flags.push({
      label: "X-Content-Type-Options header missing",
      severity: "warning",
      category: "Security",
    });

    scores.security -= 5;
  }

  /* X-Frame */

  if (
    headers.get("x-frame-options") ||
    headers.get("content-security-policy")
  ) {
    goodSignals.push("Clickjacking protection detected");
  } else {
    flags.push({
      label: "Clickjacking protection not detected",
      severity: "warning",
      category: "Security",
    });

    scores.security -= 5;
  }

  /* CSP */

  if (headers.get("content-security-policy")) {
    goodSignals.push("Content Security Policy detected");
  } else {
    flags.push({
      label: "Content-Security-Policy header missing",
      severity: "warning",
      category: "Security",
    });

    scores.security -= 7;
  }

  /* =========================================================
     MOBILE
  ========================================================= */

  const hasViewport =
    /<meta[^>]*name=["']viewport["'][^>]*>/i.test(
      html
    );

  if (hasViewport) {
    goodSignals.push(
      "Mobile viewport tag detected"
    );
  } else {
    flags.push({
      label:
        "Mobile viewport tag is missing — mobile experience may be poor",
      severity: "bad",
      category: "Mobile",
    });

    criticalIssues.push(
      "Mobile viewport is missing"
    );

    scores.mobile -= 35;

    recommendations.push(
      "Add a responsive viewport meta tag"
    );
  }

  /* Media queries */

  const mediaQueryCount = countMatches(
    html,
    /@media\s*\(/gi
  );

  if (mediaQueryCount > 0) {
    goodSignals.push(
      `Responsive CSS detected (${mediaQueryCount} media queries)`
    );
  } else {
    flags.push({
      label:
        "No CSS media queries detected",
      severity: "warning",
      category: "Mobile",
    });

    scores.mobile -= 15;

    recommendations.push(
      "Improve responsive layouts for tablets and mobile"
    );
  }

  /* Fixed width */

  const fixedWidthSignals = countMatches(
    html,
    /width\s*:\s*\d{3,}px/gi
  );

  if (fixedWidthSignals > 5) {
    flags.push({
      label:
        "Many fixed-width CSS values detected",
      severity: "warning",
      category: "Mobile",
    });

    scores.mobile -= 10;

    recommendations.push(
      "Replace rigid fixed widths with responsive layouts"
    );
  }

  /* =========================================================
     OLD TECHNOLOGY
  ========================================================= */

  const jqueryMatch = html.match(
    /jquery[.-](\d+)\.(\d+)/i
  );

  if (jqueryMatch) {
    const major = parseInt(
      jqueryMatch[1],
      10
    );

    const version = jqueryMatch[0];

    if (major < 3) {
      flags.push({
        label: `Legacy jQuery version detected (${version})`,
        severity: "bad",
        category: "Technical",
      });

      scores.technical -= 15;

      recommendations.push(
        "Consider replacing legacy JavaScript dependencies"
      );
    } else {
      goodSignals.push(
        `jQuery ${version} detected`
      );
    }
  }

  /* Flash */

  if (
    /\.swf\b|application\/x-shockwave-flash/i.test(
      html
    )
  ) {
    flags.push({
      label:
        "Adobe Flash content detected",
      severity: "bad",
      category: "Technical",
    });

    criticalIssues.push(
      "Remove obsolete Flash technology"
    );

    scores.technical -= 25;
  }

  /* Old HTML */

  const obsoleteTags = countMatches(
    html,
    /<(font|center|marquee|frameset|frame|big|strike)\b/gi
  );

  if (obsoleteTags > 0) {
    flags.push({
      label: `${obsoleteTags} obsolete HTML element(s) detected`,
      severity: "bad",
      category: "Technical",
    });

    scores.technical -= Math.min(
      20,
      obsoleteTags * 3
    );

    recommendations.push(
      "Replace legacy HTML elements with semantic modern HTML"
    );
  }

  /* =========================================================
     TABLE LAYOUT
  ========================================================= */

  const tableCount = countMatches(
    html,
    /<table\b/gi
  );

  const hasModernFramework =
    /_next\/static|__next|data-reactroot|__nuxt|ng-version|wp-content\/themes|shopify/i.test(
      html
    );

  if (
    tableCount > 3 &&
    !hasModernFramework
  ) {
    flags.push({
      label:
        `Heavy table usage detected (${tableCount} tables)`,
      severity: "warning",
      category: "Design",
    });

    scores.design -= 15;

    recommendations.push(
      "Consider modern CSS Grid/Flexbox based layouts"
    );
  }

  /* =========================================================
     SEO
  ========================================================= */

  const title = getFirstMatch(
    html,
    /<title[^>]*>([\s\S]*?)<\/title>/i
  );

  const hasTitle =
    title.trim().length >= 3;

  if (hasTitle) {
    goodSignals.push("Page title detected");

    if (title.length > 65) {
      flags.push({
        label:
          "Page title may be too long for search results",
        severity: "warning",
        category: "SEO",
      });

      scores.seo -= 5;
    }
  } else {
    flags.push({
      label:
        "Missing or empty page title",
      severity: "bad",
      category: "SEO",
    });

    criticalIssues.push(
      "Add a proper page title"
    );

    scores.seo -= 15;
  }

  /* Meta description */

  const metaDescription = getFirstMatch(
    html,
    /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)/i
  );

  if (
    metaDescription &&
    metaDescription.length >= 10
  ) {
    goodSignals.push(
      "SEO meta description detected"
    );
  } else {
    flags.push({
      label:
        "Missing meta description",
      severity: "bad",
      category: "SEO",
    });

    scores.seo -= 12;

    recommendations.push(
      "Add a unique SEO meta description"
    );
  }

  /* Canonical */

  if (
    /<link[^>]*rel=["']canonical["']/i.test(
      html
    )
  ) {
    goodSignals.push(
      "Canonical URL detected"
    );
  } else {
    flags.push({
      label:
        "Canonical URL not detected",
      severity: "warning",
      category: "SEO",
    });

    scores.seo -= 5;
  }

  /* Open Graph */

  const ogCount = countMatches(
    html,
    /<meta[^>]*property=["']og:/gi
  );

  if (ogCount >= 2) {
    goodSignals.push(
      "Open Graph metadata detected"
    );
  } else {
    flags.push({
      label:
        "Open Graph social sharing metadata missing",
      severity: "warning",
      category: "SEO",
    });

    scores.seo -= 6;

    recommendations.push(
      "Add Open Graph title, description and image"
    );
  }

  /* Twitter card */

  if (
    /<meta[^>]*name=["']twitter:/i.test(
      html
    )
  ) {
    goodSignals.push(
      "Twitter/X card metadata detected"
    );
  } else {
    flags.push({
      label:
        "Twitter/X card metadata missing",
      severity: "warning",
      category: "SEO",
    });

    scores.seo -= 3;
  }

  /* =========================================================
     HEADINGS
  ========================================================= */

  const h1Count = countMatches(
    html,
    /<h1\b/gi
  );

  const h2Count = countMatches(
    html,
    /<h2\b/gi
  );

  if (h1Count === 1) {
    goodSignals.push(
      "Exactly one H1 heading detected"
    );
  } else if (h1Count === 0) {
    flags.push({
      label:
        "No H1 heading detected",
      severity: "bad",
      category: "SEO",
    });

    scores.seo -= 8;
  } else {
    flags.push({
      label:
        `Multiple H1 headings detected (${h1Count})`,
      severity: "warning",
      category: "SEO",
    });

    scores.seo -= 4;
  }

  if (h2Count > 0) {
    goodSignals.push(
      `${h2Count} H2 heading(s) detected`
    );
  }

  /* =========================================================
     IMAGES / ACCESSIBILITY
  ========================================================= */

  const imageCount = countMatches(
    html,
    /<img\b/gi
  );

  const imagesWithoutAlt = countMatches(
    html,
    /<img(?![^>]*\balt\s*=)[^>]*>/gi
  );

  if (imageCount > 0) {
    if (imagesWithoutAlt === 0) {
      goodSignals.push(
        "Images contain ALT attributes"
      );
    } else {
      flags.push({
        label:
          `${imagesWithoutAlt} image(s) appear to be missing ALT text`,
        severity: "warning",
        category: "Accessibility",
      });

      scores.accessibility -= Math.min(
        20,
        imagesWithoutAlt * 3
      );

      recommendations.push(
        "Add descriptive ALT text to meaningful images"
      );
    }
  }

  /* =========================================================
     FORMS / LEAD GENERATION
  ========================================================= */

  const formCount = countMatches(
    html,
    /<form\b/gi
  );

  const inputCount = countMatches(
    html,
    /<input\b/gi
  );

  const telCount = countMatches(
    html,
    /type=["']tel["']/gi
  );

  const emailCount = countMatches(
    html,
    /type=["']email["']/gi
  );

  const contactSignals =
    /contact|enquir|quote|book|appointment|get-started|request-demo/i.test(
      lowerHtml
    );

  const whatsappDetected =
    /wa\.me|whatsapp/i.test(
      lowerHtml
    );

  if (formCount > 0) {
    goodSignals.push(
      `${formCount} contact form(s) detected`
    );
  } else {
    flags.push({
      label:
        "No HTML contact form detected",
      severity: "warning",
      category: "Conversion",
    });

    scores.conversion -= 15;

    recommendations.push(
      "Add a clear lead/enquiry form"
    );
  }

  if (
    telCount > 0 ||
    /tel:/i.test(lowerHtml)
  ) {
    goodSignals.push(
      "Phone/contact CTA detected"
    );
  } else {
    flags.push({
      label:
        "Phone CTA not detected",
      severity: "warning",
      category: "Conversion",
    });

    scores.conversion -= 7;
  }

  if (emailCount > 0) {
    goodSignals.push(
      "Email input detected"
    );
  }

  if (whatsappDetected) {
    goodSignals.push(
      "WhatsApp integration detected"
    );
  } else {
    flags.push({
      label:
        "WhatsApp CTA not detected",
      severity: "warning",
      category: "Conversion",
    });

    scores.conversion -= 5;

    recommendations.push(
      "Consider adding a WhatsApp CTA for faster enquiries"
    );
  }

  if (contactSignals) {
    goodSignals.push(
      "Business/contact conversion keywords detected"
    );
  }

  /* =========================================================
     CONTENT
  ========================================================= */

  const wordCount =
    textContent
      .split(/\s+/)
      .filter(Boolean).length;

  const internalLinks = countMatches(
    html,
    /<a[^>]+href=["'][^"']+/gi
  );

  if (wordCount < 150) {
    flags.push({
      label:
        "Very little readable page content detected",
      severity: "warning",
      category: "Content",
    });

    scores.seo -= 8;

    recommendations.push(
      "Add useful service, product and business information"
    );
  } else {
    goodSignals.push(
      `${wordCount} readable words detected`
    );
  }

  /* =========================================================
     PERFORMANCE SIGNALS
  ========================================================= */

  const scriptCount = countMatches(
    html,
    /<script\b/gi
  );

  const stylesheetCount = countMatches(
    html,
    /<link[^>]*stylesheet/gi
  );

  const inlineStyleCount = countMatches(
    html,
    /\sstyle=["']/gi
  );

  const htmlSizeKB =
    Math.round(
      (new TextEncoder().encode(html).length /
        1024) *
        10
    ) / 10;

  if (scriptCount > 25) {
    flags.push({
      label:
        `Large number of JavaScript files/scripts detected (${scriptCount})`,
      severity: "warning",
      category: "Performance",
    });

    scores.performance -= 12;

    recommendations.push(
      "Reduce unnecessary third-party scripts"
    );
  }

  if (stylesheetCount > 10) {
    flags.push({
      label:
        `Many stylesheets detected (${stylesheetCount})`,
      severity: "warning",
      category: "Performance",
    });

    scores.performance -= 8;
  }

  if (htmlSizeKB > 500) {
    flags.push({
      label:
        `Large HTML document (${htmlSizeKB} KB)`,
      severity: "warning",
      category: "Performance",
    });

    scores.performance -= 10;
  }

  if (loadTimeMs < 1000) {
    goodSignals.push(
      `Server response completed quickly (${loadTimeMs} ms)`
    );
  } else if (loadTimeMs < 2500) {
    goodSignals.push(
      `Server response time: ${loadTimeMs} ms`
    );
  } else {
    flags.push({
      label:
        `Slow server response detected (${loadTimeMs} ms)`,
      severity: "warning",
      category: "Performance",
    });

    scores.performance -= 15;

    recommendations.push(
      "Investigate hosting, caching and server response time"
    );
  }

  /* =========================================================
     DESIGN / MODERNITY
  ========================================================= */

  const svgCount = countMatches(
    html,
    /<svg\b/gi
  );

  const semanticElements = countMatches(
    html,
    /<(header|nav|main|section|article|footer|aside)\b/gi
  );

  const modernCssSignals =
    /display\s*:\s*(flex|grid)|css-variables|--[a-z-]+\s*:/i.test(
      html
    );

  if (modernCssSignals) {
    goodSignals.push(
      "Modern CSS layout signals detected"
    );
  } else {
    flags.push({
      label:
        "Modern Flexbox/Grid CSS signals not detected",
      severity: "warning",
      category: "Design",
    });

    scores.design -= 12;
  }

  if (semanticElements >= 3) {
    goodSignals.push(
      "Semantic HTML structure detected"
    );
  } else {
    flags.push({
      label:
        "Limited semantic HTML structure detected",
      severity: "warning",
      category: "Design",
    });

    scores.design -= 8;
  }

  if (svgCount > 0) {
    goodSignals.push(
      `${svgCount} SVG element(s) detected`
    );
  }

  if (inlineStyleCount > 30) {
    flags.push({
      label:
        `Heavy inline styling detected (${inlineStyleCount} occurrences)`,
      severity: "warning",
      category: "Design",
    });

    scores.design -= 8;

    recommendations.push(
      "Move repeated inline styles into reusable CSS/components"
    );
  }

  /* =========================================================
     COPYRIGHT
  ========================================================= */

  const years =
    extractYearsNearCopyright(html);

  const currentYear =
    new Date().getFullYear();

  let copyrightYear = null;

  if (years.length) {
    copyrightYear = Math.max(...years);

    if (
      currentYear - copyrightYear >= 3
    ) {
      flags.push({
        label:
          `Copyright year shows ${copyrightYear}`,
        severity: "warning",
        category: "Content",
      });

      recommendations.push(
        "Review footer content and update outdated copyright information"
      );
    } else {
      goodSignals.push(
        `Recent copyright year detected (${copyrightYear})`
      );
    }
  }

  /* =========================================================
     FAVICON
  ========================================================= */

  if (
    /<link[^>]+rel=["'][^"']*icon/i.test(
      html
    )
  ) {
    goodSignals.push(
      "Favicon detected"
    );
  } else {
    flags.push({
      label:
        "Favicon not detected",
      severity: "warning",
      category: "Design",
    });

    scores.design -= 3;
  }

  /* =========================================================
     ROBOTS / SITEMAP SIGNALS
  ========================================================= */

  const hasRobots =
    /robots\.txt/i.test(html);

  const hasSitemap =
    /sitemap\.xml/i.test(html);

  if (hasRobots) {
    goodSignals.push(
      "Robots.txt reference detected"
    );
  }

  if (hasSitemap) {
    goodSignals.push(
      "Sitemap reference detected"
    );
  }

  /* =========================================================
     TECHNOLOGY
  ========================================================= */

  const technologies =
    detectTechnologies(
      html,
      headers
    );

  if (hasModernFramework) {
    goodSignals.push(
      "Modern web platform/framework signals detected"
    );
  }

  /* =========================================================
     SCORE CLEANUP
  ========================================================= */

  Object.keys(scores).forEach(
    (key) => {
      scores[key] = clampScore(
        scores[key]
      );
    }
  );

  /* =========================================================
     OVERALL SCORE
  ========================================================= */

  const overallScore =
    clampScore(
      Object.values(scores).reduce(
        (sum, value) =>
          sum + value,
        0
      ) /
        Object.keys(scores).length
    );

  /* =========================================================
     MODERNITY SCORE
  ========================================================= */

  let modernityScore =
    scores.design * 0.35 +
    scores.mobile * 0.2 +
    scores.technical * 0.25 +
    scores.performance * 0.2;

  modernityScore =
    clampScore(modernityScore);

  /* =========================================================
     VERDICT
  ========================================================= */

  let verdict;

  if (
    modernityScore >= 80 &&
    overallScore >= 80
  ) {
    verdict =
      "Website appears technically modern with relatively few improvement signals.";
  } else if (
    modernityScore >= 65
  ) {
    verdict =
      "Website has a modern foundation but several areas could be improved.";
  } else if (
    modernityScore >= 45
  ) {
    verdict =
      "Several modernization opportunities were detected.";
  } else {
    verdict =
      "Multiple legacy or improvement signals were detected. A redesign/modernization review is recommended.";
  }

  /* =========================================================
     PRIORITY
  ========================================================= */

  let opportunityLevel;

  if (
    overallScore < 50 ||
    criticalIssues.length >= 3
  ) {
    opportunityLevel = "HIGH";
  } else if (
    overallScore < 70 ||
    flags.length >= 7
  ) {
    opportunityLevel = "MEDIUM";
  } else {
    opportunityLevel = "LOW";
  }

  /* =========================================================
     FINAL RESPONSE
  ========================================================= */

  return NextResponse.json({
    url: raw,

    finalUrl,

    reachable: true,

    statusCode: response.status,

    loadTimeMs,

    htmlSizeKB,

    lastModifiedHeader:
      headers.get("last-modified"),

    overallScore,

    modernityScore,

    verdict,

    opportunityLevel,

    scores: {
      overall: overallScore,
      modernity: modernityScore,
      design: scores.design,
      mobile: scores.mobile,
      seo: scores.seo,
      performance: scores.performance,
      accessibility:
        scores.accessibility,
      security: scores.security,
      technical: scores.technical,
      conversion: scores.conversion,
    },

    summary: {
      criticalIssues:
        criticalIssues.length,

      warnings: flags.filter(
        (item) =>
          item.severity ===
          "warning"
      ).length,

      goodSignals:
        goodSignals.length,

      recommendations:
        recommendations.length,

      images: imageCount,

      forms: formCount,

      inputs: inputCount,

      scripts: scriptCount,

      stylesheets:
        stylesheetCount,

      links: internalLinks,

      words: wordCount,

      tables: tableCount,

      semanticElements,

      svgElements: svgCount,
    },

    technologies,

    copyrightYear,

    flags,

    goodSignals,

    recommendations,

    criticalIssues,
  });
}