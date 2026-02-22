import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";

export const metadata = {
    title: "About",
    description: "Computer engineer focusing on scalable web architectures and reliable embedded avionics systems.",
};

export default function AboutPage() {
    return (
        <>
            <Navigation />

            <main className="flex-1 pt-32 pb-24 border-b border-white/10">
                <Container className="max-w-3xl">
                    <section className="mb-16">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
                            Engineering from the DB to Bare Metal
                        </h1>
                        <div className="text-lg text-white/70 space-y-4 leading-relaxed">
                            <p>
                                I am a Computer Engineering student at Adnan Menderes University, bridging the gap between academic theory and high-stakes production environments.
                                My work spans building distributed Node.js backends to writing deterministic flight state machines for high-power rockets.
                            </p>
                            <p>
                                I prefer pragmatic, reliable solutions over following the latest hype cycle. Code should solve problems, not create them.
                            </p>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-2xl font-semibold text-white/90 mb-6">Core Focus</h2>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-medium text-white mb-2">Systems & Architecture</h3>
                                <p className="text-white/60 leading-relaxed">
                                    I design end-to-end systems. Whether I am architecting a React/Next.js frontend to securely consume a REST API, or structuring a distributed telemetry pipeline, the goal is always clear boundaries, encapsulation, and maintainability.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-white mb-2">Full-Stack Development</h3>
                                <p className="text-white/60 leading-relaxed">
                                    Extensive experience with the modern web stack (React, Node.js, Redux). I focus on reducing client-side complexity, managing state efficiently, and building APIs that are actually usable.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-white mb-2">Embedded & Avionics</h3>
                                <p className="text-white/60 leading-relaxed">
                                    Operating primarily on STM32 (Nucleo-H7) microcontrollers. I write C/C++ flight computers prioritizing absolute determinism. This includes barometric sensor integration, fault-tolerant recovery logic, and handling raw UART/RF communication under noisy conditions.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-2xl font-semibold text-white/90 mb-6">Engineering Philosophy</h2>
                        <ul className="space-y-4 text-white/60 leading-relaxed list-disc list-inside">
                            <li><strong className="text-white/80 font-medium">Reliability over Features:</strong> A system that occasionally fails gracefully is better than one that silently corrupts state.</li>
                            <li><strong className="text-white/80 font-medium">Deterministic Behavior:</strong> Especially in aerospace, knowing precisely what state the hardware is in at all times is non-negotiable.</li>
                            <li><strong className="text-white/80 font-medium">Clear Constraints:</strong> Understanding hardware limits (memory, timing, bandwidth) informs better software architecture from day one.</li>
                            <li><strong className="text-white/80 font-medium">Trade-offs Rule Everything:</strong> There are no universal best practices, only decisions made against specific constraints.</li>
                        </ul>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-2xl font-semibold text-white/90 mb-6">Current Work</h2>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
                            <p className="text-white/70 leading-relaxed mb-4">
                                Currently, I am the Software Lead orchestrating the avionics architecture for an upcoming high-power rocket project, aggressively preparing for <strong className="text-white/90">IREC 2026</strong>.
                            </p>
                            <p className="text-white/70 leading-relaxed">
                                My day-to-day involves fine-tuning embedded reliability, stress-testing telemetry pipelines across LoRa RF modules, and ensuring our Python ground station can parse binary streams without dropping a single byte under competition constraints.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white/90 mb-4">Let&apos;s Build Something Real</h2>
                        <p className="text-white/60 leading-relaxed mb-6">
                            If you are working on hard engineering problems—whether it requires scaling a web backend or ensuring a microcontroller doesn&apos;t lock up mid-flight—I am always interested in discussing technical challenges.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-black bg-white rounded-full hover:bg-white/90 transition-colors"
                        >
                            Get in touch
                        </a>
                    </section>
                </Container>
            </main>

            <Footer />
        </>
    );
}