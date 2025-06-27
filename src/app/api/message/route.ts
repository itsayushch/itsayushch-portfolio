import { rateLimit } from '@/services/ratelimit'
import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'anonymous'

  const { success, remaining, reset } = rateLimit(ip)

  if (!request.url.includes(process.env.NEXT_PUBLIC_SITE_URl!)) {
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
    color: 0x18f2e5,
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

  const res = await axios.post(
    'https://discord.com/api/webhooks/1388187626418344096/9qGDiJFoEjkCLvOYK6GnYyA1l53w1RZO4zs7rxtZ5nralZ2mbEp5O-7qS3GGsOwmXNkJ',
    {
      embeds: [embed],
    },
  )

  // response status check whether it lies in 200-299 range
  if (res.status <= 200 && res.status > 300) {
    return NextResponse.json({ message: 'Failed to send message!' }, { status: 500 })
  }

  return NextResponse.json(
    {
      message: 'Message sent successfully!',
      remaining,
    },
    { status: 200 },
  )
}
