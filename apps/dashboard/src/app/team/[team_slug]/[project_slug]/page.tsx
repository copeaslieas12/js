import { getProjects } from "@/api/projects";
import { notFound } from "next/navigation";
import { ProjectOverviewHeader } from "./components/ProjectOverviewHeader";
import { EmptyState } from "./components/EmptyState";

export default async function ProjectOverviewPage(props: {
  params: { team_slug: string; project_slug: string };
  searchParams: { from: string; to: string; type: string; interval: string };
}) {
  const projects = await getProjects(props.params.team_slug);

  const project = projects.find((p) => p.slug === props.params.project_slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="">
      <div className="dark:bg-muted/50 w-full border-border-800 border-b px-6">
        <div className="container">
          <ProjectOverviewHeader project={project} />
        </div>
      </div>
      <EmptyState />
    </div>
  );
}
