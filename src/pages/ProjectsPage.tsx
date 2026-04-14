import { ArrowUpRight } from "lucide-react";
import { projects, projectsContent } from "@/data/portfolio";
import { memo } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { siteConfig } from "@/data/portfolio";

// Oska-style horizontal project card
const ProjectCard = memo(({ project }: { project: typeof projects[0] }) => (
  <Link
    to={`/projects/${project.id}`}
    className="group block bg-card border border-border rounded-3xl overflow-hidden hover:border-primary/50 transition-all"
  >
    <div className="flex flex-col md:flex-row">
      {/* Left: Project Image */}
      <div className="md:w-1/2 aspect-[4/3] md:aspect-auto overflow-hidden bg-muted">
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        )}
      </div>

      {/* Right: Content */}
      <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                {project.title}
              </h3>
              {project.featured && (
                <span className="text-xs text-primary font-medium">Featured Project</span>
              )}
            </div>
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-border rounded-full group-hover:bg-primary group-hover:border-primary transition-all">
              <ArrowUpRight className="w-4 h-4 text-foreground group-hover:text-white transition-colors" />
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 bg-muted text-muted-foreground rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </Link>
));

ProjectCard.displayName = "ProjectCard";

const ProjectsPage = () => {
  // Sort: featured first
  const sortedProjects = [...projects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  return (
    <Layout>
      <>
        <SEO
          title="Projects"
          description={`Explore projects by ${siteConfig.title.split(" - ")[0]}. From SaaS platforms to custom web applications.`}
          url={`${siteConfig.url}/projects`}
        />
        {/* Page Header */}
        <div className="mb-12">
          <p className="text-sm text-primary font-medium uppercase tracking-wide mb-2">Portfolio</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{projectsContent.title}</h1>
          {projectsContent.subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl">{projectsContent.subtitle}</p>
          )}
        </div>

        {/* Projects Grid */}
        <div className="space-y-6">
          {sortedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </>
    </Layout>
  );
};

export default memo(ProjectsPage);
