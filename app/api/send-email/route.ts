import { NextResponse } from 'next/server';
import { transporter } from '@/lib/mailer';

export async function POST(req: Request) {
    const { from, subject, text } = await req.json();

    try {
        await transporter.sendMail({
            from: from, // L'email de l'utilisateur en session
            to: process.env.APP_EMAIL, // L'email de l'application
            subject,
            text,
        });

        return NextResponse.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Failed to send email:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
