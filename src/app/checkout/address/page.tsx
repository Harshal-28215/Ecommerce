import Address from '@/components/address/Address'
import CartPayment from '@/components/cart/CartPayment'
import React from 'react'

async function page() {
  
  return (
    <main className='flex justify-center gap-3'>
      <Address />
      <CartPayment />
    </main>
  )
}

export default page
