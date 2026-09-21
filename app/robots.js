import { siteConfig } from "@/lib/config";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
  };
}
