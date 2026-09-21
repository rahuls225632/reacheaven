import { siteConfig } from "@/lib/config";
import { getServiceSlugs } from "@/data/services";

export default function sitemap() {
  const lastModified = new Date();

  const staticRoutes = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about", priority: 0.6, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
    { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms-and-conditions", priority: 0.2, changeFrequency: "yearly" },
  ];

  const serviceRoutes = getServiceSlugs().map((slug) => ({
    path: `/services/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  return [...staticRoutes, ...serviceRoutes].map((route) => ({
    url: new URL(route.path, siteConfig.url).toString(),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
