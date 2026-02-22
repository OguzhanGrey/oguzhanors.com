"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Writing", href: "/writing" },
];

export function Navigation() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [hoveredPath, setHoveredPath] = React.useState<string | null>(null);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
                isScrolled
                    ? "border-b border-white/5 bg-black/50 backdrop-blur-xl py-4"
                    : "bg-transparent py-6"
            )}
        >
            <Container>
                <nav className="flex items-center justify-between">
                    <Link
                        href="/"
                        className="text-lg font-bold tracking-tighter text-white transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-sm"
                    >
                        Oğuzhan ÖRS
                    </Link>

                    <ul
                        className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar sm:overflow-visible -ml-2 pl-2"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        onMouseLeave={() => setHoveredPath(null)}
                    >
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const isHovered = hoveredPath === item.href;

                            return (
                                <li key={item.href} className="relative">
                                    <Link
                                        href={item.href}
                                        onMouseEnter={() => setHoveredPath(item.href)}
                                        className={cn(
                                            "relative px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-full whitespace-nowrap group block",
                                            isActive ? "text-white" : "text-white/60 hover:text-white"
                                        )}
                                        style={{ WebkitTapHighlightColor: "transparent" }}
                                    >
                                        <span className="relative z-10 transition-transform duration-200 group-active:scale-95 inline-block">
                                            {item.name}
                                        </span>

                                        {isHovered && !isActive && (
                                            <motion.div
                                                layoutId="nav-hover-bg"
                                                className="absolute inset-0 z-0 rounded-full bg-white/5"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 400,
                                                    damping: 30,
                                                }}
                                            />
                                        )}

                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-active-bg"
                                                className="absolute inset-0 z-0 rounded-full border border-white/10 bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                                                initial={false}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 400,
                                                    damping: 30,
                                                }}
                                            />
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </Container>
        </header >
    );
}
