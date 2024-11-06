import { getProjects } from "@/api/projects";
import type { WalletStats } from "@3rdweb-sdk/react/hooks/useApi";
import {
  type DurationId,
  type Range,
  getLastNDaysRange,
} from "components/analytics/date-range-selector";
import { fetchAnalytics } from "data/analytics/fetch-analytics";
import { notFound } from "next/navigation";
import { CombinedBarChart } from "./components/CombinedBarChart";
import { EmptyState } from "./components/EmptyState";
import { ProjectOverviewHeader } from "./components/ProjectOverviewHeader";

export default async function ProjectOverviewPage(props: {
  params: Promise<{ team_slug: string; project_slug: string }>;
  searchParams: Promise<{
    usersChart: string;
    from: string;
    to: string;
    type: string;
    interval: string;
  }>;
}) {
  const [params, searchParams] = await Promise.all([
    props.params,
    props.searchParams,
  ]);
  const projects = await getProjects(params.team_slug);
  const project = projects.find((p) => p.slug === params.project_slug);
  const interval = (searchParams.interval as "day" | "week") ?? "day";
  const rangeType = (searchParams.type as DurationId) || "last-120";
  const range: Range = {
    from: new Date(searchParams.from ?? getLastNDaysRange(rangeType).from),
    to: new Date(searchParams.to ?? getLastNDaysRange(rangeType).to),
    type: rangeType,
  };

  if (!project) {
    notFound();
  }

  const walletConnectionTimeSeries = await getWalletConnections({
    clientId: params.project_slug,
    from: range.from,
    to: range.to,
    period:
      (searchParams.interval as "day" | "week" | "month" | "year" | "all") ??
      interval,
  });

  const walletConnections = await getAggregatedWalletConnections({
    clientId: params.project_slug,
    from: range.from,
    to: range.to,
  });

  const isEmpty = walletConnectionTimeSeries.length === 0;

  return (
    <div className="">
      <div className="w-full border-border-800 border-b px-6 dark:bg-muted/50">
        <ProjectOverviewHeader
          project={project}
          interval={interval}
          range={range}
        />
      </div>
      <div className="container p-6">
        {isEmpty ? (
          <EmptyState />
        ) : (
          <>
            <UsersChart
              chartKey={
                (searchParams.usersChart as "totalUsers" | "uniqueUsers") ??
                "totalUsers"
              }
              data={walletConnectionTimeSeries}
              aggregatedData={walletConnections}
            />
          </>
        )}
      </div>
    </div>
  );
}

async function UsersChart({
  chartKey,
  data,
  aggregatedData,
}: {
  chartKey: "totalUsers" | "uniqueUsers";
  data: WalletStats[];
  aggregatedData: WalletStats[];
}) {
  const formattedData = (() => {
    const _data: { date: string; totalUsers: number; uniqueUsers: number }[] =
      [];
    for (const stat of data) {
      if (!_data.find((d) => d.date === stat.date)) {
        _data.push({
          date: stat.date,
          totalUsers: stat.totalConnections,
          uniqueUsers: stat.uniqueWalletsConnected,
        });
      } else {
        const existing = _data.find((d) => d.date === stat.date);
        if (!existing) {
          throw new Error("Unreachable");
        }
        existing.totalUsers += stat.totalConnections;
        existing.uniqueUsers += stat.uniqueWalletsConnected;
      }
    }
    return _data;
  })();

  const formattedAggregatedData = (() => {
    const _data: { totalUsers: number; uniqueUsers: number } = {
      totalUsers: 0,
      uniqueUsers: 0,
    };
    for (const stat of aggregatedData) {
      _data.totalUsers += stat.totalConnections;
      _data.uniqueUsers += stat.uniqueWalletsConnected;
    }
    return _data;
  })();

  return (
    <CombinedBarChart
      title="Users"
      chartConfig={{
        totalUsers: { label: "Total Users", color: "hsl(var(--chart-1))" },
        uniqueUsers: { label: "Unique Users", color: "hsl(var(--chart-2))" },
      }}
      activeChart={chartKey}
      data={formattedData}
      aggregateFn={(_data, key) => formattedAggregatedData[key]}
    />
  );
}

export async function getWalletConnections(args: {
  clientId: string;
  from?: Date;
  to?: Date;
  period?: "day" | "week" | "month" | "year" | "all";
}): Promise<WalletStats[]> {
  const { clientId, from, to, period } = args;

  const searchParams = new URLSearchParams();
  searchParams.append("clientId", clientId);
  if (from) {
    searchParams.append("from", from.toISOString());
  }
  if (to) {
    searchParams.append("to", to.toISOString());
  }
  if (period) {
    searchParams.append("period", period);
  }
  const res = await fetchAnalytics(`v1/wallets?${searchParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res?.status !== 200) {
    console.error("Failed to fetch wallet connections");
    return [];
  }

  const json = await res.json();

  return json.data as WalletStats[];
}

export async function getAggregatedWalletConnections(args: {
  clientId: string;
  from?: Date;
  to?: Date;
}): Promise<WalletStats[]> {
  const { clientId, from, to } = args;

  const searchParams = new URLSearchParams();
  searchParams.append("clientId", clientId);
  searchParams.append("period", "all");
  if (from) {
    searchParams.append("from", from.toISOString());
  }
  if (to) {
    searchParams.append("to", to.toISOString());
  }
  const res = await fetchAnalytics(`v1/wallets?${searchParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res?.status !== 200) {
    console.error("Failed to fetch wallet connections");
    return [];
  }

  const json = await res.json();

  return json.data as WalletStats[];
}
