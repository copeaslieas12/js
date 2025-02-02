import type { Ecosystem } from "app/(dashboard)/dashboard/connect/ecosystem/types";
import type { Range } from "components/analytics/date-range-selector";
import { fetchApiServer } from "data/analytics/fetch-api-server";
import { FetchError } from "utils/error";
import { EcosystemAnalyticsPage } from "../../../../../../../../(dashboard)/dashboard/connect/ecosystem/[slug]/(active)/analytics/components/EcosystemAnalyticsPage";

export default async function Page(props: {
  params: Promise<{
    slug: string;
    team_slug: string;
    project_slug: string;
  }>;
  searchParams: Promise<{
    interval?: "day" | "week";
    range?: Range;
  }>;
}) {
  const [params, searchParams] = await Promise.all([
    props.params,
    props.searchParams,
  ]);

  const ecosystem = await getEcosystem(params.slug);
  return (
    <EcosystemAnalyticsPage
      ecosystemId={ecosystem.id}
      interval={searchParams.interval || "week"}
      range={searchParams.range}
    />
  );
}

async function getEcosystem(ecosystemSlug: string) {
  const res = await fetchApiServer(`/v1/ecosystem-wallet/${ecosystemSlug}`);

  if (!res.ok) {
    const data = await res.json();
    console.error(data);
    throw new FetchError(
      res,
      data?.message ?? data?.error?.message ?? "Failed to fetch ecosystems",
    );
  }

  const data = (await res.json()) as { result: Ecosystem };
  return data.result;
}
