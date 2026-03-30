import projectsData from "@/data/projects.json";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import SectionTitle from "@/components/ui/SectionTitle";

export default function ProjectsLab() {
  return (
    <section id="projects" className="py-24 border-t border-[var(--color-border)] relative z-10 bg-[var(--color-base)]">
      <div className="container-content space-y-12">
        <SectionTitle
          eyebrow="Experimentos"
          title="Proyectos y Construcciones"
          description="Una selección de desarrollos donde pongo en práctica mi curiosidad técnica y exploro nuevas arquitecturas."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.map((project) => (
            <Card key={project.id} className="flex flex-col h-full" hover={!project.comingSoon}>
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-xl font-medium tracking-tight text-[var(--color-fg)]">
                    {project.name}
                  </h3>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-fg-subtle)] hover:text-[var(--color-fg)] transition-colors p-1"
                      aria-label={`Ver código fuente de ${project.name}`}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76 0-1.5-.5-2.7-1.3-3.7.1-.3.6-1.7-.1-3.6 0 0-1.1-.3-3.6 1.6-1.5-.4-3-.6-4.5-.6s-3 .2-4.5.6c-2.5-1.9-3.6-1.6-3.6-1.6-.7 1.9-.2 3.3-.1 3.6-.8 1-1.3 2.2-1.3 3.7 0 5.2 3 6.4 6 6.76-.7.6-1 1.7-1 3.24v4" />
                        <path d="M9 18c-4.5 1.5-5-2.5-7-3" />
                      </svg>
                    </a>
                  )}
                </div>
                
                <p className="text-[var(--color-fg-muted)] text-sm leading-relaxed flex-1">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant={project.comingSoon ? "coming-soon" : "default"}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
