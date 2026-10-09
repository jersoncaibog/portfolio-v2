import "server-only";

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionDay = { date: string; count: number; level: ContributionLevel };

export type ContributionCalendar = {
  total: number;
  weeks: ContributionDay[][];
};

const LEVELS: Record<string, ContributionLevel> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const QUERY = `query ($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
    }
  }
}`;

type Response = {
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }[];
        };
      };
    } | null;
  };
};

// The last year of contributions from GitHub's GraphQL API, cached for a day.
// Returns null without a GITHUB_TOKEN or when the request fails, so the page
// renders without the section instead of breaking.
export async function getContributions(login: string): Promise<ContributionCalendar | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY, variables: { login } }),
      cache: "force-cache",
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;

    const json = (await res.json()) as Response;
    const calendar = json.data?.user?.contributionsCollection.contributionCalendar;
    if (!calendar) return null;

    return {
      total: calendar.totalContributions,
      weeks: calendar.weeks.map((week) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          level: LEVELS[day.contributionLevel] ?? 0,
        })),
      ),
    };
  } catch {
    return null;
  }
}
