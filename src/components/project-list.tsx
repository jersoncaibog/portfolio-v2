"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import type { Work } from "@/lib/profile";
import { ArrowRightIcon, ImagesIcon } from "./icons";
import { cx, ImagePlaceholder, MetaBadges, SectionLabel } from "./ui";

type Sort = "relevance" | "date";

const SORTS: { value: Sort; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "date", label: "Date" },
];

// Newest year first. Array.sort is stable, so projects from the same year
// keep their relevance order; projects without a year go last.
function sortWork(items: Work[], sort: Sort) {
  if (sort === "relevance") return items;
  return [...items].sort((a, b) => Number(b.year ?? 0) - Number(a.year ?? 0));
}

function ProjectListView({ items, sort }: { items: Work[]; sort: Sort }) {
  const query = sort === "date" ? "?from=projects&sort=date" : "?from=projects";

  return (
    <>
      <div className="mb-2 flex items-center justify-between gap-3 px-1 sm:px-0">
        <SectionLabel>Projects</SectionLabel>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-subtle sm:text-xs">Sort</span>
          <div className="flex rounded-md border border-line-chip bg-inset p-0.5">
            {SORTS.map((option) => (
              <Link
                key={option.value}
                href={option.value === "date" ? "/projects?sort=date" : "/projects"}
                replace
                scroll={false}
                aria-current={sort === option.value ? "true" : undefined}
                className={cx(
                  "rounded-[5px] px-2.5 py-1 font-mono text-[11px] transition-colors sm:text-xs",
                  sort === option.value ? "bg-surface-2 text-fg" : "text-subtle hover:text-fg",
                )}
              >
                {option.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <ul>
        {sortWork(items, sort).map((item) => {
          const cover = item.images[0];
          return (
            <li key={item.slug} className="border-t border-line-soft first:border-t-0">
              <Link
                href={`/work/${item.slug}${query}`}
                className="group grid grid-cols-[96px_minmax(0,1fr)] items-center gap-4 rounded-lg px-1 py-3.5 transition-colors hover:bg-surface-2 sm:grid-cols-[200px_minmax(0,1fr)_auto] sm:gap-6 sm:px-2"
              >
                <div className="relative aspect-16/10 overflow-hidden rounded-[5px]">
                  {cover ? (
                    <Image
                      src={cover.src}
                      alt={cover.alt}
                      fill
                      sizes="(min-width: 640px) 200px, 96px"
                      className="border border-line object-cover"
                    />
                  ) : (
                    <ImagePlaceholder className="size-full rounded-[5px]" />
                  )}
                  {item.images.length > 1 && (
                    <span className="absolute right-1.5 bottom-1.5 flex items-center gap-1 rounded-[4px] border border-line-strong bg-bg/85 px-1 font-mono text-[10px] text-fg-3">
                      <ImagesIcon size={10} />
                      {item.images.length}
                    </span>
                  )}
                </div>

                <div className="flex min-w-0 flex-col gap-1.5 sm:gap-2">
                  <h2 className="text-sm font-semibold group-hover:text-white sm:text-[15px]">{item.name}</h2>
                  <p className="hidden text-sm leading-relaxed text-muted sm:block">{item.summary}</p>
                  <p className="font-mono text-[11px] text-subtle sm:text-xs">{item.cardStack.join(" · ")}</p>
                  <div className="pt-1">
                    <MetaBadges year={item.year} org={item.org} />
                  </div>
                </div>

                <div className="hidden items-center sm:flex">
                  <ArrowRightIcon size={18} className="text-accent transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function ProjectListInner({ items }: { items: Work[] }) {
  const sort: Sort = useSearchParams().get("sort") === "date" ? "date" : "relevance";
  return <ProjectListView items={items} sort={sort} />;
}

// The ?sort param is read on the client, so the page stays prerendered with the
// relevance order as its initial HTML.
export function ProjectList({ items }: { items: Work[] }) {
  return (
    <Suspense fallback={<ProjectListView items={items} sort="relevance" />}>
      <ProjectListInner items={items} />
    </Suspense>
  );
}
