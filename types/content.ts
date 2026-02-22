export interface BaseFrontmatter {
    title: string;
    description: string;
    date: string;
    published?: boolean;
}

export interface Post extends BaseFrontmatter {
    slug: string;
    content: string;
    tags?: string[];
}

export interface Project extends BaseFrontmatter {
    slug: string;
    content: string;
    category?: string;
    featured?: boolean;
    tags?: string[];
    github?: string;
    website?: string;
    image?: string;
    status?: string;
}
