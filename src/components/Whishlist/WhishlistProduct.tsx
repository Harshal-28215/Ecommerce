"use client"

import { useMyContext } from '@/Context/context'
import React from 'react'
import Product from './Product';

function WhishlistProduct() {

    const { whishlist } = useMyContext();

    return (
        <div className='flex flex-wrap md:gap-4 gap-2 md:px-20 px-[10px] py-5'>
            {whishlist?.map(product => <Product product={product} key={product._id}/>)}
        </div>
    )
}

export default WhishlistProduct
