import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const name = formData.get('name');
    const email = formData.get('email');
    const position = formData.get('position');
    const message = formData.get('message');
    const cvFile = formData.get('attachment') as File | null;

    if (!name || !email || !position || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
      process.env.WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      console.log(`\n--- [DEV: No Web3Forms key set] ---
Name:       ${name}
Email:      ${email}
Position:   ${position}
Message:    ${message}
Attachment: ${cvFile ? `${cvFile.name} (${cvFile.size} bytes)` : 'none'}
------------------------------------\n`);
      return NextResponse.json({ success: true, mock: true });
    }

    // Forward to Web3Forms API
    const web3FormData = new FormData();
    web3FormData.append('access_key', accessKey);
    web3FormData.append('subject', `Zynox Job Application: ${name} — ${position}`);
    web3FormData.append('from_name', 'Zynox Careers Page');
    web3FormData.append('name', String(name));
    web3FormData.append('email', String(email));
    web3FormData.append('position', String(position));
    web3FormData.append('message', String(message));
    
    if (cvFile && cvFile.size > 0) {
      web3FormData.append('attachment', cvFile);
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: web3FormData,
    });

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
      return NextResponse.json({ error: data.message ?? 'Failed to send application' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Apply route error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
