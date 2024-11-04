import { getProjects } from "@/api/projects";
import { notFound } from "next/navigation";
import { ProjectOverviewHeader } from "./components/ProjectOverviewHeader";

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
    <div>
      <div className="w-full border-border-800 border-b bg-muted/50 px-6">
        <div className="container">
          <ProjectOverviewHeader project={project} />
        </div>
      </div>
    </div>
  );
}
