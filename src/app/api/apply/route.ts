import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name     = formData.get('name')     as string | null;
    const email    = formData.get('email')    as string | null;
    const position = formData.get('position') as string | null;
    const message  = formData.get('message')  as string | null;
    const cvFile   = formData.get('attachment') as File | null;

    if (!name || !email || !position || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.log(`\n--- [DEV: No RESEND_API_KEY set] ---
Name:       ${name}
Email:      ${email}
Position:   ${position}
Message:    ${message}
Attachment: ${cvFile ? `${cvFile.name} (${cvFile.size} bytes)` : 'none'}
------------------------------------\n`);
      return NextResponse.json({ success: true, mock: true });
    }

    const resend  = new Resend(apiKey);
    const toEmail = process.env.CONTACT_TO_EMAIL ?? 'zynoxtech08@gmail.com';

    // Build optional attachment array
    const attachments: { filename: string; content: Buffer }[] = [];
    if (cvFile && cvFile.size > 0) {
      const buffer = Buffer.from(await cvFile.arrayBuffer());
      attachments.push({ filename: cvFile.name, content: buffer });
    }

    const { error } = await resend.emails.send({
      from: 'Zynox Careers <onboarding@resend.dev>',
      to: [toEmail],
      replyTo: email,
      subject: `Zynox Job Application: ${name} — ${position}`,
      text: [
        `Name:     ${name}`,
        `Email:    ${email}`,
        `Position: ${position}`,
        ``,
        `Cover note:`,
        message,
        cvFile ? `\nCV attached: ${cvFile.name}` : '',
      ].join('\n'),
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;">
          <h2 style="margin:0 0 24px;font-size:20px;color:#111;">Job Application — Zynox</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;color:#555;font-size:14px;width:90px;vertical-align:top;">Name</td>
              <td style="padding:8px 0;font-size:14px;color:#111;font-weight:600;">${name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#555;font-size:14px;vertical-align:top;">Email</td>
              <td style="padding:8px 0;font-size:14px;color:#111;">
                <a href="mailto:${email}" style="color:#4f8cff;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#555;font-size:14px;vertical-align:top;">Position</td>
              <td style="padding:8px 0;font-size:14px;color:#111;">${position}</td>
            </tr>
          </table>
          <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />
          <p style="margin:0 0 8px;font-size:13px;color:#555;font-weight:600;">Cover note</p>
          <p style="margin:0;font-size:14px;color:#333;line-height:1.7;white-space:pre-wrap;">${message}</p>
          ${cvFile ? `<p style="margin:20px 0 0;font-size:13px;color:#555;">📎 CV attached: <strong>${cvFile.name}</strong></p>` : ''}
          <p style="margin:32px 0 0;font-size:12px;color:#aaa;">
            Sent via the Zynox careers page · Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
      attachments: attachments.length ? attachments : undefined,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message ?? 'Failed to send application' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Apply route error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
