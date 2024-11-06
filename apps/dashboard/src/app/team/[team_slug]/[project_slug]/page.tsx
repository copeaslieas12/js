import { getProjects } from "@/api/projects";
import { notFound } from "next/navigation";
import { CombinedBarChart } from "./components/CombinedBarChart";
import { EmptyState } from "./components/EmptyState";
import { ProjectOverviewHeader } from "./components/ProjectOverviewHeader";

const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
];

export default async function ProjectOverviewPage(props: {
  params: Promise<{ team_slug: string; project_slug: string }>;
  searchParams: Promise<{ usersChart: string }>;
}) {
  const [params, searchParams] = await Promise.all([
    props.params,
    props.searchParams,
  ]);
  const projects = await getProjects(params.team_slug);
  const project = projects.find((p) => p.slug === params.project_slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="">
      <div className="w-full border-border-800 border-b px-6 dark:bg-muted/50">
        <ProjectOverviewHeader project={project} />
      </div>
      <div className="container p-6">
        <EmptyState />
        <CombinedBarChart
          title="Users"
          chartConfig={{
            desktop: { label: "Desktop", color: "hsl(var(--chart-1))" },
            mobile: { label: "Mobile", color: "hsl(var(--chart-2))" },
          }}
          activeChart={
            (searchParams.usersChart ?? "desktop") as "desktop" | "mobile"
          }
          data={chartData}
        />
      </div>
    </div>
  );
}
