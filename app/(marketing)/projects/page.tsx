import { getAllProjects } from "@/lib/mdx";
import { ProjectsList } from "@/components/marketing/projects-list";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";

export const metadata = {
    title: "Projects",
    description: "A showcase of full-stack, embedded, and frontend engineering projects.",
};

export default function ProjectsPage() {
    const projects = getAllProjects();

    return (
        <>
            <Navigation />

            <main className="flex-1 pt-32 pb-24 border-b border-white/10">
                <Container>
                    <div className="flex flex-col gap-4 max-w-2xl mb-16">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                            Engineering Work
                        </h1>
                        <p className="text-lg text-white/60">
                            A collection of projects spanning from high-frequency web dashboards to hard real-time flight controllers.
                        </p>
                    </div>

                    <ProjectsList initialProjects={projects} />
                </Container>
            </main>

            <Footer />
        </>
    );
}