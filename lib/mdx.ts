import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post, Project } from "@/types/content";

const contentDirectory = path.join(process.cwd(), "content");
const writingDirectory = path.join(contentDirectory, "writing");
const projectsDirectory = path.join(contentDirectory, "projects");

function getMDXFiles(dir: string) {
    try {
        return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
    } catch (error) {
        return [];
    }
}

function readMDXFile(filePath: string) {
    const rawContent = fs.readFileSync(filePath, "utf-8");
    return matter(rawContent);
}

// -----------------------------------------------------------------------------
// Posts
// -----------------------------------------------------------------------------

export function getPostBySlug(slug: string): Post | null {
    const realSlug = slug.replace(/\.mdx$/, "");
    const filePath = path.join(writingDirectory, `${realSlug}.mdx`);

    try {
        const { data, content } = readMDXFile(filePath);
        return {
            ...(data as Omit<Post, "slug" | "content">),
            slug: realSlug,
            content,
        };
    } catch (error) {
        return null;
    }
}

export function getAllPosts(): Post[] {
    const mdxFiles = getMDXFiles(writingDirectory);

    const posts = mdxFiles
        .map((file) => getPostBySlug(file))
        .filter((post): post is Post => post !== null && post.published !== false)
        .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

    return posts;
}

// -----------------------------------------------------------------------------
// Projects
// -----------------------------------------------------------------------------

export function getProjectBySlug(slug: string): Project | null {
    const realSlug = slug.replace(/\.mdx$/, "");
    const filePath = path.join(projectsDirectory, `${realSlug}.mdx`);

    try {
        const { data, content } = readMDXFile(filePath);
        return {
            ...(data as Omit<Project, "slug" | "content">),
            slug: realSlug,
            content,
        };
    } catch (error) {
        return null;
    }
}

export function getAllProjects(): Project[] {
    const mdxFiles = getMDXFiles(projectsDirectory);

    const projects = mdxFiles
        .map((file) => getProjectBySlug(file))
        .filter((project): project is Project => project !== null && project.published !== false)
        .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

    return projects;
}

export function getFeaturedProjects(): Project[] {
    return getAllProjects().filter((project) => project.featured);
}
