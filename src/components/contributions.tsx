import type { ContributionCalendar, ContributionLevel } from "@/lib/github";
import { cx } from "./ui";

// Empty days use the chip surface; active days step up through the accent.
const LEVEL_CLASS: Record<ContributionLevel, string> = {
  0: "bg-surface-2",
  1: "bg-accent/25",
  2: "bg-accent/50",
  3: "bg-accent/75",
  4: "bg-accent",
};

// Phones only show the most recent weeks so the cells stay readable.
const MOBILE_WEEKS = 22;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDay(date: string, count: number) {
  const label = new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  return `${count === 0 ? "No" : count} contribution${count === 1 ? "" : "s"} on ${label}`;
}

export function ContributionGraph({ calendar }: { calendar: ContributionCalendar }) {
  const { weeks } = calendar;

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-flow-col auto-cols-fr gap-0.5 sm:gap-[3px]">
        {weeks.map((week, i) => {
          const month = Number(week[0].date.slice(5, 7)) - 1;
          const prevMonth = i > 0 ? Number(weeks[i - 1][0].date.slice(5, 7)) - 1 : -1;
          // Label the first full week of each month; skip a partial first column.
          const showMonth = i > 0 && month !== prevMonth && i < weeks.length - 2;
          const mobileHidden = i < weeks.length - MOBILE_WEEKS;

          return (
            <div key={week[0].date} className={cx("flex min-w-0 flex-col gap-0.5 sm:gap-[3px]", mobileHidden && "hidden sm:flex")}>
              <span className="h-3.5 overflow-visible font-mono text-[10px] leading-none whitespace-nowrap text-subtle">
                {showMonth ? MONTHS[month] : ""}
              </span>
              {Array.from({ length: 7 }, (_, weekday) => {
                const day = week.find((d) => new Date(`${d.date}T00:00:00Z`).getUTCDay() === weekday);
                return day ? (
                  <span
                    key={weekday}
                    title={formatDay(day.date, day.count)}
                    className={cx("aspect-square rounded-[2px]", LEVEL_CLASS[day.level])}
                  />
                ) : (
                  <span key={weekday} className="aspect-square" />
                );
              })}
            </div>
          );
        })}
      </div>

      <p className="font-mono text-[10px] text-subtle sm:text-[11px]">
        <span className="text-fg-3">{calendar.total.toLocaleString("en-US")}</span> contributions in the last year
      </p>
    </div>
  );
}
