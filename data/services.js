// Services shown across the homepage and /services.
// `slug` set means a dedicated /services/[slug] page exists (see generateStaticParams
// in app/services/[slug]/page.js). Services without a slug link straight to /contact.

export const services = [
  {
    slug: "website-development",
    icon: "Globe",
    title: "Business Website Development",
    shortDescription:
      "Corporate, company, service and professional websites built to represent your business online.",
    metaDescription:
      "Professional business website development for corporate, service and company websites — fast, responsive and built to convert visitors into enquiries.",
    tagline: "A website that represents your business the way it deserves.",
    features: [
      "Corporate & company websites",
      "Service and professional websites",
      "Custom UI tailored to your brand",
      "Responsive across every device",
      "CMS integration for easy content updates",
      "Business-specific functionality",
    ],
    idealFor: [
      "Small and medium businesses",
      "Professional service firms",
      "Local businesses building credibility online",
    ],
  },
  {
    slug: "ecommerce-development",
    icon: "ShoppingCart",
    title: "E-commerce Development",
    shortDescription:
      "Online stores with product catalogs, cart, checkout, payments and order management.",
    metaDescription:
      "E-commerce website development with product catalogs, shopping cart, secure checkout, payment gateway integration and order management.",
    tagline: "Sell online with a store built for real transactions.",
    features: [
      "Product catalog & category structure",
      "Shopping cart & checkout flow",
      "Payment gateway integration",
      "Order management",
      "Inventory-friendly architecture",
      "Mobile-first shopping experience",
    ],
    idealFor: [
      "Retail and product-based businesses",
      "Brands moving from marketplaces to their own store",
      "Businesses that need direct online payments",
    ],
  },
  {
    slug: "web-application-development",
    icon: "LayoutDashboard",
    title: "Web Application Development",
    shortDescription:
      "Dashboards, admin panels, SaaS platforms, customer portals and internal tools.",
    metaDescription:
      "Custom web application development including dashboards, admin panels, SaaS platforms, internal business tools and customer portals.",
    tagline: "Software that runs a real part of your business.",
    features: [
      "Dashboards & admin panels",
      "SaaS platform foundations",
      "Internal business applications",
      "Customer portals",
      "Role-based access where needed",
      "Built to scale with your usage",
    ],
    idealFor: [
      "Businesses replacing spreadsheets with real tools",
      "Startups building a SaaS product",
      "Companies needing a customer-facing portal",
    ],
  },
  {
    slug: "software-development",
    icon: "Layers",
    title: "Full-Stack Development",
    shortDescription:
      "Frontend, backend, APIs, databases and authentication delivered as one coherent system.",
    metaDescription:
      "Full-stack software development covering frontend, backend, APIs, database design and authentication for business-critical applications.",
    tagline: "One team, one system — frontend to database.",
    features: [
      "Frontend build (React / Next.js)",
      "Backend services & APIs",
      "Database design",
      "Authentication & access control",
      "Third-party service integration",
      "Deployment & environment setup",
    ],
    idealFor: [
      "Businesses that need more than a website",
      "Products with real backend logic",
      "Teams that want one accountable partner",
    ],
  },
  {
    slug: "ui-ux-design",
    icon: "PenTool",
    title: "UI/UX Design",
    shortDescription:
      "Modern, conversion-focused interfaces and mobile-first design systems.",
    metaDescription:
      "UI/UX design services for modern, conversion-focused interfaces, mobile-first experiences and reusable design systems.",
    tagline: "Design that guides visitors toward a decision.",
    features: [
      "Modern, premium interface design",
      "Conversion-focused layouts",
      "Mobile-first experience design",
      "Reusable design systems",
      "Wireframes & prototypes",
      "Accessibility-aware design",
    ],
    idealFor: [
      "Businesses redesigning a dated interface",
      "Founders validating a new product",
      "Teams that need a consistent design system",
    ],
  },
  {
    slug: null,
    icon: "RefreshCw",
    title: "Website Redesign",
    shortDescription:
      "Modernize an old website — improve UI, performance, mobile responsiveness and SEO.",
    metaDescription: null,
    tagline: "The same business, a website that finally matches it.",
    features: [
      "Old website modernization",
      "UI and visual improvement",
      "Performance optimization",
      "Mobile responsiveness fixes",
      "SEO improvements",
    ],
    idealFor: [
      "Businesses with an outdated or slow website",
      "Sites that don't work well on mobile",
      "Websites that no longer reflect the brand",
    ],
  },
  {
    slug: "website-maintenance",
    icon: "ShieldCheck",
    title: "Website Maintenance & Support",
    shortDescription:
      "Ongoing bug fixes, content updates, performance monitoring and security updates.",
    metaDescription:
      "Website maintenance and support services including bug fixes, content updates, performance monitoring, security updates and feature improvements.",
    tagline: "A website that keeps working, quietly, in the background.",
    features: [
      "Bug fixing",
      "Content updates",
      "Performance monitoring",
      "Security updates",
      "Feature improvements over time",
    ],
    idealFor: [
      "Businesses that want one point of contact",
      "Websites already live that need upkeep",
      "Teams without in-house technical staff",
    ],
  },
  {
    slug: null,
    icon: "Plug",
    title: "API & Third-Party Integrations",
    shortDescription:
      "Payment gateways, WhatsApp, email, CRM, maps and external APIs connected to your site.",
    metaDescription: null,
    tagline: "Connect the tools your business already runs on.",
    features: [
      "Payment gateway integration",
      "WhatsApp integration",
      "Email & notification services",
      "CRM connections",
      "Maps & location services",
      "Custom external APIs",
    ],
    idealFor: [
      "Businesses consolidating multiple tools",
      "Teams automating lead handoff to CRM",
      "Sites that need payments or maps embedded",
    ],
  },
  {
    slug: "ai-development",
    icon: "Sparkles",
    title: "AI Integration",
    shortDescription:
      "AI chatbots, assistants, AI-powered search and automation built on AI APIs.",
    metaDescription:
      "AI integration services including AI chatbots, AI-powered search, content workflows and business process automation using AI APIs.",
    tagline: "Practical AI, wired into how your business actually works.",
    features: [
      "AI chatbots & assistants",
      "AI-powered search",
      "AI content workflows",
      "Business automation using AI APIs",
      "Integrated with your existing site or app",
    ],
    idealFor: [
      "Businesses handling repetitive customer queries",
      "Teams wanting a smarter search or FAQ experience",
      "Founders exploring practical, scoped AI features",
    ],
  },
  {
    slug: "mobile-app-development",
    icon: "Smartphone",
    title: "Mobile App Development",
    shortDescription:
      "Native iOS and Android apps, or a single cross-platform app for both.",
    metaDescription:
      "Mobile app development for iOS and Android, including cross-platform apps, app store deployment and ongoing updates.",
    tagline: "Your business, in your customers' pocket.",
    features: [
      "iOS app development",
      "Android app development",
      "Cross-platform apps (one codebase, both stores)",
      "App Store & Google Play submission",
      "Push notifications & device integrations",
      "Post-launch updates",
    ],
    idealFor: [
      "Businesses extending a web product to mobile",
      "Service businesses wanting a booking or loyalty app",
      "Startups launching an app-first product",
    ],
  },
  {
    slug: "backend-devops",
    icon: "Server",
    title: "Backend Development & DevOps",
    shortDescription:
      "Backend architecture, cloud hosting, CI/CD pipelines and infrastructure support.",
    metaDescription:
      "Backend development and DevOps support including cloud hosting, deployment pipelines, server monitoring and infrastructure management.",
    tagline: "The infrastructure behind your product, handled properly.",
    features: [
      "Backend architecture & API design",
      "Cloud hosting & deployment (AWS, Vercel and similar)",
      "CI/CD pipelines",
      "Server monitoring & scaling",
      "Database administration",
      "Infrastructure & DevOps automation",
    ],
    idealFor: [
      "Products that need reliable, monitored infrastructure",
      "Teams without an in-house DevOps engineer",
      "Businesses scaling past a single server setup",
    ],
  },
  {
    slug: "digital-marketing",
    icon: "Megaphone",
    title: "Digital Marketing Services",
    shortDescription:
      "SEO, search and social ads, content and analytics to bring visitors to what we build.",
    metaDescription:
      "Digital marketing services including SEO, Google and social media ads, content marketing and analytics setup for business websites.",
    tagline: "A great website still needs people to find it.",
    features: [
      "Search engine optimization (on-page & technical)",
      "Google & social media ad campaigns",
      "Content & email marketing",
      "Analytics & Google Business Profile setup",
      "Ongoing performance reporting",
    ],
    idealFor: [
      "Businesses that need visibility, not just a website",
      "E-commerce brands wanting more traffic",
      "Local businesses aiming to rank in their area",
    ],
  },
];

export function getServiceBySlug(slug) {
  return services.find((service) => service.slug === slug) ?? null;
}

export function getServiceSlugs() {
  return services
    .map((service) => service.slug)
    .filter((slug) => Boolean(slug));
}
