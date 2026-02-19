import { useParams, Link } from "react-router-dom";
import { projects, siteConfig } from "@/data/portfolio";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find(p => p.id === slug);

  if (!project) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to projects
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title={project.title}
        description={project.description}
        image={project.image}
        url={`${siteConfig.url}/projects/${project.id}`}
      />
      <article className="py-8">
        {/* Back link */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to projects
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags?.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">{project.description}</p>
        </header>

        {/* Hero Image */}
        {project.image && (
          <div className="rounded-3xl overflow-hidden mb-12 border border-border">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Project Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold mb-4">About this project</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {project.longDescription || project.description}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Links Card */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">
                Links
              </h3>
              <div className="space-y-3">
                {project.link && project.link !== "#" && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-muted rounded-xl hover:bg-primary/10 transition-colors group"
                  >
                    <ExternalLink className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">
                      View Live Site
                    </span>
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-muted rounded-xl hover:bg-primary/10 transition-colors group"
                  >
                    <Github className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">
                      Source Code
                    </span>
                  </a>
                )}
                {(!project.link || project.link === "#") && !project.github && (
                  <p className="text-sm text-muted-foreground">
                    Links coming soon
                  </p>
                )}
              </div>
            </div>

            {/* Technologies Card */}
            {project.tags && project.tags.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1.5 text-sm bg-muted rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-card border border-border rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Interested in working together?</h2>
          <p className="text-muted-foreground mb-6">Let's build something amazing</p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-medium hover:opacity-90 transition-all"
          >
            Get in touch
          </a>
        </div>
      </article>
    </Layout>
  );
};

export default ProjectDetailPage;
