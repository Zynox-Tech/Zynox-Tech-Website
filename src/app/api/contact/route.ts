import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      // Development fallback — log to console when no key is configured
      console.log(`\n--- [DEV: No WEB3FORMS_ACCESS_KEY set] ---
Name:    ${name}
Email:   ${email}
Message: ${message}
------------------------------------------\n`);
      return NextResponse.json({ success: true, mock: true });
    }

    const payload = {
      access_key: accessKey,
      subject: `New project inquiry from ${name} — Zynox`,
      from_name: 'Zynox Contact Form',
      replyto: email,
      name,
      email,
      message,
    };

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });

    // Safely read the response — web3forms may return HTML on network errors
    const responseText = await response.text();
    let data: { success?: boolean; message?: string } = {};

    try {
      data = JSON.parse(responseText);
    } catch {
      console.error('Web3Forms returned non-JSON response:', responseText.slice(0, 300));
      return NextResponse.json({ error: 'Email service unreachable' }, { status: 502 });
    }

    if (!data.success) {
      console.error('Web3Forms rejected the request:', data);
      return NextResponse.json({ error: data.message ?? 'Failed to send' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
