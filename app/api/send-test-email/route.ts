import {NextRequest, NextResponse} from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    // Get the body of the request, which should contain a "html" key
    const { html, to } = await request.json();

    try {
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to,
            subject: "Shipyard Test Email",
            html,
        });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error });
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb',
        },
    },
}
