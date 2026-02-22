import { MetadataRoute } from 'next';
import { getAllProjects, getAllPosts } from '@/lib/mdx';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://oguzhanors.com';

    // Core static routes
    const routes = ['', '/projects', '/writing', '/embedded', '/about', '/contact'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic Project routes
    const projects = getAllProjects().map((project) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: project.date ? new Date(project.date) : new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.7,
    }));

    // Dynamic Writing routes
    const posts = getAllPosts()
        .filter(post => post.published !== false)
        .map((post) => ({
            url: `${baseUrl}/writing/${post.slug}`,
            lastModified: post.date ? new Date(post.date) : new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.6,
        }));

    return [...routes, ...projects, ...posts];
}