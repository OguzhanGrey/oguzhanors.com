import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Github, ExternalLink, Star } from "lucide-react";
import { Project } from "@/types/content";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ProjectCard({ project }: { project: Project }) {
    return (
        <Card className={cn(
            "group h-full flex flex-col overflow-hidden bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 border-white/5 hover:border-white/10 hover:-translate-y-1 hover:shadow-2xl",
            project.featured && "border-white/15 shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)] bg-white/[0.02]"
        )}>
            <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-10">
                <span className="sr-only">View Project {project.title}</span>
            </Link>

            <div className="flex flex-col h-full z-20 pointer-events-none">
                {project.image && (
                    <div className="w-full h-48 sm:h-56 relative overflow-hidden border-b border-white/5">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>
                )}

                <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                            <h3 className="text-2xl font-semibold text-white group-hover:text-white/90 transition-colors">
                                {project.title}
                            </h3>
                            {project.featured && (
                                <Badge variant="default" className="bg-white text-black px-1.5 py-0 h-5">
                                    <Star className="w-3 h-3 mr-1 fill-black" /> Featured
                                </Badge>
                            )}
                        </div>

                        <div className="flex items-center gap-2 pointer-events-auto">
                            {project.github && (
                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 text-white/40 hover:text-white transition-colors z-30" aria-label="GitHub Repository">
                                    <Github className="w-5 h-5" />
                                </a>
                            )}
                            {project.website && (
                                <a href={project.website} target="_blank" rel="noopener noreferrer" className="p-2 text-white/40 hover:text-white transition-colors z-30" aria-label="Live Website">
                                    <ExternalLink className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </div>

                    <p className="text-white/60 leading-relaxed mb-8 flex-grow">
                        {project.description}
                    </p>
                    <div className="flex flex-col gap-4 mt-auto">
                        {project.tags && (
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="bg-white/5 text-white/60 font-medium">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center justify-between text-sm text-white/40 pt-4 border-t border-white/5">
                            <time dateTime={project.date} className="font-mono">
                                {new Date(project.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                            </time>
                            <div className="flex items-center font-medium group-hover:text-white transition-colors">
                                Read Case Study <ArrowRight className="ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Card>
    );
}
