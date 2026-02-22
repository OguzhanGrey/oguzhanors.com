"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ContactPage() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        const form = e.currentTarget;
        const formData = new FormData(form);

        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
            _honeypot: formData.get("_honeypot"),
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Failed to send message");
            }

            setStatus("success");
            form.reset();
        } catch (error: unknown) {
            console.error(error);
            setStatus("error");
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
        }
    }

    return (
        <>
            <Navigation />

            <main className="flex-1 pt-32 pb-24 border-b border-white/10">
                <Container className="max-w-4xl">

                    <div className="grid md:grid-cols-12 gap-12 md:gap-20">
                        {/* Context Left Column */}
                        <div className="md:col-span-5 flex flex-col gap-6">
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
                                Get in touch
                            </h1>
                            <p className="text-lg text-white/60 leading-relaxed">
                                I'm currently open to new opportunities matching my skill set. Whether you have a question about a project, want to discuss systems architecture, or have an interesting role to pitch—my inbox is open.
                            </p>

                            <div className="hidden md:block mt-8 p-6 rounded-xl border border-white/5 bg-white/[0.02]">
                                <h3 className="font-semibold text-white mb-2">Based in</h3>
                                <p className="text-white/60">Istanbul, Turkey</p>
                                <div className="h-px bg-white/10 my-4" />
                                <h3 className="font-semibold text-white mb-2">Working Hours</h3>
                                <p className="text-white/60">Mon-Fri, GMT+3</p>
                            </div>
                        </div>

                        {/* Form Right Column */}
                        <div className="md:col-span-7">
                            <Card className="p-8 md:p-10 border-white/10 bg-black shadow-2xl">

                                {status === "success" ? (
                                    <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in zoom-in duration-500">
                                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                                            <CheckCircle2 className="w-8 h-8 text-green-500" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Message Received</h3>
                                        <p className="text-white/60 mb-8 max-w-sm">
                                            Thanks for reaching out! I've received your message and will get back to you as soon as possible.
                                        </p>
                                        <Button variant="outline" onClick={() => setStatus("idle")}>
                                            Send another message
                                        </Button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 animate-in fade-in duration-500">

                                        {/* Security Honeypot - hidden from screen readers and visual flow */}
                                        <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
                                            <label htmlFor="_honeypot">Please ignore this field</label>
                                            <input type="text" name="_honeypot" id="_honeypot" tabIndex={-1} autoComplete="off" />
                                        </div>

                                        {status === "error" && (
                                            <div className="flex items-start gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                                <p>{errorMessage}</p>
                                            </div>
                                        )}

                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <div className="space-y-2.5">
                                                <label htmlFor="name" className="text-sm font-medium text-white/80">
                                                    Name <span className="text-white/40">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    required
                                                    disabled={status === "loading"}
                                                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all disabled:opacity-50"
                                                    placeholder="Oğuzhan ÖRS"
                                                />
                                            </div>
                                            <div className="space-y-2.5">
                                                <label htmlFor="email" className="text-sm font-medium text-white/80">
                                                    Email address <span className="text-white/40">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    required
                                                    disabled={status === "loading"}
                                                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all disabled:opacity-50"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2.5">
                                            <label htmlFor="message" className="text-sm font-medium text-white/80">
                                                Message <span className="text-white/40">*</span>
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                required
                                                rows={6}
                                                disabled={status === "loading"}
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-y disabled:opacity-50"
                                                placeholder="Hello, I'd like to discuss..."
                                            />
                                        </div>

                                        <div className="pt-2">
                                            <Button
                                                type="submit"
                                                disabled={status === "loading"}
                                                className={cn("w-full sm:w-auto min-w-[140px]", status === "loading" && "opacity-80")}
                                            >
                                                {status === "loading" ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        Send Message
                                                        <Send className="ml-2 h-4 w-4" />
                                                    </>
                                                )}
                                            </Button>
                                        </div>

                                    </form>
                                )}

                            </Card>
                        </div>
                    </div>

                </Container>
            </main>

            <Footer />
        </>
    );
}
