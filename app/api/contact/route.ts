import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
    try {
        const rawIp = req.headers.get('x-forwarded-for') || '127.0.0.1';
        const ip = rawIp.split(',')[0].trim();

        const isAllowed = rateLimit(ip, 5, 15 * 60 * 1000);
        if (!isAllowed) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        const body = await req.json();
        const { name, email, message, _honeypot } = body;

        if (_honeypot) {
            return NextResponse.json({ success: true });
        }

        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }
        if (name.length > 100) {
            return NextResponse.json({ error: 'Name is too long' }, { status: 400 });
        }
        if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
            return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
        }
        if (email.length > 254) {
            return NextResponse.json({ error: 'Email is too long' }, { status: 400 });
        }
        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }
        if (message.length > 2000) {
            return NextResponse.json({ error: 'Message must be under 2000 characters' }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false, // STARTTLS
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_TO_EMAIL,
            replyTo: email,
            subject: `New message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
            html: `
                <div style="font-family: monospace; background:#0a0a0a; color:#e5e5e5; padding:32px; border-radius:8px; border:1px solid #222;">
                    <h2 style="color:#00ff88; margin-top:0;">New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}" style="color:#00e5ff;">${email}</a></p>
                    <hr style="border-color:#222; margin:24px 0;" />
                    <p style="white-space:pre-wrap;">${message}</p>
                </div>
            `,
        });

        return NextResponse.json({
            success: true,
            message: 'Message sent successfully. I will get back to you soon.',
        }, { status: 200 });

    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json(
            { error: 'Internal server error processing your request.' },
            { status: 500 }
        );
    }
}