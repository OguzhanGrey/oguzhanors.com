import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const mdxComponents = {
    h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1
            className={cn("mt-2 scroll-m-20 text-4xl font-bold tracking-tight", className)}
            {...props}
        />
    ),
    h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2
            className={cn(
                "mt-10 mb-4 scroll-m-20 border-b border-white/10 pb-2 text-2xl font-semibold tracking-tight first:mt-0 text-white",
                className
            )}
            {...props}
        />
    ),
    h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3
            className={cn("mt-8 mb-4 scroll-m-20 text-xl font-semibold tracking-tight text-white", className)}
            {...props}
        />
    ),
    h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h4
            className={cn("mt-8 mb-4 scroll-m-20 text-lg font-semibold tracking-tight text-white", className)}
            {...props}
        />
    ),
    p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p
            className={cn("leading-relaxed text-white/80 mb-6 [&:not(:first-child)]:mt-6", className)}
            {...props}
        />
    ),
    ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className={cn("my-6 ml-6 list-disc text-white/80 [&>li]:mt-2 leading-relaxed", className)} {...props} />
    ),
    ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className={cn("my-6 ml-6 list-decimal text-white/80 [&>li]:mt-2 leading-relaxed", className)} {...props} />
    ),
    li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
        <li className={cn("mt-2 leading-relaxed", className)} {...props} />
    ),
    blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
        <blockquote
            className={cn("mt-6 border-l-2 border-white/20 pl-6 italic text-white/50 bg-white/[0.02] py-2 pr-4 rounded-r-lg", className)}
            {...props}
        />
    ),
    img: (props: any) => {
        return (
            <div className="relative w-full aspect-video my-8 overflow-hidden rounded-xl border border-white/5 bg-white/[0.02]">
                <Image
                    src={props.src || ""}
                    alt={props.alt || "Image"}
                    fill
                    className={cn("object-cover", props.className)}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                />
            </div>
        );
    },
    hr: ({ ...props }) => <hr className="my-8 border-white/10" {...props} />,
    a: ({ className, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
        const isInternal = href && (href.startsWith("/") || href.startsWith("#"));
        const classes = cn("font-medium text-white underline underline-offset-4 hover:text-white/80 transition-colors", className);

        if (isInternal) {
            return <Link href={href} className={classes} {...props} />;
        }

        return <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props} />;
    },
    code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <code
            className={cn("relative rounded bg-white/[0.05] px-[0.3rem] py-[0.2rem] font-mono text-sm text-white/90 font-medium", className)}
            {...props}
        />
    ),
    pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
        <pre
            className={cn("mb-6 mt-6 overflow-x-auto rounded-xl border border-white/5 bg-black p-6 text-sm shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]", className)}
            {...props}
        />
    ),
};
