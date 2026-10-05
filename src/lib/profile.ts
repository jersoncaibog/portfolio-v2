import data from "@/data/profile.json";

export type WorkImage = { src: string; alt: string; caption?: string };

export type Work = {
  slug: string;
  name: string;
  title: string;
  summary: string;
  role: string | null;
  year: string | null;
  stack: string[];
  cardStack: string[];
  links: { live: string | null; admin?: string | null; source: string | null };
  stats: { value: string; label: string }[];
  points: { label: string; text: string }[];
  images: WorkImage[];
  featured?: boolean;
};

export type TimelineItem = {
  start: string;
  end: string | null;
  title: string;
  org: string;
  blurb: string;
};

export const profile = data;

export const work = data.work as Work[];

// Homepage shows projects marked "featured": true, or the first 6 if none are marked.
const flagged = work.filter((w) => w.featured);
export const featuredWork = flagged.length > 0 ? flagged : work.slice(0, 6);

export function getWork(slug: string) {
  return work.find((w) => w.slug === slug);
}

export function getNextWork(slug: string) {
  const i = work.findIndex((w) => w.slug === slug);
  return work[(i + 1) % work.length];
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Dates are "YYYY" or "YYYY-MM"; null means "present".
function parse(date: string) {
  const [y, m] = date.split("-").map(Number);
  return { y, m: m ?? null };
}

function formatDate(date: string) {
  const { y, m } = parse(date);
  return m ? `${MONTHS[m - 1]} ${y}` : String(y);
}

export function formatRange(start: string, end: string | null) {
  return `${formatDate(start)} — ${end ? formatDate(end) : "Now"}`;
}

// Counts both the start and end month, the way LinkedIn does.
export function formatDuration(start: string, end: string | null, now = new Date()) {
  const s = parse(start);
  const e = end ? parse(end) : { y: now.getFullYear(), m: now.getMonth() + 1 };

  if (s.m === null || e.m === null) {
    const years = e.y - s.y;
    return `${years} ${years === 1 ? "yr" : "yrs"}`;
  }

  const total = (e.y - s.y) * 12 + (e.m - s.m) + 1;
  const years = Math.floor(total / 12);
  const months = total % 12;
  const parts = [];
  if (years) parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  if (months) parts.push(`${months} ${months === 1 ? "mo" : "mos"}`);
  return parts.join(" ");
}

export const timeline: TimelineItem[] = [
  ...data.experience.map((e) => ({
    start: e.start,
    end: e.end,
    title: e.role,
    org: e.company,
    blurb: e.blurb,
  })),
  ...data.education.map((e) => ({
    start: e.start,
    end: e.end,
    title: e.short.degree,
    org: e.short.school,
    blurb: e.short.blurb,
  })),
];
