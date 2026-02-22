import Link from "next/link";
import { ArrowRight, Github, Linkedin, Cpu, Code2, Layers, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { getAllProjects, getAllPosts } from "@/lib/mdx";
import dynamic from "next/dynamic";
import { SpotlightCard } from "@/components/ui/spotlight-card";

// Dynamically import the Heavy WebGL canvas
const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
    ssr: false,
    loading: () => (
        <div
            className="absolute inset-0 bg-[#0a0a0a]"
            style={{
                backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.05) 1px, transparent 1px)",
                backgroundSize: "24px 24px"
            }}
        />
    )
});

const signatureHighlights = [
    {
        title: "Full-Stack Systems",
        description: "Building scalable web architectures, resilient APIs, and highly interactive frontends with modern tools like Next.js and React Ecosystem.",
        icon: Code2,
    },
    {
        title: "Embedded / Avionics",
        description: "Developing mission-critical flight software, deeply embedded RTOS systems, and hardware-software interfaces for precise control.",
        icon: Cpu,
    },
    {
        title: "Product Mindset",
        description: "Bridging the gap between deeply technical implementations and user-centric product requirements to deliver actual value.",
        icon: Layers,
    },
];

export default function Home() {
    const upcomingProjects = getAllProjects().filter((p) => p.category === "Upcoming" || p.status === "Planned" || p.status === "In Progress").slice(0, 3);
    const recentWriting = getAllPosts().slice(0, 3);
    return (
        <>
            <Navigation />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden min-h-[90vh] flex items-center">
                    {/* Full-width, unboxed 3D Background */}
                    <div className="absolute inset-0 z-0 bg-[#030303]">
                        <HeroScene />
                    </div>
                    {/* Left side gradient overlay to ensure perfect text readability */}
                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent pointer-events-none" />
                    {/* Top and bottom soft fades */}
                    <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/50 via-transparent to-black pointer-events-none" />

                    <Container className="relative z-10">
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                            <div className="flex flex-col gap-6 max-w-2xl pointer-events-auto">
                                <Badge variant="secondary" className="w-fit bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md">Available for new opportunities</Badge>

                                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] drop-shadow-2xl">
                                    Full-Stack & Embedded Engineer — <span className="text-white/50">from web to flight computer.</span>
                                </h1>

                                <p className="text-lg text-white/70 max-w-xl backdrop-blur-sm">
                                    I specialize in bridging the gap between high-level web interfaces and low-level hardware control. Whether it's a completely bespoke UI architecture or mission-critical flight software, I build systems that are robust and scalable.
                                </p>

                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-6 w-full sm:w-auto">
                                    <Button asChild size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-white/90">
                                        <Link href="/projects">
                                            View Projects <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md">
                                        <Link href="mailto:oguz27140@gmail.com">Contact Me</Link>
                                    </Button>
                                </div>

                                <div className="flex items-center gap-5 mt-6">
                                    <a href="https://github.com/OguzhanGrey" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-transform hover:scale-110" aria-label="GitHub">
                                        <Github className="h-6 w-6" />
                                    </a>
                                    <a href="https://www.linkedin.com/in/oguzhan-ors/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-transform hover:scale-110" aria-label="LinkedIn">
                                        <Linkedin className="h-6 w-6" />
                                    </a>
                                </div>
                            </div>

                            {/* Empty right column: Allows the 3D scene to show completely unboxed while text is constrained */}
                            <div className="hidden lg:block h-full w-full pointer-events-none" />
                        </div>
                    </Container>
                </section>

                {/* Signature Highlights */}
                <section className="py-20 bg-white/[0.02] border-y border-white/5">
                    <Container>
                        <div className="grid md:grid-cols-3 gap-6">
                            {signatureHighlights.map((highlight, i) => (
                                <SpotlightCard key={i} className="h-full">
                                    <div className="p-6 md:p-8">
                                        <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                                            <highlight.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-white mb-3">{highlight.title}</h3>
                                        <p className="text-white/60 leading-relaxed">
                                            {highlight.description}
                                        </p>
                                    </div>
                                </SpotlightCard>
                            ))}
                        </div>
                    </Container>
                </section>

                {/* Featured Projects */}
                <section className="py-24">
                    <Container>
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-3xl font-bold tracking-tight text-white">Upcoming Engineering Pipeline</h2>
                            <Button variant="ghost" asChild>
                                <Link href="/projects">
                                    View all projects <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>

                        <div className="grid gap-6">
                            {upcomingProjects.map((project, i) => (
                                <Link key={i} href={`/projects/${project.slug}`} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl">
                                    <Card className="flex flex-col md:flex-row gap-6 p-6 sm:p-8 bg-transparent hover:bg-white/[0.03] transition-colors border-white/10">
                                        <div className="md:w-1/3 aspect-video rounded-lg bg-white/5 border border-white/10 overflow-hidden relative flex items-center justify-center">
                                            {(project as any).image ? (
                                                <img src={(project as any).image} alt={project.title} className="w-full h-full object-cover rounded-lg" />
                                            ) : (
                                                <span className="text-white/20 font-mono text-sm group-hover:text-white/40 transition-colors">Project Cover</span>
                                            )}
                                        </div>
                                        <div className="flex flex-col justify-center flex-1">
                                            <h3 className="text-2xl font-semibold mb-2 group-hover:text-white transition-colors">{project.title}</h3>
                                            <p className="text-white/60 mb-6 leading-relaxed max-w-2xl">{project.description}</p>
                                            <div className="flex flex-wrap gap-2 mt-auto">
                                                {(project.tags || []).map((tag, j) => (
                                                    <Badge key={j} variant="secondary">{tag}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </Container>
                </section>

                {/* Embedded Snapshot */}
                <section className="py-24 bg-black relative border-t border-white/5">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none" />
                    <Container className="relative">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight text-white mb-6">Embedded systems <br /> at a glance</h2>
                                <p className="text-lg text-white/60 mb-8 max-w-md leading-relaxed">
                                    Beyond web applications, I have deep experience in hardware programming and real-time systems architecture.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "C / C++ & Embedded Rust development",
                                        "RTOS (FreeRTOS, Zephyr) task scheduling",
                                        "Hardware interfacing: SPI, I2C, UART, CAN bus",
                                        "Sensor fusion algorithms (Kalman, Mahony)",
                                        "Flight computer architectures"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-white/80">
                                            <div className="h-2 w-2 rounded-full bg-white/40" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Terminal mock UI */}
                            <div className="rounded-lg border border-white/10 bg-[#0c0c0c] overflow-hidden shadow-2xl">
                                <div className="flex items-center px-4 py-3 border-b border-white/5 bg-[#141414]">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                    </div>
                                    <div className="mx-auto text-xs text-white/40 font-mono">uart0 /dev/ttyUSB0</div>
                                </div>
                                <div className="p-6 font-mono text-xs sm:text-sm text-green-400/90 overflow-x-auto space-y-2">
                                    <p className="text-white/50">$ make flash PROG=openocd TARGET=stm32f4</p>
                                    <p>Building targeted binary for ARM Cortex-M4F...</p>
                                    <p>[ 10%] Compiling src/hal/spi.c</p>
                                    <p>[ 25%] Compiling src/sensors/mpu6000.c</p>
                                    <p>[ 50%] Compiling src/flight/pid.c</p>
                                    <p>[ 80%] Linking object files...</p>
                                    <p>[100%] Built target firmware.elf</p>
                                    <p className="text-blue-400">Flashing via SWD interface...</p>
                                    <p>Programming flash: 64.2 KB written</p>
                                    <p className="text-yellow-400">Verifying... OK</p>
                                    <p className="text-white/80">System starting... Bootloader jumped to payload.</p>
                                    <p className="text-white/80 animate-pulse">_</p>
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>

                {/* Writing Preview */}
                <section className="py-24 border-t border-white/10">
                    <Container>
                        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
                            <div className="md:w-1/3">
                                <h2 className="text-3xl font-bold tracking-tight text-white mb-6">Recent Writing</h2>
                                <p className="text-white/60 leading-relaxed mb-6">
                                    Thoughts on software architecture, embedded systems, and the intersection between high-level web tech and bare-metal programming.
                                </p>
                                <Button variant="outline" asChild>
                                    <Link href="/writing">Read all articles</Link>
                                </Button>
                            </div>

                            <div className="md:w-2/3 flex flex-col gap-10">
                                {recentWriting.map((post, i) => (
                                    <Link key={i} href={`/writing/${post.slug}`} className="group flex flex-col gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md">
                                        <time className="text-sm font-mono text-white/40 group-hover:text-white/60 transition-colors uppercase tracking-wider">
                                            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </time>
                                        <h3 className="text-xl md:text-2xl font-semibold text-white/90 group-hover:text-white transition-colors">{post.title}</h3>
                                        <p className="text-white/60 leading-relaxed">{post.description}</p>
                                        <div className="flex items-center text-sm font-medium text-white/40 group-hover:text-white mt-1 transition-colors">
                                            Read article <ArrowRight className="ml-1 h-3 w-3" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </Container>
                </section>
            </main>

            <Footer />
        </>
    );
}
