import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, Calendar } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";

import { getProjectBySlug, getAllProjects } from "@/lib/mdx";
import { Container } from "@/components/ui/container";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { mdxComponents } from "@/components/ui/mdx-components";
import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
    const projects = getAllProjects();
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const project = getProjectBySlug(params.slug);
    if (!project) return { title: "Not Found" };

    return {
        title: project.title,
        description: project.description,
    };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
    const project = getProjectBySlug(params.slug);

    if (!project) {
        notFound();
    }

    return (
        <>
            <Navigation />

            <main className="flex-1 pt-32 pb-24 border-b border-white/10">
                <Container className="max-w-4xl">

                    <div className="mb-8">
                        <Link
                            href="/projects"
                            className="inline-flex items-center text-sm font-medium text-white/50 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Projects
                        </Link>
                    </div>

                    <header className="mb-16">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
                            {project.title}
                        </h1>

                        <p className="text-xl text-white/60 leading-relaxed mb-8">
                            {project.description}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-white/10">
                            <div className="flex flex-wrap items-center gap-2">
                                {project.category && (
                                    <Badge variant="default" className="bg-white text-black font-semibold">
                                        {project.category}
                                    </Badge>
                                )}
                                {project.tags?.map((tag) => (
                                    <Badge key={tag} variant="secondary">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex items-center gap-3">
                                {project.github && (
                                    <Button variant="outline" size="sm" asChild className="gap-2">
                                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                                            <Github className="w-4 h-4" /> Repository
                                        </a>
                                    </Button>
                                )}
                                {project.website && (
                                    <Button variant="default" size="sm" asChild className="gap-2">
                                        <a href={project.website} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="w-4 h-4" /> Live Demo
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-white/40 mt-6 font-mono">
                            <Calendar className="w-4 h-4" />
                            <time dateTime={project.date}>
                                {new Date(project.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </time>
                        </div>
                    </header>

                    <article className="prose prose-invert prose-lg max-w-none">
                        <MDXRemote source={project.content} components={mdxComponents} />
                    </article>

                </Container>
            </main>

            <Footer />
        </>
    );
}