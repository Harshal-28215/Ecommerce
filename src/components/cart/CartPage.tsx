import React from 'react'
import CartProduct from './CartProduct'
import CartPayment from './CartPayment'

function CartPage() {
  return (
    <main className='flex w-full justify-center md:flex-row flex-col'>
      <CartProduct />
      <CartPayment />
    </main>
  )
}

export default CartPage
