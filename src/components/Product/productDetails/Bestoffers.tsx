import { Tag } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Bestoffers() {
    return (
        <div className='my-7 space-y-4 border-b pb-8'>
            <div>
                <h1 className='flex text-sm font-bold items-center gap-2 mb-3'>BEST OFFERS <Tag className='w-4' /> </h1>
                <p>• Applicable on: Orders above Rs. 349 (only on first purchase)</p>
                <p>• Coupon code: SAVE20</p>
                <p>• Coupon Discount: 20% off (Your total saving: Rs. 288)</p>
                <Link href='https://www.myntra.com/online-fashion-store' className='text-[14px] font-bold text-[#ff3f6c]' target='_blank'>View Eligible Products</Link>
            </div>

            <div>
                <h1 className='flex text-sm font-bold'>10% Discount on Axis Bank Credit Card.</h1>
                <p>• Min Spend ₹3500, Max Discount ₹1000.</p>
                <Link href='https://www.myntra.com/shop/eorsbankoffers' className='text-[14px] font-bold text-[#ff3f6c]' target='_blank'>Terms & Condition</Link>
            </div>

            <div>
                <h1 className='flex text-sm font-bold'>10% Discount on Kotak Credit and Debit Cards..</h1>
                <p>• Min Spend ₹3500, Max Discount ₹1000.</p>
                <Link href='https://www.myntra.com/shop/eorsbankoffers' className='text-[14px] font-bold text-[#ff3f6c]' target='_blank'>Terms & Condition</Link>
            </div>

            <div>
                <h1 className='flex text-sm font-bold'>10% Discount on SBI Debit Cards.</h1>
                <p>• Min Spend ₹3500, Max Discount ₹1000.</p>
                <Link href='https://www.myntra.com/shop/eorsbankoffers' className='text-[14px] font-bold text-[#ff3f6c]' target='_blank'>Terms & Condition</Link>
            </div>

            <div>
                <h1 className='flex text-sm font-bold'>10% Discount on Axis Bank Credit Card EMI.</h1>
                <p>• Min Spend ₹3500, Max Discount ₹1500.</p>
                <Link href='https://www.myntra.com/shop/eorsbankoffers' className='text-[14px] font-bold text-[#ff3f6c]' target='_blank'>Terms & Condition</Link>
            </div>

            <div>
                <h1 className='flex text-sm font-bold'>10% Discount on Kotak Credit and Debit Card EMI.</h1>
                <p>• Min Spend ₹3500, Max Discount ₹1500.</p>
                <Link href='https://www.myntra.com/shop/eorsbankoffers' className='text-[14px] font-bold text-[#ff3f6c]' target='_blank'>Terms & Condition</Link>
            </div>

            <div>
                <h1 className='flex text-sm font-bold'>10% Discount on HDFC Bank Credit Card EMI.</h1>
                <p>• Min Spend ₹3500, Max Discount ₹1000.</p>
                <Link href='https://www.myntra.com/shop/eorsbankoffers' className='text-[14px] font-bold text-[#ff3f6c]' target='_blank'>Terms & Condition</Link>
            </div>

            <div>
                <h1 className='flex text-sm font-bold'>12.5% Discount on Myntra Kotak Credit Card.</h1>
                <p>• Max Discount up to ₹750 on every spends.</p>
                <Link href='https://www.myntra.com/shop/eorsbankoffers' className='text-[14px] font-bold text-[#ff3f6c]' target='_blank'>Terms & Condition</Link>
            </div>
        </div>
    )
}

export default Bestoffers
