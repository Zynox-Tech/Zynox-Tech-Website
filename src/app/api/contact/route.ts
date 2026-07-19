import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      // Development fallback — log to console when no key is configured
      console.log(`\n--- [DEV: No RESEND_API_KEY set] ---
Name:    ${name}
Email:   ${email}
Message: ${message}
------------------------------------\n`);
      return NextResponse.json({ success: true, mock: true });
    }

    const resend = new Resend(apiKey);

    const toEmail = process.env.CONTACT_TO_EMAIL ?? 'hello@zynoxtech.site';

    const { error } = await resend.emails.send({
      from: 'Zynox Contact Form <onboarding@resend.dev>',
      to: [toEmail],
      replyTo: email,
      subject: `New project inquiry from ${name} — Zynox`,
      text: [
        `Name:    ${name}`,
        `Email:   ${email}`,
        ``,
        `Message:`,
        message,
      ].join('\n'),
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;">
          <h2 style="margin:0 0 24px;font-size:20px;color:#111;">New project inquiry — Zynox</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;color:#555;font-size:14px;width:80px;vertical-align:top;">Name</td>
              <td style="padding:8px 0;font-size:14px;color:#111;font-weight:600;">${name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#555;font-size:14px;vertical-align:top;">Email</td>
              <td style="padding:8px 0;font-size:14px;color:#111;">
                <a href="mailto:${email}" style="color:#4f8cff;">${email}</a>
              </td>
            </tr>
          </table>
          <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />
          <p style="margin:0;font-size:14px;color:#555;line-height:1.7;white-space:pre-wrap;">${message}</p>
          <p style="margin:32px 0 0;font-size:12px;color:#aaa;">
            Sent via the Zynox contact form · Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message ?? 'Failed to send' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
