import { NextApiRequest, NextApiResponse } from "next";

const stripe = require('stripe')(process.env.STRIPE_PUBLIC_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { Amount } = req.body;
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Amount,
                currency: 'usd',
                automatic_payment_methods: { enabled: true },
            });
            res.status(200).json(paymentIntent.client_secret);
        } catch (error) {
            res.status(500).json({ statusCode: 500, message: error });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}