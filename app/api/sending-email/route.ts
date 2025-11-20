import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import logger from '@/utils/logger'
import { Email } from '@/types/email'
import { withAuth } from '@/utils/auth'

export const POST = withAuth(async (req: NextRequest) => {
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
})
