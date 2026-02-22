# Personal Engineering Portfolio

A production-grade, highly optimized personal portfolio and technical blog built for interdisciplinary software engineers. Designed to showcase deep technical expertise across full-stack web applications and embedded systems.

## 🛠 Tech Stack

*   **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server Components)
*   **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict mode)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Custom UI, HSL color system)
*   **Content:** [MDX](https://mdxjs.com/) via `next-mdx-remote` & `gray-matter`
*   **Animations:** [Framer Motion](https://www.framer.com/motion/) (Layout transitions, Presence)
*   **WebGL / 3D:** [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) & [Three.js](https://threejs.org/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Fonts:** `next/font` (Inter)

## 🚀 Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/oguzhanors/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Copy the example file and configure your environment.
    ```bash
    cp .env.example .env.local
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Navigate to `http://localhost:3000` to view the application.

## ⚙️ Environment Variables

The application expects the following variables in `.env.local` (or your deployment environment):

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | The absolute URL of your deployment for SEO & Sitemaps. | `https://oguzhanors.com` |
| `NODE_ENV` | Application environment state. | `development` / `production` |

*(Note: API Keys for specific contact form providers like Resend or SendGrid should be added here when integrating the production email pipeline).*

## 📝 Content Management (MDX)

All dynamic content is handled locally via MDX files. This ensures your technical writing is version-controlled alongside your code.

### Adding a Project

Create a new file in `content/projects/{slug}.mdx`.

```markdown
---
title: "Project Title"
description: "A short, punchy summary of the project."
date: "2024-01-15"
category: "Embedded"
featured: true
tags: ["C++", "RTOS", "STM32"]
github: "https://github.com/..."
website: "https://..."
---

## Overview
Your technical case study goes here...
```

### Adding a Post

Create a new file in `content/writing/{slug}.mdx`.

```markdown
---
title: "Article Title"
description: "A brief description for the article list."
date: "2024-02-10"
published: true
tags: ["Architecture", "System Design"]
---

Your technical writing, code blocks, and diagrams go here...
```

If `published: false` is set, the post will be hidden from production builds and sitemaps.

## 🚀 Deployment (Vercel)

This project is optimized for Vercel.

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Vercel will automatically detect the Next.js framework.
4. Add your Environment Variables (`NEXT_PUBLIC_SITE_URL`) in the Vercel dashboard.
5. Deploy.

The build process will automatically generate static HTML for all MDX routes (via `generateStaticParams`), ensuring instantaneous load times. Note that the in-memory rate limiter for the `/api/contact` route resets across serverless environments.

## ⚡ Performance Notes

*   **Server Components Default:** The vast majority of the UI (layouts, MDX parsing, file system reading) operates as Server Components, resulting in zero JavaScript shipped to the client for those layers.
*   **Typography Scaling:** The `@tailwindcss/typography` plugin is strictly constrained using `max-w-3xl` or `prose-lg` containers to guarantee an optimal 65-80 characters per line reading experience.
*   **Route Pre-fetching:** Next.js handles route pre-fetching automatically on hover, ensuring navigating between case studies feels instantaneous.

## 🧊 React Three Fiber Fallback Strategy

To maintain absolute performance parity across devices, the WebGL 3D Hero scene employs a strict degradation strategy:

1.  **Mobile Disablement:** If the viewport width is `< 768px`, the heavy WebGL context (`<Canvas>`) is completely circumvented. A lightweight CSS `radial-gradient` grid is rendered instead. This saves massive battery drain and layout shift on budget mobile devices.
2.  **Accessibility (a11y):** The rotating `<Icosahedron>` respects the user's OS-level preferences. If `prefers-reduced-motion: reduce` is detected via `window.matchMedia`, the `@react-three/drei` `<Float>` utility halts all rotations.
3.  **DPR Capping:** To prevent high-density displays (like 5K Macs) from attempting to render the canvas at 3x resolution and destroying the framerate, `dpr={[1, 2]}` is explicitly set on the Canvas.
