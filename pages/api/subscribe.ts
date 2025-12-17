import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success?: boolean
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email } = req.body

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email address' })
  }

  try {
    // Here you would typically:
    // 1. Validate the email more thoroughly
    // 2. Save to database (MongoDB, PostgreSQL, etc.)
    // 3. Send to email service (Mailchimp, SendGrid, etc.)
    // 4. Send a confirmation email

    // For demo purposes, we'll just simulate a successful subscription
    console.log(`New subscription: ${email}`)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    return res.status(200).json({
      success: true,
      message: 'Successfully subscribed!'
    })
  } catch (error) {
    console.error('Subscription error:', error)
    return res.status(500).json({
      message: 'An error occurred. Please try again later.'
    })
  }
}