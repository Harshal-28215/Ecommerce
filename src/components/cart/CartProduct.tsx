import React from 'react'
import ProductOffer from './ProductOffer'
import ProductList from './ProductList'

function CartProduct() {
  return (
    <div className='w-[40%]'>
      <ProductOffer />
      <ProductList />
    </div>
  )
}

export default CartProduct
