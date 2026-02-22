import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
    try {
        // Basic IP extraction for rate-limiting
        const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';

        // 5 requests per 15 minutes window
        const isAllowed = rateLimit(ip, 5, 15 * 60 * 1000);
        if (!isAllowed) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        const body = await req.json();
        const { name, email, message, _honeypot } = body;

        // 1. Honeypot check directly filters basic bots
        if (_honeypot) {
            // Pretend it succeeded so bots don't know they are caught
            return NextResponse.json({ success: true });
        }

        // 2. Strict validation matching the client-side expectations
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }
        if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
            return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
        }
        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        // 3. Environment variables placeholders for real email provider (e.g. Resend, SendGrid)
        // const API_KEY = process.env.EMAIL_PROVIDER_API_KEY;
        // const TO_EMAIL = process.env.CONTACT_RECEIVER_EMAIL;

        // Simulate network delay for realistic UX pending states
        await new Promise(resolve => setTimeout(resolve, 800));

        // Simulate success
        return NextResponse.json({
            success: true,
            message: 'Message sent successfully. I will get back to you soon.'
        }, { status: 200 });

    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json(
            { error: 'Internal server error processing your request.' },
            { status: 500 }
        );
    }
}