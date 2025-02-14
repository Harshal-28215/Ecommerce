import React from 'react'
import ProductOffer from './ProductOffer'
import ProductList from './ProductList'

function CartProduct() {
  return (
    <div className='md:w-[40%] w-[100%] md:border-r md:pr-5'>
      <ProductOffer />
      <ProductList />
    </div>
  )
}

export default CartProduct
