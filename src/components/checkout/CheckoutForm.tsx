import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';

function CheckoutForm({ amount }: { amount: number }) {

    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const stripe = useStripe();
    const elements = useElements();
    useEffect(() => {
        fetch('/api/payment/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Amount: amount }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data);
            });
    }, [amount]);

    const handlesubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            return;
        }

        const {error:submitError} = await elements.submit();
        if (submitError) {
            setError(submitError.message || 'An unknown error occurred');
            setLoading(false);
            return;
        }

        const {error} = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams:{
                return_url:`http://localhost:3000/checkout/success?amount=${amount}`,
            }
        });
        if (error) {
            setError(error.message || 'An unknown error occurred');
            setLoading(false);
        }else{}
        
    }

    return (
        <form onSubmit={handlesubmit} className='w-[500px]'>
            {clientSecret && <PaymentElement />}
            {error && <div>{error}</div>}
            <button className='w-full bg-black rounded-md p-2 text-white mt-2' type="submit">{loading?'processing...':`Pay${amount}`}</button>
        </form>
    )
}

export default CheckoutForm
