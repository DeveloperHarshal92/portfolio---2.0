import ProjectPage from "@/components/ProjectPage";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return projects.flatMap((project) => [
    { slug: project.slug },
    { slug: encodeURIComponent(project.slug) },
    { slug: project.slug.toLowerCase() },
    { slug: project.slug.toLowerCase().replace(/[\s_]+/g, "-") },
  ]);
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug;

  if (!rawSlug) {
    notFound();
  }

  const decodedSlug = decodeURIComponent(rawSlug).toLowerCase().trim();
  const slugNoHyphen = decodedSlug.replace(/[-_]+/g, " ");

  const index = projects.findIndex((project) => {
    const pSlug = (project.slug || "").toLowerCase().trim();
    const pSlugNoHyphen = pSlug.replace(/[-_]+/g, " ");
    const pSlugHyphen = pSlug.replace(/[\s_]+/g, "-");
    const pTitle = (project.title || "").toLowerCase().trim();

    return (
      project.slug === rawSlug ||
      pSlug === decodedSlug ||
      pSlugHyphen === decodedSlug ||
      pSlugNoHyphen === slugNoHyphen ||
      pTitle === decodedSlug ||
      String(project.id) === decodedSlug
    );
  });

  if (index === -1) {
    notFound();
  }

  const project = projects[index];
  const next = projects[(index + 1) % projects.length] || projects[0];

  return <ProjectPage project={project} next={next} />;
}

