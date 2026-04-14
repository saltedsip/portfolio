import { ArrowRight, Mail, Phone, MapPin, Clock, Linkedin, Github, ExternalLink } from "lucide-react";
import { contactContent, contactMethods, personalInfo } from "@/data/portfolio";

// Icon mapping for contact methods
const iconMap: Record<string, React.ElementType> = {
  mail: Mail,
  phone: Phone,
  linkedin: Linkedin,
  github: Github,
};

const ContactSection = () => {
  return (
    <section id="contact">
      {/* Section Header - matching About style */}
      <div className="mb-12">
        <p className="text-sm text-primary font-medium uppercase tracking-wide mb-2">
          {contactContent.title || "Contact"}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Let's work together
        </h2>
        <p className="text-muted-foreground max-w-2xl">
          {contactContent.subtitle}
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Left: Main CTA Card */}
        <div className="bg-card border border-border rounded-3xl p-8 md:p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {contactContent.ctaTitle || "Ready to start a project?"}
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              I'm always excited to work on new projects and collaborate with passionate people.
              Whether you have a detailed project scope or just an initial idea, I'd love to hear from you.
            </p>

            {/* What I can help with */}
            <div className="space-y-4 mb-8">
              <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                What I can help with
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {["Web Applications", "SaaS Platforms", "Landing Pages", "API Development", "Webflow Sites", "WordPress Sites"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <a
            href={`mailto:${personalInfo.email}?subject=Project%20Inquiry`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-medium hover:opacity-90 transition-all hover:scale-105 text-lg"
          >
            Send me an email
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        {/* Right: Info Cards Stack */}
        <div className="space-y-4">
          {/* Availability Card */}
          <div className="bg-card border border-border rounded-2xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Currently available</p>
              <p className="text-sm text-muted-foreground">{contactContent.availability}</p>
            </div>
          </div>

          {/* Response Time Card */}
          <div className="bg-card border border-border rounded-2xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Quick response</p>
              <p className="text-sm text-muted-foreground">Usually reply within 24 hours</p>
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-card border border-border rounded-2xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{personalInfo.location}</p>
              <p className="text-sm text-muted-foreground">Flexible with timezones</p>
            </div>
          </div>

          {/* Contact Methods Grid */}
          <div className="grid grid-cols-2 gap-4">
            {contactMethods.map((method) => {
              const Icon = iconMap[method.icon] || Mail;
              const href = method.href === "gmail"
                ? `mailto:${method.value}?subject=Project%20Inquiry`
                : method.href;

              return (
                <a
                  key={method.id}
                  href={href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group bg-card border border-border rounded-2xl p-4 hover:border-primary/50 transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-xs uppercase tracking-wide text-muted-foreground">
                      {method.label}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                    {method.value}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
