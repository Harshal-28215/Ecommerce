"use client"

import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { useMyContext } from '@/Context/context'
import { usePathname, useRouter } from 'next/navigation'

function CartPayment() {

  const router = useRouter();
  const path = usePathname();


  const { item, setItem, selected } = useMyContext()

  useEffect(() => {
    if (item?.length === 0) {
      const storedItems = localStorage.getItem('cartItems');
      if (storedItems) {
        setItem(JSON.parse(storedItems))
      }
    }
  }, [item])

  let totalMrp = 0;

  item?.forEach(element => {
    totalMrp += element.price;
  });

  const setitemtolocal = () => {
    if (path === '/cart') {
      localStorage.setItem('cartItems', JSON.stringify(item))
      localStorage.setItem('totalMrp', JSON.stringify(totalMrp))
      router.push('/checkout/address')
    } else if (path === '/checkout/address') {
      router.push('/checkout/payment')
    }
  }

  return (
    <div className='md:w-[25%] w-[100%] space-y-2 p-5 text-sm'>
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
      {path === '/cart' ?
        <Button className='w-full bg-[#ff3f6c] rounded-md' disabled={item?.length === 0} onClick={setitemtolocal}>PROCEED TO BUY</Button>

        : path === '/checkout/address' &&
        <Button className='w-full bg-[#ff3f6c] rounded-md' disabled={selected === ""} onClick={setitemtolocal}>PROCEED TO PAYMENT</Button>
      }
    </div>
  )
}

export default CartPayment
