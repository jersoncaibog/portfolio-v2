import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons";
import { ProjectList } from "@/components/project-list";
import { Card } from "@/components/ui";
import { profile, work } from "@/lib/profile";

export const metadata: Metadata = {
  title: `Projects — ${profile.name}`,
  description: `All projects by ${profile.name}, ${profile.title}.`,
};

export default function Projects() {
  return (
    <main className="mx-auto grid w-full max-w-192 grid-cols-12 gap-3 px-3 py-3 sm:px-6 sm:py-6">
      <Card className="col-span-12 flex flex-col gap-2.5">
        <Link href="/" className="inline-flex items-center gap-1.5 self-start py-1 font-mono text-[13px] text-subtle hover:text-fg">
          <ArrowLeftIcon size={14} />
          home
        </Link>
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="text-[22px] leading-tight font-semibold tracking-[-0.03em]">All projects</h1>
          <span className="font-mono text-[13px] text-subtle">{work.length} projects</span>
        </div>
      </Card>

      <Card className="col-span-12 flex flex-col p-3.5 sm:p-6">
        <ProjectList items={work} />
      </Card>

      <footer className="col-span-12 flex flex-wrap justify-between gap-2 px-1 py-2.5 font-mono text-xs text-faint">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>Built with Next.js · Hosted on Vercel</span>
      </footer>
    </main>
  );
}
