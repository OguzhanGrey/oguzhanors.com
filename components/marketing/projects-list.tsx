"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types/content";
import { ProjectCard } from "@/components/marketing/project-card";
import { cn } from "@/lib/utils";

const categories = ["All", "Full-Stack", "Embedded", "Frontend", "Upcoming"];

export function ProjectsList({ initialProjects }: { initialProjects: Project[] }) {
    const [activeTab, setActiveTab] = useState("All");

    const filteredProjects = initialProjects.filter((project) => {
        const isUpcoming = project.category === "Upcoming" || project.status === "Planned" || project.status === "In Progress";

        if (activeTab === "Upcoming") {
            return isUpcoming;
        }
        if (activeTab === "All") {
            return !isUpcoming;
        }
        return project.category === activeTab && !isUpcoming;
    });

    return (
        <div className="flex flex-col gap-12">
            <div className="flex flex-wrap items-center gap-2">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveTab(category)}
                        className={cn(
                            "relative px-4 py-2 text-sm font-medium transition-colors rounded-full",
                            activeTab === category
                                ? "text-black"
                                : "text-white/60 hover:text-white"
                        )}
                    >
                        {activeTab === category && (
                            <motion.div
                                layoutId="active-tab"
                                className="absolute inset-0 bg-white rounded-full -z-10"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">{category}</span>
                    </button>
                ))}
            </div>

            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.div
                            layout
                            key={project.slug}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </AnimatePresence>

                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="col-span-1 md:col-span-2 py-12 text-center text-white/40"
                    >
                        No projects found in this category.
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
