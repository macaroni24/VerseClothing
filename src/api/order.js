import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { customer, items, subtotal } = req.body || {}

    if (!customer?.fullName || !customer?.phone || !customer?.address) {
      return res.status(400).json({ error: 'Missing required customer fields' })
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' })
    }

    const lines = items
      .map(
        (x) =>
          `- ${x.title} x${x.quantity}${x.selectedSize ? ` (Size ${x.selectedSize})` : ''} — $${(
            Number(x.price || 0) * Number(x.quantity || 0)
          ).toFixed(2)}`
      )
      .join('\n')

    const text = `
NEW ORDER - VerseClothes

Customer:
Name: ${customer.fullName}
Phone: ${customer.phone}
Email: ${customer.email || '(not provided)'}
Address: ${customer.address}
Notes: ${customer.notes || '(none)'}

Items:
${lines}

Subtotal: $${Number(subtotal || 0).toFixed(2)}
`.trim()

    // IMPORTANT:
    // Resend requires a verified "from" domain OR you can use their onboarding domain.
    // Use something like: "orders@yourdomain.com" once verified.
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM, // e.g. "VerseClothes <orders@yourdomain.com>"
      to: [process.env.EMAIL_TO],   // your email
      subject: `New order - ${customer.fullName}`,
      text,
    })

    return res.status(200).json({ ok: true, result })
  } catch (err) {
    return res.status(500).json({ error: err?.message || 'Server error' })
  }
}
