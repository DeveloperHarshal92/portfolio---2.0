import ProjectPage from "@/components/ProjectPage";
import { projects } from "@/data/projects";

export default async function Page({ params }) {
  const { slug } = await params;

  const index = projects.findIndex((project) => project.slug === slug);

  const project = projects[index];

  const next = projects[(index + 1) % projects.length] || projects[0];
  return (
    <>
      <ProjectPage project={project} next={next} />
    </>
  );
}
