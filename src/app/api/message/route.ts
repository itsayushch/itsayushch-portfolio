import { rateLimit } from '@/services/ratelimit'
import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'anonymous'

  const { success, remaining, reset } = rateLimit(ip)

  if (!request.url.includes(process.env.NEXT_PUBLIC_SITE_URL!)) {
    return NextResponse.json({ message: 'Invalid request URL' }, { status: 400 })
  }

  if (!success) {
    return NextResponse.json(
      { message: 'You can only send 2 messages every 15 minutes!' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Remaining': String(remaining),
          'X-RateLimit-Reset': reset.toString(),
        },
      },
    )
  }

  const { name, email, message } = await request.json()

  const embed = {
    color: Number("0x" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0")),
    author: {
      name: 'New Message',
      icon_url:
        'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-messages-icon.png',
    },
    description: message,
    fields: [
      {
        name: 'Name',
        value: name || '\u200b',
        inline: true,
      },
      {
        name: 'Email',
        value: email || '\u200b',
        inline: true,
      },
    ],
    timestamp: new Date().toISOString(),
  }

  await axios.post(process.env.WEBHOOK_URL!,
    {
      embeds: [embed],
    },
  ).catch((error) => {
    console.error('Error sending message to Discord:', error)
    return NextResponse.json({ message: 'Internal Server Error!' }, { status: 500 })
  })

  return NextResponse.json(
    {
      message: 'Message sent successfully!',
      remaining,
    },
    { status: 200 },
  )
}
