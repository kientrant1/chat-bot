import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import logger from '@/utils/logger'
import { Email } from '@/types/email'

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body: Email = await req.json()

    const data = await resend.emails.send({
      from: body.from,
      to: body.to,
      subject: body.subject,
      html: body.html,
    })

    return NextResponse.json({ data })
  } catch (error) {
    logger.error('Sending email error: ', error)
    return NextResponse.json({ error }, { status: 500 })
  }
}
