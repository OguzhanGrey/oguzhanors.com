import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <>
            <Navigation />
            <main className="flex-1 pt-32 pb-24 border-b border-white/10 flex flex-col items-center justify-center min-h-[70vh]">
                <Container className="text-center max-w-xl">
                    <h1 className="text-9xl font-extrabold tracking-tight text-white/5 mb-4">
                        404
                    </h1>
                    <h2 className="text-3xl font-bold tracking-tight text-white mb-6">
                        Page not found
                    </h2>
                    <p className="text-white/60 text-lg mb-10 leading-relaxed">
                        The requested page could not be found. It might have been moved, deleted, or perhaps it never existed in the first place.
                    </p>
                    <Button asChild size="lg">
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Return Home
                        </Link>
                    </Button>
                </Container>
            </main>
            <Footer />
        </>
    );
}
