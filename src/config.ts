/**
 * Starter configuration. Change these values before publishing your site.
 */
export const SITE = {
  url: "https://example.com",
  title: "Your Name",
  titleMark: "",
  tagline: "Your role · your point of view",
  description: "A short, specific introduction to your work.",
  lang: "en",
  locale: "en_US",
  defaultOgImage: "/og-default.png",
} as const;

export const AUTHOR = {
  name: "Your Name",
  url: "",
  bio: "A short professional bio.",
} as const;

export const NAV = [
  { label: "Resume", href: "/resume/" },
  { label: "Notebook", href: "/blog/", optional: true },
] as const;

export const SOCIAL = [
  // { label: "GitHub", href: "https://github.com/your-handle" },
  // { label: "LinkedIn", href: "https://www.linkedin.com/in/your-handle" },
] as const;

export const BLOG = {
  enabled: false,
  postsPerPage: 8,
  postsOnHome: 0,
  wordsPerMinute: 220,
  showReadingTime: true,
  showTableOfContents: true,
  tocMinHeadings: 3,
} as const;

export const INK = {
  hero: true,
  divider: false,
  strength: 1,
  ascii: 0,
  cellWidth: 8,
  cellHeight: 13,
  autoFlow: true,
  autoFlowIntervalMinMs: 1200,
  autoFlowIntervalMaxMs: 2400,
  autoFlowAmountMin: 0.45,
  autoFlowAmountMax: 0.8,
  vorticity: 28,
} as const;

export const OG = {
  enabled: true,
  width: 1200,
  height: 630,
} as const;
