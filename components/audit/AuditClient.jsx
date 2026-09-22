"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Loader2,
  CheckCircle2,
  XCircle,
  Globe,
  Clock,
  AlertTriangle,
  ShieldCheck,
  Smartphone,
  Gauge,
  Code2,
  Accessibility,
  TrendingUp,
  Palette,
  Zap,
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

/* =========================================================
   SCORE HELPERS
========================================================= */

function scoreColor(score) {
  if (score == null) return "text-white/50";
  if (score >= 80) return "text-emerald-400";
  if (score >= 60) return "text-gold-300";
  return "text-red-400";
}

function scoreRing(score) {
  if (score == null) return "#64748b";
  if (score >= 80) return "#34d399";
  if (score >= 60) return "#f5c451";
  return "#f87171";
}

function scoreLabel(score) {
  if (score >= 80) return "Good";
  if (score >= 60) return "Needs Improvement";
  return "Needs Attention";
}

/* =========================================================
   SCORE CARD
========================================================= */

function ScoreCard({
  icon: Icon,
  label,
  score,
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-gold-300" />

          <span className="text-sm text-white/70">
            {label}
          </span>
        </div>

        <span
          className={`text-lg font-bold ${scoreColor(
            score
          )}`}
        >
          {score}
        </span>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          // id="audit-pdf-report"

          initial={{ width: 0 }}
          animate={{
            width: `${score || 0}%`,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="h-full rounded-full"
          style={{
            backgroundColor: scoreRing(score),
          }}
        />
      </div>

      <p className="mt-2 text-xs text-white/40">
        {scoreLabel(score)}
      </p>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */
function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function pdfSummaryBox(label, value, color) {
  return `
    <div style="
      border:1px solid #e5e7eb;
      border-radius:10px;
      padding:14px;
      text-align:center;
    ">
      <div style="
        font-size:22px;
        font-weight:700;
        color:${color};
      ">
        ${value}
      </div>

      <div style="
        margin-top:4px;
        font-size:9px;
        color:#6b7280;
        text-transform:uppercase;
        letter-spacing:1px;
      ">
        ${escapeHtml(label)}
      </div>
    </div>
  `;
}

function pdfScoreCard(label, score) {
  const value = score == null ? 0 : Number(score);

  const color =
    value >= 80
      ? "#059669"
      : value >= 60
      ? "#d97706"
      : "#dc2626";

  return `
    <div style="
      border:1px solid #e5e7eb;
      border-radius:10px;
      padding:14px;
    ">

      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
      ">
        <div style="
          font-size:13px;
          font-weight:600;
          color:#374151;
        ">
          ${escapeHtml(label)}
        </div>

        <div style="
          font-size:17px;
          font-weight:700;
          color:${color};
        ">
          ${value}
        </div>
      </div>

      <div style="
        height:6px;
        background:#e5e7eb;
        border-radius:10px;
        margin-top:10px;
        overflow:hidden;
      ">
        <div style="
          width:${Math.min(value, 100)}%;
          height:100%;
          background:${color};
          border-radius:10px;
        "></div>
      </div>
    </div>
  `;
}

function pdfStat(label, value) {
  return `
    <div style="
      border:1px solid #e5e7eb;
      border-radius:8px;
      padding:12px;
    ">
      <div style="
        font-size:17px;
        font-weight:700;
        color:#111827;
      ">
        ${escapeHtml(value ?? 0)}
      </div>

      <div style="
        margin-top:3px;
        font-size:9px;
        color:#6b7280;
        text-transform:uppercase;
        letter-spacing:0.5px;
      ">
        ${escapeHtml(label)}
      </div>
    </div>
  `;
}
export default function AuditClient() {
  const [url, setUrl] = useState("");
  const [businessName, setBusinessName] =
    useState("");
  const [cityState, setCityState] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const [error, setError] =
    useState("");
async function downloadPDF() {
  if (!result) {
    console.error("No audit result available");
    return;
  }

  try {
    console.log("Starting PDF generation...");

    const pdfReport = document.createElement("div");

    pdfReport.style.position = "fixed";
    pdfReport.style.left = "-10000px";
    pdfReport.style.top = "0";
    pdfReport.style.width = "794px";
    pdfReport.style.background = "#ffffff";
    pdfReport.style.color = "#111827";
    pdfReport.style.padding = "50px";
    pdfReport.style.fontFamily =
      "Arial, Helvetica, sans-serif";
    pdfReport.style.boxSizing = "border-box";

    const score = result.overallScore ?? 0;

    const scoreColor =
      score >= 80
        ? "#059669"
        : score >= 60
        ? "#d97706"
        : "#dc2626";

    const safeBusinessName =
      businessName?.trim() || "Website";

    const scores = result.scores || {};
    const summary = result.summary || {};

    const scoreRows = [
      ["Design", scores.design],
      ["Mobile", scores.mobile],
      ["SEO", scores.seo],
      ["Performance", scores.performance],
      ["Accessibility", scores.accessibility],
      ["Security", scores.security],
      ["Technical", scores.technical],
      ["Conversion", scores.conversion],
    ];

    pdfReport.innerHTML = `
      <div style="border-bottom:3px solid #d4a72c;padding-bottom:20px;">
        <div style="font-size:13px;color:#6b7280;text-transform:uppercase;letter-spacing:2px;font-weight:700;">
          Website Audit Report
        </div>

        <div style="font-size:30px;font-weight:700;color:#111827;margin-top:8px;">
          ${escapeHtml(safeBusinessName)}
        </div>

        ${
          cityState
            ? `
              <div style="font-size:14px;color:#6b7280;margin-top:5px;">
                ${escapeHtml(cityState)}
              </div>
            `
            : ""
        }

        <div style="font-size:13px;color:#4b5563;margin-top:12px;word-break:break-all;">
          ${escapeHtml(result.finalUrl || url)}
        </div>
      </div>

      <!-- SCORE -->
      <div style="margin-top:30px;border:1px solid #e5e7eb;border-radius:14px;padding:25px;">
        <div style="display:flex;justify-content:space-between;align-items:center;">

          <div>
            <div style="font-size:13px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">
              Overall Website Score
            </div>

            <div style="font-size:22px;font-weight:700;color:${scoreColor};margin-top:8px;">
              ${escapeHtml(result.verdict || "")}
            </div>

            ${
              result.opportunityLevel
                ? `
                  <div style="margin-top:8px;font-size:12px;color:#6b7280;">
                    ${escapeHtml(
                      result.opportunityLevel
                    )} OPPORTUNITY
                  </div>
                `
                : ""
            }
          </div>

          <div style="
            width:105px;
            height:105px;
            border-radius:50%;
            border:10px solid ${scoreColor};
            display:flex;
            align-items:center;
            justify-content:center;
            box-sizing:border-box;
          ">
            <div style="text-align:center;">
              <div style="font-size:30px;font-weight:700;color:${scoreColor};">
                ${score}
              </div>

              <div style="font-size:10px;color:#6b7280;text-transform:uppercase;">
                Score
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- SUMMARY -->
      <div style="margin-top:25px;">
        <div style="font-size:18px;font-weight:700;color:#111827;margin-bottom:12px;">
          Audit Summary
        </div>

        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;">

          ${pdfSummaryBox(
            "Critical",
            summary.criticalIssues ?? 0,
            "#dc2626"
          )}

          ${pdfSummaryBox(
            "Warnings",
            summary.warnings ?? 0,
            "#d97706"
          )}

          ${pdfSummaryBox(
            "Working Well",
            summary.goodSignals ?? 0,
            "#059669"
          )}

          ${pdfSummaryBox(
            "Recommendations",
            summary.recommendations ?? 0,
            "#6b7280"
          )}

        </div>
      </div>

      <!-- HEALTH -->
      <div style="margin-top:30px;">
        <div style="font-size:20px;font-weight:700;color:#111827;">
          Website Health Breakdown
        </div>

        <div style="font-size:13px;color:#6b7280;margin-top:4px;">
          Technical signals detected from the website.
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:15px;">

          ${scoreRows
            .map(([label, value]) =>
              pdfScoreCard(label, value)
            )
            .join("")}

        </div>
      </div>

      <!-- ISSUES -->
      ${
        result.flags?.length
          ? `
            <div style="margin-top:30px;">
              <div style="font-size:20px;font-weight:700;color:#dc2626;">
                Issues Found
              </div>

              <div style="margin-top:12px;">
                ${result.flags
                  .map(
                    (flag) => `
                      <div style="
                        padding:11px 12px;
                        margin-bottom:8px;
                        border:1px solid #e5e7eb;
                        border-left:4px solid ${
                          flag.severity === "bad"
                            ? "#dc2626"
                            : "#d97706"
                        };
                        border-radius:7px;
                        font-size:13px;
                        color:#374151;
                      ">
                        ${escapeHtml(flag.label || "")}

                        ${
                          flag.category
                            ? `
                              <div style="
                                font-size:10px;
                                color:#9ca3af;
                                margin-top:4px;
                                text-transform:uppercase;
                              ">
                                ${escapeHtml(
                                  flag.category
                                )}
                              </div>
                            `
                            : ""
                        }
                      </div>
                    `
                  )
                  .join("")}
              </div>
            </div>
          `
          : ""
      }

      <!-- GOOD SIGNALS -->
      ${
        result.goodSignals?.length
          ? `
            <div style="margin-top:30px;">
              <div style="font-size:20px;font-weight:700;color:#059669;">
                Working Well
              </div>

              <div style="margin-top:12px;">
                ${result.goodSignals
                  .map(
                    (signal) => `
                      <div style="
                        padding:8px 0;
                        font-size:13px;
                        color:#374151;
                        border-bottom:1px solid #f3f4f6;
                      ">
                        ✓ ${escapeHtml(signal)}
                      </div>
                    `
                  )
                  .join("")}
              </div>
            </div>
          `
          : ""
      }

      <!-- TECHNOLOGIES -->
      ${
        result.technologies?.length
          ? `
            <div style="margin-top:30px;">
              <div style="font-size:20px;font-weight:700;color:#111827;">
                Detected Technology
              </div>

              <div style="margin-top:12px;">
                ${result.technologies
                  .map(
                    (technology) => `
                      <span style="
                        display:inline-block;
                        padding:6px 10px;
                        margin:0 6px 6px 0;
                        background:#f3f4f6;
                        border:1px solid #e5e7eb;
                        border-radius:20px;
                        font-size:11px;
                        color:#374151;
                      ">
                        ${escapeHtml(technology)}
                      </span>
                    `
                  )
                  .join("")}
              </div>
            </div>
          `
          : ""
      }

      <!-- RECOMMENDATIONS -->
      ${
        result.recommendations?.length
          ? `
            <div style="margin-top:30px;">
              <div style="font-size:20px;font-weight:700;color:#111827;">
                Recommended Improvements
              </div>

              <div style="margin-top:12px;">
                ${result.recommendations
                  .map(
                    (recommendation, index) => `
                      <div style="
                        display:flex;
                        gap:10px;
                        margin-bottom:10px;
                        padding:10px;
                        background:#fffbeb;
                        border:1px solid #f3e8b0;
                        border-radius:7px;
                      ">
                        <div style="
                          width:22px;
                          height:22px;
                          min-width:22px;
                          border-radius:50%;
                          background:#fef3c7;
                          color:#92400e;
                          display:flex;
                          align-items:center;
                          justify-content:center;
                          font-size:11px;
                          font-weight:700;
                        ">
                          ${index + 1}
                        </div>

                        <div style="
                          font-size:13px;
                          line-height:1.5;
                          color:#374151;
                        ">
                          ${escapeHtml(recommendation)}
                        </div>
                      </div>
                    `
                  )
                  .join("")}
              </div>
            </div>
          `
          : ""
      }

      <!-- TECHNICAL SUMMARY -->
      <div style="margin-top:30px;">
        <div style="font-size:20px;font-weight:700;color:#111827;">
          Technical Summary
        </div>

        <div style="
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:10px;
          margin-top:12px;
        ">

          ${pdfStat("Images", summary.images)}
          ${pdfStat("Forms", summary.forms)}
          ${pdfStat("Scripts", summary.scripts)}
          ${pdfStat("Stylesheets", summary.stylesheets)}
          ${pdfStat("Words", summary.words)}
          ${pdfStat(
            "HTML Size",
            `${result.htmlSizeKB || 0} KB`
          )}

        </div>
      </div>

      <!-- FOOTER -->
      <div style="
        margin-top:40px;
        padding-top:15px;
        border-top:1px solid #e5e7eb;
        font-size:10px;
        color:#9ca3af;
        text-align:center;
      ">
        Website Audit Report · Generated for ${escapeHtml(
          safeBusinessName
        )}
      </div>
    `;

    document.body.appendChild(pdfReport);

    // Give browser time to render the temporary report
    await new Promise((resolve) =>
      setTimeout(resolve, 300)
    );

    const canvas = await html2canvas(pdfReport, {
      scale: 2,
      backgroundColor: "#ffffff",
      logging: false,
    });

    document.body.removeChild(pdfReport);

    const imgData = canvas.toDataURL(
      "image/png",
      1.0
    );

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth =
      pdf.internal.pageSize.getWidth();

    const pageHeight =
      pdf.internal.pageSize.getHeight();

    const margin = 10;

    const contentWidth =
      pageWidth - margin * 2;

    const imageHeight =
      (canvas.height * contentWidth) /
      canvas.width;

    let heightLeft = imageHeight;

    let position = margin;

    pdf.addImage(
      imgData,
      "PNG",
      margin,
      position,
      contentWidth,
      imageHeight
    );

    heightLeft -=
      pageHeight - margin * 2;

    while (heightLeft > 0) {
      pdf.addPage();

      position =
        margin -
        (imageHeight - heightLeft);

      pdf.addImage(
        imgData,
        "PNG",
        margin,
        position,
        contentWidth,
        imageHeight
      );

      heightLeft -=
        pageHeight - margin * 2;
    }

    const fileName = businessName?.trim()
      ? businessName
          .trim()
          .replace(/[^a-zA-Z0-9]+/g, "-")
      : "website";

    pdf.save(
      `${fileName}-website-audit-report.pdf`
    );

    console.log(
      "PDF generated successfully"
    );
  } catch (error) {
    console.error(
      "PDF generation failed:",
      error
    );

    const existingReport =
      document.getElementById(
        "audit-pdf-temp"
      );

    if (existingReport) {
      existingReport.remove();
    }

    alert(
      "PDF generate nahi ho paya. Please try again."
    );
  }
}
  /* =========================================================
     SUBMIT
  ========================================================= */

  async function handleSubmit(e) {
    e.preventDefault();

    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(
        `/api/audit?url=${encodeURIComponent(
          url.trim()
        )}`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.error ||
            "Something went wrong"
        );
      }

      setResult(data);
    } catch (err) {
      setError(
        err.message ||
          "Couldn't check this website. Try again."
      );
    } finally {
      setLoading(false);
    }
  }

  /* =========================================================
     SCORE CIRCLE
  ========================================================= */

  const circumference =
    2 * Math.PI * 42;

  const score =
    result?.overallScore ?? null;

  const dash =
    score != null
      ? (score / 100) * circumference
      : 0;

  return (
    <section className="relative min-h-screen overflow-hidden bg-navy-950 py-20">
      {/* Background */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(45%_50%_at_50%_0%,rgba(44,75,176,0.16),transparent_60%)]"
      />

      <Container className="relative max-w-5xl">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-300/25 bg-gold-400/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
            Internal Tool
          </span>

          <h1 className="mt-5 font-display text-3xl font-semibold text-white sm:text-4xl">
            Website Audit
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-white/60">
            Analyze a business website for
            design, mobile experience, SEO,
            security, performance and
            conversion opportunities.
          </p>
        </div>

        {/* =====================================================
            FORM
        ===================================================== */}

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 max-w-3xl space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
        >
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
              Website URL
            </label>

            <input
              type="text"
              required
              value={url}
              onChange={(e) =>
                setUrl(e.target.value)
              }
              placeholder="example.com"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-gold-400/50"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
                Business name{" "}
                <span className="normal-case text-white/30">
                  (optional)
                </span>
              </label>

              <input
                type="text"
                value={businessName}
                onChange={(e) =>
                  setBusinessName(
                    e.target.value
                  )
                }
                placeholder="e.g. Sharma Traders"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-gold-400/50"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
                City / State{" "}
                <span className="normal-case text-white/30">
                  (optional)
                </span>
              </label>

              <input
                type="text"
                value={cityState}
                onChange={(e) =>
                  setCityState(
                    e.target.value
                  )
                }
                placeholder="e.g. Nagpur, Maharashtra"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-gold-400/50"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="gold"
            size="lg"
            className="w-full"
            disabled={loading}
            icon={loading ? undefined : Search}
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing website…
              </span>
            ) : (
              "Analyze Website"
            )}
          </Button>
        </form>

        {/* =====================================================
            ERROR
        ===================================================== */}

        {error && (
          <div className="mx-auto mt-5 max-w-3xl rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-center text-sm text-red-400">
            {error}
          </div>
        )}

        {/* =====================================================
            RESULT
        ===================================================== */}

        <AnimatePresence>
          {result && (
            <motion.div
              id="audit-pdf-report"

              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
              }}
              className="mx-auto mt-8 max-w-5xl"
            >
              {/* =================================================
                  UNREACHABLE
              ================================================= */}

              {!result.reachable ? (
                <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-6">
                  <div className="flex items-center gap-3 text-red-400">
                    <XCircle className="h-6 w-6 shrink-0" />

                    <div>
                      <p className="font-semibold">
                        Website could not be analyzed
                      </p>

                      <p className="mt-1 text-sm text-white/60">
                        {result.url}
                      </p>

                      <p className="mt-2 text-sm text-red-300/80">
                        {result.error}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* =================================================
                      TOP REPORT HEADER
                  ================================================= */}

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                  <div className="mt-6 flex justify-end">
  <Button
    type="button"
    variant="gold"
    size="lg"
    onClick={downloadPDF}
  >
    Download PDF Report
  </Button>
</div>
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0">
                        {(businessName ||
                          cityState) && (
                          <p className="mb-2 text-sm text-white/50">
                            {[
                              businessName,
                              cityState,
                            ]
                              .filter(Boolean)
                              .join(
                                " · "
                              )}
                          </p>
                        )}

                        <div className="flex items-center gap-2 text-white">
                          <Globe className="h-4 w-4 shrink-0 text-gold-300" />

                          <span className="break-all text-sm">
                            {result.finalUrl}
                          </span>
                        </div>

                        <h2
                          className={`mt-3 text-lg font-semibold ${scoreColor(
                            result.overallScore
                          )}`}
                        >
                          {result.verdict}
                        </h2>

                        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-white/40">
                          {result.loadTimeMs !=
                            null && (
                            <span className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5" />
                              Responded in{" "}
                              {
                                result.loadTimeMs
                              }
                              ms
                            </span>
                          )}

                          {result.opportunityLevel && (
                            <span
                              className={`rounded-full px-2.5 py-1 font-semibold ${
                                result.opportunityLevel ===
                                "HIGH"
                                  ? "bg-red-400/10 text-red-400"
                                  : result.opportunityLevel ===
                                    "MEDIUM"
                                  ? "bg-gold-400/10 text-gold-300"
                                  : "bg-emerald-400/10 text-emerald-400"
                              }`}
                            >
                              {
                                result.opportunityLevel
                              }{" "}
                              OPPORTUNITY
                            </span>
                          )}
                        </div>
                      </div>

                      {/* =================================================
                          MAIN SCORE CIRCLE
                      ================================================= */}

                      <div className="relative mx-auto flex h-32 w-32 shrink-0 items-center justify-center lg:mx-0">
                        <svg
                          viewBox="0 0 100 100"
                          className="h-32 w-32 -rotate-90"
                        >
                          <circle
                            cx="50"
                            cy="50"
                            r="42"
                            fill="none"
                            stroke="rgba(255,255,255,0.08)"
                            strokeWidth="8"
                          />

                          <motion.circle
                            cx="50"
                            cy="50"
                            r="42"
                            fill="none"
                            stroke={scoreRing(
                              result.overallScore
                            )}
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={
                              circumference
                            }
                            initial={{
                              strokeDashoffset:
                                circumference,
                            }}
                            animate={{
                              strokeDashoffset:
                                circumference -
                                dash,
                            }}
                            transition={{
                              duration: 1,
                              ease: "easeOut",
                            }}
                          />
                        </svg>

                        <div className="absolute text-center">
                          <span
                            className={`block font-display text-3xl font-bold ${scoreColor(
                              result.overallScore
                            )}`}
                          >
                            {result.overallScore}
                          </span>

                          <span className="text-[10px] uppercase tracking-wider text-white/40">
                            Overall
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* =================================================
                        SUMMARY
                    ================================================= */}

                    {result.summary && (
                      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <SummaryItem
                          label="Critical"
                          value={
                            result.summary
                              .criticalIssues
                          }
                          danger
                        />

                        <SummaryItem
                          label="Warnings"
                          value={
                            result.summary
                              .warnings
                          }
                        />

                        <SummaryItem
                          label="Working Well"
                          value={
                            result.summary
                              .goodSignals
                          }
                          success
                        />

                        <SummaryItem
                          label="Recommendations"
                          value={
                            result.summary
                              .recommendations
                          }
                        />
                      </div>
                    )}
                  </div>

                  {/* =================================================
                      SCORE BREAKDOWN
                  ================================================= */}

                  {result.scores && (
                    <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                      <div className="mb-5">
                        <h3 className="font-display text-lg font-semibold text-white">
                          Website Health Breakdown
                        </h3>

                        <p className="mt-1 text-sm text-white/45">
                          Technical signals detected
                          from the website.
                        </p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <ScoreCard
                          icon={Palette}
                          label="Design"
                          score={
                            result.scores
                              .design
                          }
                        />

                        <ScoreCard
                          icon={Smartphone}
                          label="Mobile"
                          score={
                            result.scores
                              .mobile
                          }
                        />

                        <ScoreCard
                          icon={Search}
                          label="SEO"
                          score={
                            result.scores
                              .seo
                          }
                        />

                        <ScoreCard
                          icon={Gauge}
                          label="Performance"
                          score={
                            result.scores
                              .performance
                          }
                        />

                        <ScoreCard
                          icon={Accessibility}
                          label="Accessibility"
                          score={
                            result.scores
                              .accessibility
                          }
                        />

                        <ScoreCard
                          icon={ShieldCheck}
                          label="Security"
                          score={
                            result.scores
                              .security
                          }
                        />

                        <ScoreCard
                          icon={Code2}
                          label="Technical"
                          score={
                            result.scores
                              .technical
                          }
                        />

                        <ScoreCard
                          icon={TrendingUp}
                          label="Conversion"
                          score={
                            result.scores
                              .conversion
                          }
                        />
                      </div>
                    </div>
                  )}

                  {/* =================================================
                      ISSUES + GOOD SIGNALS
                  ================================================= */}

                  <div className="mt-6 grid gap-6 lg:grid-cols-2">
                    {/* Issues */}

                    {result.flags?.length > 0 && (
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                        <div className="mb-4 flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-red-400" />

                          <h3 className="text-sm font-semibold uppercase tracking-wide text-red-400">
                            Issues Found
                          </h3>
                        </div>

                        <ul className="space-y-3">
                          {result.flags.map(
                            (flag, index) => (
                              <li
                                key={index}
                                className="rounded-lg border border-white/5 bg-white/[0.02] p-3"
                              >
                                <div className="flex items-start gap-3">
                                  <XCircle
                                    className={`mt-0.5 h-4 w-4 shrink-0 ${
                                      flag.severity ===
                                      "bad"
                                        ? "text-red-400"
                                        : "text-gold-300"
                                    }`}
                                  />

                                  <div>
                                    <p className="text-sm text-white/80">
                                      {
                                        flag.label
                                      }
                                    </p>

                                    {flag.category && (
                                      <p className="mt-1 text-[10px] uppercase tracking-wider text-white/30">
                                        {
                                          flag.category
                                        }
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Working Well */}

                    {result.goodSignals?.length >
                      0 && (
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                        <div className="mb-4 flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-emerald-400" />

                          <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-400">
                            Working Well
                          </h3>
                        </div>

                        <ul className="space-y-3">
                          {result.goodSignals.map(
                            (signal, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-3 text-sm text-white/75"
                              >
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />

                                <span>
                                  {signal}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* =================================================
                      TECHNOLOGIES
                  ================================================= */}

                  {result.technologies?.length >
                    0 && (
                    <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                      <div className="flex items-center gap-2">
                        <Code2 className="h-5 w-5 text-gold-300" />

                        <h3 className="font-display text-lg font-semibold text-white">
                          Detected Technology
                        </h3>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {result.technologies.map(
                          (technology, index) => (
                            <span
                              key={index}
                              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70"
                            >
                              {technology}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* =================================================
                      RECOMMENDATIONS
                  ================================================= */}

                  {result.recommendations?.length >
                    0 && (
                    <div className="mt-6 rounded-2xl border border-gold-400/15 bg-gold-400/[0.03] p-6 sm:p-8">
                      <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-gold-300" />

                        <h3 className="font-display text-lg font-semibold text-white">
                          Recommended Improvements
                        </h3>
                      </div>

                      <div className="mt-4 space-y-3">
                        {result.recommendations.map(
                          (recommendation, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3"
                            >
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-400/10 text-xs font-semibold text-gold-300">
                                {index + 1}
                              </span>

                              <p className="pt-0.5 text-sm text-white/70">
                                {recommendation}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* =================================================
                      TECHNICAL DETAILS
                  ================================================= */}

                  {result.summary && (
                    <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                      <h3 className="font-display text-lg font-semibold text-white">
                        Technical Summary
                      </h3>

                      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                        <Stat
                          label="Images"
                          value={
                            result.summary
                              .images
                          }
                        />

                        <Stat
                          label="Forms"
                          value={
                            result.summary
                              .forms
                          }
                        />

                        <Stat
                          label="Scripts"
                          value={
                            result.summary
                              .scripts
                          }
                        />

                        <Stat
                          label="Stylesheets"
                          value={
                            result.summary
                              .stylesheets
                          }
                        />

                        <Stat
                          label="Words"
                          value={
                            result.summary
                              .words
                          }
                        />

                        <Stat
                          label="HTML Size"
                          value={`${result.htmlSizeKB || 0} KB`}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function SummaryItem({
  label,
  value,
  danger,
  success,
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center">
      <p className="text-2xl font-bold text-white">
        {value ?? 0}
      </p>

      <p
        className={`mt-1 text-[10px] font-semibold uppercase tracking-wider ${
          danger
            ? "text-red-400"
            : success
            ? "text-emerald-400"
            : "text-white/40"
        }`}
      >
        {label}
      </p>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
      <p className="text-lg font-semibold text-white">
        {value ?? 0}
      </p>

      <p className="mt-1 text-[10px] uppercase tracking-wider text-white/35">
        {label}
      </p>
    </div>
  );
}