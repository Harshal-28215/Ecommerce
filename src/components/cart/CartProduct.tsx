import React from 'react'
import ProductOffer from './ProductOffer'
import ProductList from './ProductList'

function CartProduct() {
  return (
    <div className='w-[40%] border-r pr-5'>
      <ProductOffer />
      <ProductList />
    </div>
  )
}

export default CartProduct
