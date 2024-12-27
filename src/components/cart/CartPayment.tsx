"use client"

import React from 'react'
import { Button } from '../ui/button'
import { useMyContext } from '@/Context/context'

function CartPayment() {

  const { item } = useMyContext()

  let totalMrp = 0;

  item?.forEach(element => {
    totalMrp += element.price;
  });

  return (
    <div className='w-[25%] space-y-2 p-5 text-sm'>
      <h2 className="font-bold">PRICE DETAILS <span>{`(${item?.length} Items)`}</span></h2>
      <p className="flex justify-between">Total MRP <span>${totalMrp}</span></p>
      {item && item.length > 0 &&
        <>
          <p className="flex justify-between">Discount on MRP <span className='text-[#03a685]'>-$1760</span></p>
          <p className="flex justify-between">Platform Fee <span className='text-[#03a685]'>FREE</span></p>
          <p className='mb-3 flex justify-between'>Shipping Fee <span className='text-[#03a685]'>FREE</span></p>
        </>
      }

      <h1 className='pt-3 border-t border-black/20 flex justify-between font-bold'>Total Amount <span>${totalMrp}</span></h1>
      <Button className='w-full bg-[#ff3f6c] rounded-md'>PLACE ORDER</Button>
    </div>
  )
}

export default CartPayment
