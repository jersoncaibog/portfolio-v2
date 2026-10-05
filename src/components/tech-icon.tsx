import {
  siClaude,
  siCloudflare,
  siExpress,
  siFastapi,
  siGit,
  siJavascript,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siPython,
  siReact,
  siSanity,
  siSupabase,
  siSvelte,
  siTailwindcss,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from "simple-icons";

const ICONS: Record<string, SimpleIcon> = {
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  Python: siPython,
  PHP: siPhp,
  React: siReact,
  "Next.js": siNextdotjs,
  SvelteKit: siSvelte,
  "Tailwind CSS": siTailwindcss,
  "Node.js": siNodedotjs,
  Express: siExpress,
  FastAPI: siFastapi,
  PostgreSQL: siPostgresql,
  Supabase: siSupabase,
  Vercel: siVercel,
  Cloudflare: siCloudflare,
  Git: siGit,
  Sanity: siSanity,
  "Claude Code": siClaude,
};

// Monochrome brand logo for a tech name, or nothing if we don't have one.
export function TechIcon({ name, size = 13, className }: { name: string; size?: number; className?: string }) {
  const icon = ICONS[name];
  if (!icon) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d={icon.path} />
    </svg>
  );
}
