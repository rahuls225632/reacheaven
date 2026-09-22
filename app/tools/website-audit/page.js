import AuditClient from "@/components/audit/AuditClient";

export const metadata = {
  title: "Website Audit (Internal)",
  robots: { index: false, follow: false },
};

export default function WebsiteAuditPage() {
  return <AuditClient />;
}
