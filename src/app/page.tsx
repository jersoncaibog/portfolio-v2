import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon, FileDownIcon, GitHubIcon, ImagesIcon, LinkedInIcon, MailIcon, PhoneIcon } from "@/components/icons";
import { ContributionGraph } from "@/components/contributions";
import { TechIcon } from "@/components/tech-icon";
import { ButtonLink, Card, Chip, ImagePlaceholder, MetaBadges, SectionLabel } from "@/components/ui";
import { getContributions } from "@/lib/github";
import { featuredWork, formatDuration, formatRange, profile, timeline } from "@/lib/profile";

// Re-render daily so "Now" durations stay current.
export const revalidate = 86400;

export default async function Home() {
  const { contact, links } = profile;
  const githubLogin = new URL(links.github).pathname.split("/").filter(Boolean)[0];
  const contributions = await getContributions(githubLogin);
  const phoneHref = `tel:${contact.phone.replace(/\s/g, "")}`;

  return (
    <main className="mx-auto flex w-full max-w-192 flex-col gap-3 px-3 py-3 sm:px-6 sm:py-6">
      {/* Hero */}
      <Card className="flex flex-col gap-5 md:flex-row md:flex-wrap md:items-center md:gap-6">
        <div className="flex min-w-0 flex-1 items-center gap-4 md:gap-6">
          {profile.photo ? (
            <div className="size-17 shrink-0 overflow-hidden rounded-lg border border-line-strong bg-surface-2 md:size-28">
              <Image
                src={profile.photo}
                alt={profile.name}
                width={224}
                height={224}
                priority
                className="size-full object-cover"
              />
            </div>
          ) : (
            <ImagePlaceholder label={profile.initials} className="size-17 shrink-0 rounded-lg md:size-28" />
          )}
          <div className="flex min-w-0 flex-col gap-1.5 md:gap-2">
            <h1 className="text-[22px] leading-tight font-semibold tracking-[-0.03em]">{profile.name}</h1>
            <p className="text-sm text-subtle md:text-[15px]">
              {profile.title} <span className="text-line-strong">/</span> {profile.location.replace(", Metro Manila", "")}
            </p>
            <div className="hidden flex-wrap gap-x-5 gap-y-1 pt-0.5 font-mono text-[13px] md:flex">
              <ContactLinks email={contact.email} phone={contact.phone} phoneHref={phoneHref} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-0.5 font-mono text-[13px] md:hidden">
          <ContactLinks email={contact.email} phone={contact.phone} phoneHref={phoneHref} />
        </div>

        <div className="grid grid-cols-3 gap-2 md:flex md:flex-wrap md:self-end">
          <ButtonLink href={links.github} target="_blank" rel="noreferrer">
            <GitHubIcon className="hidden sm:block" /> GitHub
          </ButtonLink>
          <ButtonLink href={links.linkedin} target="_blank" rel="noreferrer">
            <LinkedInIcon className="hidden sm:block" /> LinkedIn
          </ButtonLink>
          {links.resume && (
            <ButtonLink href={links.resume} target="_blank" rel="noreferrer">
              <FileDownIcon className="hidden sm:block" /> Resume
            </ButtonLink>
          )}
        </div>
      </Card>

      {/* About */}
      <Card id="about" className="flex flex-col gap-3.5">
        <SectionLabel index="01">About</SectionLabel>
        <p className="text-sm leading-relaxed text-fg-2 md:text-[15px]">{profile.about}</p>
        <p className="font-mono text-xs text-subtle">
          BS Information Technology, Cum Laude · Eastern Samar State University, {profile.education[0].end}
        </p>
      </Card>

      {/* Skills */}
      <Card id="skills" className="flex flex-col gap-3.5">
        <SectionLabel index="02">Skills</SectionLabel>
        <ul className="flex flex-wrap gap-1.5">
          {profile.featuredSkills.map((skill) => (
            <li key={skill}>
              <Chip icon={<TechIcon name={skill} className="shrink-0 text-subtle" />}>{skill}</Chip>
            </li>
          ))}
        </ul>
      </Card>

      {/* Experience */}
      <Card id="experience" className="flex flex-col">
        <SectionLabel index="03" className="mb-2.5">
          Experience &amp; education
        </SectionLabel>
        <ol>
          {timeline.map((item) => (
            <li
              key={`${item.title}-${item.start}`}
              className="flex flex-col gap-1.5 border-t border-line-soft py-3.5 sm:grid sm:grid-cols-[170px_minmax(0,1fr)] sm:gap-4"
            >
              <p className="flex gap-1.5 font-mono text-[11px] sm:flex-col sm:gap-1 sm:text-xs">
                <span className="text-subtle">{formatRange(item.start, item.end)}</span>
                <span className="text-subtle sm:hidden">·</span>
                <span className="text-accent">{formatDuration(item.start, item.end)}</span>
              </p>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-sm font-semibold">
                  {item.title} <span className="font-normal text-subtle">· {item.org}</span>
                </h3>
                <p className="text-[13px] leading-relaxed text-muted sm:text-sm">{item.blurb}</p>
              </div>
            </li>
          ))}
        </ol>
      </Card>

      {/* Work */}
      <Card id="work" className="flex flex-col gap-4 p-3.5 sm:p-6">
        <div className="flex items-center justify-between gap-3 px-1 sm:px-0">
          <SectionLabel index="04">Selected work</SectionLabel>
          <Link href="/projects" className="group inline-flex items-center gap-1.5 py-2 text-sm font-medium text-fg-3 hover:text-white">
            All projects
            <ArrowRightIcon size={15} className="text-accent transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-2 sm:gap-3">
          {featuredWork.map((item) => {
            const cover = item.images[0];
            return (
              <li key={item.slug}>
                <Link
                  href={`/work/${item.slug}`}
                  className="group flex h-full flex-col gap-3 rounded-lg border border-line bg-inset p-1.5 pb-3 transition-colors hover:border-accent/50 sm:p-2.5 sm:pb-3.5"
                >
                  <div className="relative aspect-4/3 overflow-hidden rounded-[5px] sm:aspect-16/10">
                    {cover ? (
                      <Image
                        src={cover.src}
                        alt={cover.alt}
                        fill
                        sizes="(min-width: 1024px) 370px, 50vw"
                        className="border border-line object-cover"
                      />
                    ) : (
                      <ImagePlaceholder label="screenshot" className="size-full rounded-[5px]" />
                    )}
                    {item.images.length > 1 && (
                      <span className="absolute right-2 bottom-2 flex items-center gap-1.5 rounded-[5px] border border-line-strong bg-bg/85 px-1.5 py-0.5 font-mono text-[11px] text-fg-3">
                        <ImagesIcon size={12} />
                        {item.images.length}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 px-1">
                    <h3 className="text-[13px] leading-snug font-semibold group-hover:text-white sm:text-sm">{item.name}</h3>
                    <p className="font-mono text-[10px] text-subtle sm:text-xs">{item.cardStack.join(" · ")}</p>
                    <div className="pt-1">
                      <MetaBadges year={item.year} org={item.org} />
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* GitHub */}
      {contributions && (
        <Card id="github" className="flex flex-col gap-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <SectionLabel index="05">Github</SectionLabel>
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 font-mono text-xs text-subtle hover:text-fg sm:text-[13px]"
            >
              @{githubLogin}
              <ArrowUpRightIcon size={13} className="text-accent" />
            </a>
          </div>
          <ContributionGraph calendar={contributions} />
        </Card>
      )}

      <footer className="flex flex-wrap justify-between gap-2 px-1 py-2.5 font-mono text-xs text-faint">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Built with Next.js · Hosted on Vercel</span>
      </footer>
    </main>
  );
}

function ContactLinks({ email, phone, phoneHref }: { email: string; phone: string; phoneHref: string }) {
  return (
    <>
      <a href={`mailto:${email}`} className="flex items-center gap-2 py-1.5 text-fg-3 hover:text-white md:py-1">
        <MailIcon size={14} className="text-accent" />
        {email}
      </a>
      <a href={phoneHref} className="flex items-center gap-2 py-1.5 text-fg-3 hover:text-white md:py-1">
        <PhoneIcon size={14} className="text-accent" />
        {phone}
      </a>
    </>
  );
}
