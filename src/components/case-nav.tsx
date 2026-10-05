"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, type ComponentProps } from "react";
import { ArrowLeftIcon } from "./icons";

// Case studies opened from /projects carry ?from=projects, so the back link
// returns there. Anything else (homepage, direct visit) goes back home.
function useFromProjects() {
  return useSearchParams().get("from") === "projects";
}

function BackLinkView({ fromProjects }: { fromProjects: boolean }) {
  return (
    <Link
      href={fromProjects ? "/projects" : "/"}
      className="inline-flex items-center gap-1.5 self-start py-1 font-mono text-[13px] text-subtle hover:text-fg"
    >
      <ArrowLeftIcon size={14} />
      {fromProjects ? "all projects" : "home"}
    </Link>
  );
}

function BackLinkInner() {
  return <BackLinkView fromProjects={useFromProjects()} />;
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
  const query = useFromProjects() ? "?from=projects" : "";
  return <Link href={`/work/${slug}${query}`} {...props} />;
}

// Keeps the ?from=projects context when moving to the next case study.
export function NextProjectLink(props: NextLinkProps) {
  return (
    <Suspense fallback={<Link href={`/work/${props.slug}`} {...props} />}>
      <NextLinkInner {...props} />
    </Suspense>
  );
}
