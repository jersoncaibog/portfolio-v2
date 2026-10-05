import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/gallery";
import { BackLink, NextProjectLink } from "@/components/case-nav";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons";
import { ButtonLink, Card, Chip, SectionLabel } from "@/components/ui";
import { getNextWork, getWork, profile, work } from "@/lib/profile";

export const dynamicParams = false;

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const item = getWork(slug);
  if (!item) return {};
  return { title: `${item.title} — ${profile.name}`, description: item.summary };
}

export default async function CaseStudy(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const item = getWork(slug);
  if (!item) notFound();
  const next = getNextWork(slug);

  return (
    <main className="mx-auto grid w-full max-w-192 grid-cols-12 gap-3 px-3 py-3 sm:px-6 sm:py-6">
      {/* Header */}
      <Card className="col-span-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="flex min-w-0 flex-col gap-2.5">
          <BackLink />
          <h1 className="text-[22px] leading-tight font-semibold tracking-[-0.03em]">{item.title}</h1>
          <p className="max-w-170 text-sm leading-normal text-muted md:text-[15px]">{item.summary}</p>
        </div>
        {(item.links.live || item.links.admin || item.links.source) && (
          <div className="flex shrink-0 flex-wrap gap-2">
            {item.links.live && (
              <a
                href={item.links.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-bg hover:bg-[#b9a3fb]"
              >
                Live site <ArrowUpRightIcon size={15} strokeWidth={2.2} />
              </a>
            )}
            {item.links.admin && (
              <ButtonLink href={item.links.admin} target="_blank" rel="noreferrer">
                Admin panel <ArrowUpRightIcon size={15} />
              </ButtonLink>
            )}
            {item.links.source && (
              <ButtonLink href={item.links.source} target="_blank" rel="noreferrer">
                Source <ArrowUpRightIcon size={15} />
              </ButtonLink>
            )}
          </div>
        )}
      </Card>

      {/* Images + details */}
      <Gallery images={item.images} className="col-span-12 md:col-span-8" />
      <Card className="col-span-12 flex flex-col gap-5 md:col-span-4">
        {item.role && <Detail label="Role">{item.role}</Detail>}
        {item.year && <Detail label="Year">{item.year}</Detail>}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs text-subtle">STACK</span>
          <ul className="flex flex-wrap gap-1.5">
            {item.stack.map((tech) => (
              <li key={tech}>
                <Chip>{tech}</Chip>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      {/* Numbers */}
      {item.stats.length > 0 && (
        <ul className="col-span-12 grid grid-cols-2 gap-3 md:auto-cols-fr md:grid-flow-col md:grid-cols-none">
          {item.stats.map((stat) => (
            <li key={stat.label} className="flex flex-col gap-1 rounded-[10px] border border-line bg-surface px-5 py-4">
              <span className="font-mono text-[22px] font-medium tracking-[-0.02em] text-accent">{stat.value}</span>
              <span className="text-sm text-subtle">{stat.label}</span>
            </li>
          ))}
        </ul>
      )}

      {/* What I built */}
      <Card className="col-span-12 flex flex-col gap-4">
        <SectionLabel>What I built</SectionLabel>
        <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
          {item.points.map((point) => (
            <li key={point.label} className="flex flex-col gap-1.5 border-t border-line-soft pt-3.5">
              <h3 className="text-sm font-semibold">{point.label}</h3>
              <p className="text-sm leading-relaxed text-muted">{point.text}</p>
            </li>
          ))}
        </ul>
      </Card>

      {/* Next */}
      <NextProjectLink
        slug={next.slug}
        className="col-span-12 flex items-center justify-between gap-4 rounded-[10px] border border-line bg-surface px-5 py-4 transition-colors hover:border-accent/50 sm:px-6"
      >
        <span className="flex flex-col gap-1">
          <span className="font-mono text-xs text-subtle">NEXT PROJECT</span>
          <span className="text-base font-semibold">{next.name}</span>
        </span>
        <ArrowRightIcon size={20} className="shrink-0 text-accent" />
      </NextProjectLink>

      <footer className="col-span-12 flex flex-wrap justify-between gap-2 px-1 py-2.5 font-mono text-xs text-faint">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Built with Next.js · Hosted on Vercel</span>
      </footer>
    </main>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-xs text-subtle uppercase">{label}</span>
      <span className="font-medium">{children}</span>
    </div>
  );
}
