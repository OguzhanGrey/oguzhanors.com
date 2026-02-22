import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";

import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { Container } from "@/components/ui/container";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { mdxComponents } from "@/components/ui/mdx-components";

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug);
    if (!post) return { title: "Not Found" };

    return {
        title: post.title,
        description: post.description,
    };
}

export default function PostDetailPage({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <>
            <Navigation />

            <main className="flex-1 pt-32 pb-24 border-b border-white/10">
                <Container className="max-w-3xl">

                    <div className="mb-10">
                        <Link
                            href="/writing"
                            className="inline-flex items-center text-sm font-medium text-white/50 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Writing
                        </Link>
                    </div>

                    <header className="mb-16">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <p className="text-xl text-white/60 leading-relaxed mb-8">
                            {post.description}
                        </p>

                        <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-white/10">
                            <div className="flex items-center gap-2 text-sm text-white/40 font-mono">
                                <Calendar className="w-4 h-4" />
                                <time dateTime={post.date}>
                                    {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </time>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                {post.tags?.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="bg-white/5 text-white/60 text-[10px] uppercase tracking-wider font-semibold py-0.5">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </header>

                    <article className="prose prose-invert prose-lg max-w-none">
                        <MDXRemote source={post.content} components={mdxComponents} />
                    </article>

                </Container>
            </main>

            <Footer />
        </>
    );
}