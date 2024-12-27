"use client"

import React, { useState } from 'react'
import { productdoffer } from './ProductofferJson'
import { PercentCircle } from 'lucide-react'

function ProductOffer() {

    const [isopen, setIsopen] = useState(false)

    return (
        <div className='border border-black/10 p-5 rounded-md'>
            <h1 className='font-bold flex gap-3 mb-3 text-sm items-center'> <PercentCircle className='w-[20px]'/> Available Offers</h1>
            {isopen ? (
                productdoffer.map((offers, index) => <li key={index} className='text-xs'>{offers}</li>)
            ) : (
                <li className='text-xs'>{productdoffer[0]}</li>
            )}

            <p className='flex items-center text-[#ff3f6c] cursor-pointer w-[120px]' onClick={()=>setIsopen(!isopen)}>Show More
                <span className={`${isopen ? 'rotate-180' : 'rotate-0'} flex items-center`}><svg width="30px" height="30px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth="0.00024000000000000003"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.24000000000000005"></g><g id="SVGRepo_iconCarrier"> <path d="M11.1808 15.8297L6.54199 9.20285C5.89247 8.27496 6.55629 7 7.68892 7L16.3111 7C17.4437 7 18.1075 8.27496 17.458 9.20285L12.8192 15.8297C12.4211 16.3984 11.5789 16.3984 11.1808 15.8297Z" fill="#ff3f6c"></path> </g></svg></span>
            </p>
        </div>
    )
}

export default ProductOffer
