import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon, ImagesIcon } from "@/components/icons";
import { Card, ImagePlaceholder, SectionLabel } from "@/components/ui";
import { profile, work } from "@/lib/profile";

export const metadata: Metadata = {
  title: `Projects — ${profile.name}`,
  description: `All projects by ${profile.name}, ${profile.title}.`,
};

export default function Projects() {
  return (
    <main className="mx-auto grid w-full max-w-300 grid-cols-12 gap-3 px-3 py-3 sm:px-6 sm:py-6">
      <Card className="col-span-12 flex flex-col gap-2.5">
        <Link href="/" className="inline-flex items-center gap-1.5 self-start py-1 font-mono text-[13px] text-subtle hover:text-fg">
          <ArrowLeftIcon size={14} />
          home
        </Link>
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="text-[26px] leading-tight font-semibold tracking-[-0.03em] md:text-[32px]">All projects</h1>
          <span className="font-mono text-[13px] text-subtle">{work.length} projects</span>
        </div>
      </Card>

      <Card className="col-span-12 flex flex-col p-3.5 sm:p-6">
        <SectionLabel className="mb-2 px-1 sm:px-0">Projects</SectionLabel>
        <ul>
          {work.map((item) => {
            const cover = item.images[0];
            return (
              <li key={item.slug} className="border-t border-line-soft first:border-t-0">
                <Link
                  href={`/work/${item.slug}`}
                  className="group grid grid-cols-[96px_minmax(0,1fr)] items-center gap-4 rounded-lg px-1 py-3.5 transition-colors hover:bg-surface-2 sm:grid-cols-[160px_minmax(0,1fr)_auto] sm:gap-6 sm:px-2"
                >
                  <div className="relative aspect-16/10 overflow-hidden rounded-[5px]">
                    {cover ? (
                      <Image
                        src={cover.src}
                        alt={cover.alt}
                        fill
                        sizes="160px"
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

                  <div className="flex min-w-0 flex-col gap-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <h2 className="text-sm font-semibold group-hover:text-white sm:text-base">{item.name}</h2>
                      <span className="shrink-0 font-mono text-[11px] text-faint sm:hidden">{item.year}</span>
                    </div>
                    <p className="hidden text-sm leading-relaxed text-muted sm:block">{item.summary}</p>
                    <p className="font-mono text-[11px] text-subtle sm:text-xs">{item.cardStack.join(" · ")}</p>
                  </div>

                  <div className="hidden items-center gap-4 sm:flex">
                    <span className="font-mono text-xs text-faint">{item.year}</span>
                    <ArrowRightIcon size={18} className="text-accent transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
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
