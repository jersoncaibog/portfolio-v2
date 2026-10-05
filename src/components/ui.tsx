import type { ComponentProps, ReactNode } from "react";

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Card({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      className={cx("rounded-[10px] border border-line bg-surface p-5 sm:p-6", className)}
      {...props}
    />
  );
}

export function SectionLabel({ index, children, className }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <h2 className={cx("font-mono text-[13px] font-medium tracking-[0.04em] text-subtle uppercase", className)}>
      {index && <span className="text-accent">{index}</span>}
      {index && " / "}
      {children}
    </h2>
  );
}

export function Chip({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-line-chip bg-surface-2 px-2.5 py-1 font-mono text-xs text-fg-3">
      {icon}
      {children}
    </span>
  );
}

export function ButtonLink({ className, ...props }: ComponentProps<"a">) {
  return (
    <a
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-lg border border-line-strong bg-surface-2 px-3 py-1.5 text-sm font-medium text-fg transition-colors hover:border-accent/60 hover:text-white",
        className,
      )}
      {...props}
    />
  );
}

// Striped stand-in until real screenshots are added.
export function ImagePlaceholder({ label, className }: { label?: string; className?: string }) {
  return (
    <div
      className={cx(
        "placeholder-stripes flex items-center justify-center border border-line font-mono text-[11px] text-faint",
        className,
      )}
    >
      {label}
    </div>
  );
}
