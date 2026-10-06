"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, type ComponentProps } from "react";
import { ArrowLeftIcon } from "./icons";

// Case studies opened from /projects carry ?from=projects (plus &sort=date when
// the list was sorted by date), so the back link returns to the same list.
// Anything else (homepage, direct visit) goes back home.
function useListContext() {
  const params = useSearchParams();
  const fromProjects = params.get("from") === "projects";
  const byDate = fromProjects && params.get("sort") === "date";
  return { fromProjects, byDate };
}

function BackLinkView({ fromProjects, byDate = false }: { fromProjects: boolean; byDate?: boolean }) {
  return (
    <Link
      href={fromProjects ? (byDate ? "/projects?sort=date" : "/projects") : "/"}
      className="inline-flex items-center gap-1.5 self-start py-1 font-mono text-[13px] text-subtle hover:text-fg"
    >
      <ArrowLeftIcon size={14} />
      {fromProjects ? "all projects" : "home"}
    </Link>
  );
}

function BackLinkInner() {
  return <BackLinkView {...useListContext()} />;
}

export function BackLink() {
  return (
    <Suspense fallback={<BackLinkView fromProjects={false} />}>
      <BackLinkInner />
    </Suspense>
  );
}

type NextLinkProps = Omit<ComponentProps<typeof Link>, "href"> & { slug: string };

function NextLinkInner({ slug, ...props }: NextLinkProps) {
  const { fromProjects, byDate } = useListContext();
  const query = fromProjects ? (byDate ? "?from=projects&sort=date" : "?from=projects") : "";
  return <Link href={`/work/${slug}${query}`} {...props} />;
}

// Keeps the list context (?from=projects, ?sort=date) when moving to the next case study.
export function NextProjectLink(props: NextLinkProps) {
  return (
    <Suspense fallback={<Link href={`/work/${props.slug}`} {...props} />}>
      <NextLinkInner {...props} />
    </Suspense>
  );
}
