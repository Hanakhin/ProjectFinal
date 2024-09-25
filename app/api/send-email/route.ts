import {NextRequest, NextResponse} from 'next/server';
import { transporter } from '@/lib/mailer';
import {addEmail} from "@/actions/email";

export async function POST(request: NextRequest) {
    const { from, subject, message } = await request.json();
    try {
        await transporter.sendMail({
            from: from,
            to: process.env.APP_EMAIL,
            subject: subject,
            text: message, // Use 'text' or 'html' based on your needs
        });
        const test = await addEmail({
            to_email: process.env.APP_EMAIL,
            from_email: from,
            subject: subject,
            message: message,
        })
        return NextResponse.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Failed to send email:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
