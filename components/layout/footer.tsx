import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black mt-20">
            <Container className="py-12 md:py-16">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="flex flex-col gap-4 lg:col-span-2">
                        <h2 className="text-2xl font-bold tracking-tight text-white">
                            Let's build something great.
                        </h2>
                        <p className="text-sm text-white/60 max-w-sm">
                            Software Developer focusing on React, modern web standards, and 3D experiences.
                        </p>
                        <div className="mt-2">
                            <Button asChild>
                                <a href="mailto:oguz27140@gmail.com">Get in Touch</a>
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-semibold tracking-wider text-white">Navigate</h3>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-sm text-white/60 hover:text-white transition-colors">About</Link>
                            </li>
                            <li>
                                <Link href="/projects" className="text-sm text-white/60 hover:text-white transition-colors">Projects</Link>
                            </li>
                            <li>
                                <Link href="/writing" className="text-sm text-white/60 hover:text-white transition-colors">Writing</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-semibold tracking-wider text-white">Socials</h3>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <a href="https://github.com/OguzhanGrey" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">GitHub</a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/oguzhan-ors/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">LinkedIn</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
                    <p className="text-xs text-white/40">
                        &copy; {new Date().getFullYear()} Oğuzhan ÖRS. All rights reserved.
                    </p>
                    <p className="text-xs text-white/40">
                        Built with Next.js, Tailwind, and Framer Motion.
                    </p>
                </div>
            </Container>
        </footer>
    );
}
