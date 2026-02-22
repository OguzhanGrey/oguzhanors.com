import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/mdx";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

export const metadata = {
    title: "Writing",
    description: "Thoughts on software architecture, embedded systems, and engineering.",
};

export default function WritingPage() {
    const posts = getAllPosts();

    return (
        <>
            <Navigation />

            <main className="flex-1 pt-32 pb-24 border-b border-white/10">
                <Container className="max-w-3xl">
                    <div className="flex flex-col gap-4 mb-20">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                            Writing
                        </h1>
                        <p className="text-lg text-white/60">
                            Thoughts on software architecture, embedded systems, and the intersection between high-level web tech and bare-metal programming.
                        </p>
                    </div>

                    <div className="flex flex-col gap-12 sm:gap-16">
                        {posts.map((post) => (
                            <article key={post.slug} className="group relative flex flex-col items-start justify-between">
                                <div className="flex items-center gap-4 text-sm text-white/40 mb-3">
                                    <time dateTime={post.date} className="font-mono">
                                        {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </time>
                                    {/* <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span>5 min read</span> */}
                                </div>

                                <div className="group relative">
                                    <h2 className="text-2xl font-semibold text-white/90 group-hover:text-white transition-colors mb-3">
                                        <Link href={`/writing/${post.slug}`}>
                                            <span className="absolute -inset-y-6 -inset-x-4 md:-inset-x-6 z-20 sm:rounded-2xl" />
                                            {post.title}
                                        </Link>
                                    </h2>
                                    <p className="text-white/60 leading-relaxed mb-6 max-w-2xl">
                                        {post.description}
                                    </p>
                                </div>

                                {post.tags && (
                                    <div className="flex flex-wrap items-center gap-2 z-10 relative">
                                        {post.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="bg-white/5 text-white/50 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                )}

                                <div className="hidden sm:flex items-center text-sm font-medium text-white/40 group-hover:text-white mt-6 transition-colors relative z-10">
                                    Read article <ArrowRight className="ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </article>
                        ))}

                        {posts.length === 0 && (
                            <div className="py-12 text-center text-white/40">
                                No articles published yet.
                            </div>
                        )}
                    </div>
                </Container>
            </main>

            <Footer />
        </>
    );
}