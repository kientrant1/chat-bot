import { CreateEmailResponse } from 'resend'
import { API_URL } from '@/constants/url'
import logger from '@/utils/logger'
import { Email } from '@/types/email'
import { siteConfig } from '@/constants/siteConfig'

const sender = siteConfig.isDev
  ? '<onboarding@resend.dev>'
  : '<onboarding@resend.dev>'

export const sendEmail = async (to: string) => {
  try {
    const payload: Email = {
      from: `Your Result ${sender}`,
      to,
      subject: 'Your Quiz Results',
      html: `<h1>Your Quiz Results</h1>
             <p>Thank you for completing the quiz!</p>`,
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}${API_URL.SEND_EMAIL}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Failed to send email: ${errorData.error}`)
    }

    const data = (await response.json()) as CreateEmailResponse
    return data
  } catch (error) {
    logger.error('Error sending email:', error)
    throw error
  }
}
