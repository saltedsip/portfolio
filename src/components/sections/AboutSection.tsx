import { GraduationCap, Award as AwardIcon, Briefcase } from "lucide-react";
import { aboutContent, skills, workExperience, education, certifications, experienceTitle, educationTitle } from "@/data/portfolio";

const AboutSection = () => (
  <section id="about">
    {/* Section Header - Oska style */}
    <div className="mb-12">
      <p className="text-sm text-primary font-medium uppercase tracking-wide mb-2">About</p>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{aboutContent.title}</h2>
      <div className="max-w-3xl">
        {aboutContent.paragraphs.map((paragraph, i) => (
          <p key={i} className="text-muted-foreground leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </div>

    {/* Skills Grid - Oska card style */}
    {Object.keys(skills).length > 0 && (
      <div className="mb-16">
        <h3 className="text-xl font-semibold mb-6">Technical Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, skillList]) => (
            <div key={category} className="bg-card border border-border rounded-2xl p-6">
              <h4 className="text-sm text-primary font-medium uppercase tracking-wide mb-4">{category}</h4>
              <div className="flex flex-wrap gap-2">
                {skillList.map((skill) => (
                  <span 
                    key={skill} 
                    className="px-3 py-1.5 text-sm bg-muted rounded-full text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Experience - Timeline style */}
    {workExperience.length > 0 && (
      <div className="mb-16">
        <h3 className="text-xl font-semibold mb-6">{experienceTitle}</h3>
        <div className="space-y-4">
          {workExperience.map((exp) => (
            <div 
              key={exp.id}
              className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-primary/10 rounded-xl">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h4 className="font-semibold">{exp.title}</h4>
                    {exp.isActive && (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Current</span>
                    )}
                  </div>
                  <p className="text-sm text-primary mb-2">{exp.company} · {exp.period}</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>• {h}</li>
                    ))}
                  </ul>
                  {exp.tags && exp.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {exp.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Education & Certifications */}
    {(education.degree || certifications.length > 0) && (
      <div>
        <h3 className="text-xl font-semibold mb-6">{educationTitle}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {education.degree && (
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors">
              <GraduationCap className="w-8 h-8 text-primary mb-4" />
              <h4 className="font-semibold mb-1">{education.degree}</h4>
              <p className="text-sm text-primary">{education.institution}</p>
            </div>
          )}
          {certifications.map((cert, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors">
              <AwardIcon className="w-8 h-8 text-primary mb-4" />
              <h4 className="font-semibold mb-1">{cert.title}</h4>
              <p className="text-sm text-primary">{cert.issuer} · {cert.year}</p>
            </div>
          ))}
        </div>
      </div>
    )}
  </section>
);

export default AboutSection;
