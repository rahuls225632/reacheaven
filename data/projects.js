// Real, live projects delivered by ReacHeaven.
// Screenshots live in /public/images/projects/. Replace the .webp files to update previews.

export const liveProjects = [
  {
    name: "NetaData",
    domain: "netadata.in",
    url: "https://netadata.in",
    category: "Data Platform",
    tagline: "India's political data, searchable in one place.",
    description:
      "A civic-data platform that brings politicians, parties, elections and constituencies together — with fast search, clean profiles and state-wise coverage, so anyone can understand how politics works.",
    image: "/images/projects/netadata.webp",
    imageAlt: "NetaData homepage showing search bar and political data statistics",
    glow: "rgba(44, 75, 176, 0.35)",
    stats: [
      { value: "4,336", label: "Politicians" },
      { value: "3,336", label: "Constituencies" },
      { value: "28", label: "States covered" },
    ],
    features: ["Instant search", "Party & election data", "State-wise explorer", "Mobile friendly"],
    floats: [
      { text: "4336+ Politicians", pos: "-left-4 top-10" },
      { text: "24 Elections", pos: "-right-4 bottom-12" },
    ],
  },
  {
    name: "Service Helpers",
    domain: "servicehelpers.in",
    url: "https://servicehelpers.in",
    category: "Local Services Marketplace",
    tagline: "Find trusted local vendors. List your business free.",
    description:
      "A location-based directory that connects customers with nearby service providers. Businesses get a free verified listing and receive calls directly — with categories, language options and an AI assistant to help find the right vendor.",
    image: "/images/projects/servicehelper.webp",
    imageAlt: "Service Helpers page inviting local businesses to register for a free listing",
    glow: "rgba(109, 63, 240, 0.35)",
    stats: [
      { value: "Free", label: "Business listing" },
      { value: "Verified", label: "Reviewed profiles" },
      { value: "Direct", label: "Customer calls" },
    ],
    features: ["Location-based search", "Multi-language", "AI chat assistant", "Vendor dashboard"],
    floats: [
      { text: "Verified profiles", pos: "-left-4 top-10" },
      { text: "Customers call you", pos: "-right-4 bottom-12" },
    ],
  },
];
