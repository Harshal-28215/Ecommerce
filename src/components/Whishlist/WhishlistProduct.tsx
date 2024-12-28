"use client"

import { useMyContext } from '@/Context/context'
import React from 'react'
import Product from './Product';

function WhishlistProduct() {

    const { whishlist } = useMyContext();

    return (
        <div className='flex flex-wrap gap-4 px-20 py-5'>
            {whishlist?.map(product => <Product product={product} key={product._id}/>)}
        </div>
    )
}

export default WhishlistProduct
