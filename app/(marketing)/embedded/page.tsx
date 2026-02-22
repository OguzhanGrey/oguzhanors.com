import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
    title: "Embedded Systems",
    description: "Specialized engineering in RTOS, microcontrollers, and hardware-software interfaces.",
};

const systems = [
    {
        icon: "🚁",
        title: "Flight Controllers",
        description: "Custom firmware for flight stabilization, AHRS sensor fusion (Kalman/Mahony), and high-frequency PID loops running on ARM Cortex-M processors."
    },
    {
        icon: "📡",
        title: "Telemetry & RF",
        description: "Long-range LoRa (915MHz/868MHz) packet routing, binary data packing, and ground station ingestion pipelines for high-altitude tracking."
    },
    {
        icon: "🧠",
        title: "Edge Compute",
        description: "Optimizing heavy inference models or DSP algorithms to run natively on constrained embedded environments where memory and power are scarce."
    }
];

const toolchain = [
    { category: "Languages", items: ["C99", "C++20", "Embedded Rust", "Assembly (ARM)"] },
    { category: "Architectures", items: ["ARM Cortex-M (STM32)", "ESP32", "AVR", "RISC-V"] },
    { category: "RTOS", items: ["FreeRTOS", "Zephyr", "Mbed OS", "Bare-metal"] },
    { category: "Protocols", items: ["SPI", "I2C", "UART/USART", "CAN Bus", "DMA"] },
    { category: "Tooling", items: ["OpenOCD", "GDB", "Saleae Logic", "CMake", "Make"] }
];

const timeline = [
    {
        year: "2025",
        title: "Custom Flight Stack V2",
        description: "Rewrote core estimator loop in Embedded Rust. Achieved 0% deadline misses at 2kHz loop frequency."
    },
    {
        year: "2024",
        title: "High-Altitude Weather Tracking",
        description: "Designed hardware and software tracker for a balloon that reached 108,000 ft. Recovered intact via LoRa coordinates."
    },
    {
        year: "2023",
        title: "Industrial Sensor Node",
        description: "Built ultra-low power MQTT-SN sensor nodes running on battery for 2+ years utilizing deep sleep and highly optimized FreeRTOS tasks."
    },
    {
        year: "2021",
        title: "First Microcontroller Project",
        description: "Wrote bare-metal register-level drivers for an ATmega328P to control an automated greenhouse monitoring system."
    }
];

export default function EmbeddedPage() {
    return (
        <>
            <Navigation />

            <main className="flex-1 pt-32 pb-24 border-b border-white/10">
                <Container className="max-w-4xl">

                    <div className="mb-20">
                        <Badge variant="secondary" className="mb-6">Hardware & Low-Level</Badge>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 balanced-wrap">
                            Embedded Engineering
                        </h1>
                        <p className="text-xl text-white/60 leading-relaxed max-w-2xl">
                            There is no garbage collector to save you here. From bare-metal register manipulation to hard real-time scheduling, I build systems where every clock cycle and byte of RAM matters.
                        </p>
                    </div>

                    {/* Systems I Build */}
                    <section className="mb-24">
                        <h2 className="text-2xl font-bold tracking-tight text-white mb-8 border-b border-white/10 pb-4">
                            Systems I Build
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {systems.map((sys, idx) => (
                                <Card key={idx} className="bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors p-6">
                                    <div className="text-3xl mb-4">{sys.icon}</div>
                                    <h3 className="text-lg font-semibold text-white mb-3">{sys.title}</h3>
                                    <p className="text-sm text-white/60 leading-relaxed">
                                        {sys.description}
                                    </p>
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* Toolchain */}
                    <section className="mb-24">
                        <h2 className="text-2xl font-bold tracking-tight text-white mb-8 border-b border-white/10 pb-4">
                            The Toolchain
                        </h2>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-6">
                            {toolchain.map((group, idx) => (
                                <div key={idx}>
                                    <h3 className="text-sm font-semibold uppercase tracking-widest text-white/40 mb-4">
                                        {group.category}
                                    </h3>
                                    <ul className="flex flex-col gap-2.5">
                                        {group.items.map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-white/80">
                                                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Safety & Reliability */}
                    <section className="mb-24 relative p-8 md:p-12 rounded-2xl border border-white/10 bg-black overflow-hidden">
                        <div className="absolute inset-0 bg-[#0a0a0a] z-0" />
                        <div className="absolute top-0 right-0 p-32 opacity-20 pointer-events-none z-0">
                            {/* Decorative background grid for technical feel */}
                            <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                                <defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.5" /></pattern></defs>
                                <rect width="100%" height="100%" fill="url(#grid)" />
                            </svg>
                        </div>

                        <div className="relative z-10 max-w-2xl">
                            <h2 className="text-3xl font-bold tracking-tight text-white mb-6">
                                Safety & Reliability First
                            </h2>
                            <div className="space-y-6 text-white/70 leading-relaxed">
                                <p>
                                    In embedded systems—especially when controlling physical hardware like motors or high-voltage circuits—failure is not an option. A web server can restart seamlessly; a drone experiencing a watchdog reset falls out of the sky.
                                </p>
                                <p>
                                    My engineering philosophy for embedded is heavily defensive:
                                </p>
                                <ul className="list-disc pl-5 space-y-2 mt-4 text-white/80">
                                    <li>Strict event-driven Finite State Machines (FSM) to mathematically prove system transitions.</li>
                                    <li>Extensive use of Direct Memory Access (DMA) to free CPU cycles for estimation algorithms.</li>
                                    <li>Zero dynamic memory allocation (`malloc`/`new`) after the initialization phase to prevent fragmentation and hard faults.</li>
                                    <li>Hardware watchdog timers and robust failsafe fallback modes.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Timeline */}
                    <section>
                        <h2 className="text-2xl font-bold tracking-tight text-white mb-10 border-b border-white/10 pb-4">
                            Hardware Journey
                        </h2>
                        <div className="relative border-l border-white/10 ml-3 md:ml-4 space-y-12 pb-8">
                            {timeline.map((event, idx) => (
                                <div key={idx} className="relative pl-8 md:pl-12 group">
                                    <div className="absolute w-3 h-3 bg-black border-2 border-white/30 rounded-full -left-[6.5px] top-1.5 group-hover:border-white transition-colors" />
                                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-3">
                                        <span className="text-sm font-mono text-white/40">{event.year}</span>
                                        <h3 className="text-xl font-semibold text-white/90 group-hover:text-white transition-colors">
                                            {event.title}
                                        </h3>
                                    </div>
                                    <p className="text-white/60 leading-relaxed max-w-2xl">
                                        {event.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                </Container>
            </main>

            <Footer />
        </>
    );
}
