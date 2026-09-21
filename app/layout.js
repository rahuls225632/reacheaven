import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/config";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.businessName} — Software & Website Development Company`,
    template: `%s — ${siteConfig.businessName}`,
  },
  description: siteConfig.description,
  keywords: [
    "software development company",
    "web development company",
    "website development services",
    "custom website development",
    "business website development",
    "e-commerce website development",
    "web application development",
    "website redesign services",
    "website maintenance services",
  ],
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: `${siteConfig.businessName} — Software & Website Development Company`,
    description: siteConfig.description,
    siteName: siteConfig.businessName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.businessName} — Software & Website Development Company`,
    description: siteConfig.description,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-mist font-sans text-ink">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      </body>
    </html>
  );
}
