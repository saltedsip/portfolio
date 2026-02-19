import { ArrowUpRight } from "lucide-react";
import { projects, projectsContent } from "@/data/portfolio";
import { memo } from "react";
import { Link } from "react-router-dom";
import { FadeIn } from "@/components/ui/FadeIn";

// Oska-style horizontal project card (full-width with image left, content right)
const ProjectCard = memo(({ project }: { project: typeof projects[0] }) => (
  <FadeIn direction="up" duration={600} className="w-full">
    <Link
      to={`/projects/${project.id}`}
      className="group block bg-card border border-border rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-[0.99]"
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
          {/* Header with title and arrow */}
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
  </FadeIn>
));

ProjectCard.displayName = "ProjectCard";

const ProjectsSection = () => {
  // Sort: featured first
  const sortedProjects = [...projects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  return (
    <section id="projects" className="py-20">
      {/* Section Header - Oska style */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
        <div>
          <p className="text-sm text-primary font-medium uppercase tracking-wide mb-2">Portfolio</p>
          <h2 className="text-3xl md:text-4xl font-bold">{projectsContent.title}</h2>
        </div>
        {projectsContent.subtitle && (
          <p className="text-muted-foreground max-w-md">{projectsContent.subtitle}</p>
        )}
      </div>

      {/* Oska-style stacked full-width cards */}
      <div className="space-y-6">
        {sortedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default memo(ProjectsSection);
