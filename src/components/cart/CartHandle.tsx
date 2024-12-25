'use client'

import { useMyContext } from '@/Context/context'
import React from 'react'
import Product from '../Product/Product';

function CartHandle() {

    const {cart} = useMyContext();
    

  return (
    <main className='flex gap-8 p-8 flex-wrap'>
      {cart?.map(product => (
        <Product product={product} key={product._id}/>
      ))}
    </main>
  )
}

export default CartHandle
