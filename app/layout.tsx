import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export const metadata: Metadata = {
    metadataBase: new URL('https://oguzhanors.com'),
    title: {
        default: 'Oğuzhan Örs | Software Developer',
        template: '%s | Oğuzhan Örs',
    },
    description: 'Portfolio of an interdisciplinary software engineer specializing in scalable full-stack web applications and robust embedded real-time systems.',
    openGraph: {
        title: 'Oğuzhan Örs | Software Developer',
        description: 'Portfolio of an interdisciplinary software engineer specializing in scalable full-stack web applications and robust embedded real-time systems.',
        url: 'https://oguzhanors.com',
        siteName: 'Oğuzhan Örs Portfolio',
        locale: 'en_US',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    twitter: {
        title: 'Oğuzhan Örs',
        card: 'summary_large_image',
    },
    icons: {
        icon: '/logo.svg?v=3',
        apple: '/logo.svg?v=3',
    },
    alternates: {
        canonical: '/',
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark" style={{ colorScheme: 'dark' }} suppressHydrationWarning>
            <body className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
                {children}
            </body>
        </html>
    );
}
