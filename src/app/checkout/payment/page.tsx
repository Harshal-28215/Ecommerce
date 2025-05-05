"use client"

import CheckoutForm from '@/components/checkout/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined')

}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

function page() {
    const Amount = localStorage.getItem('totalMrp')? Number(localStorage.getItem('totalMrp')) : 0;
    return (
        <div className='w-full flex justify-center items-center mt-10'>
            <Elements stripe={stripePromise}
            options={{
                mode: 'payment',
                amount: Amount*100,
                currency:'usd',
            }}
            >
                <CheckoutForm amount={Amount} />
            </Elements>
        </div>
    )
}

export default page
