"use client"

import { productType } from '@/lib/utils';
import { useWhishlist } from '@/utils/hooks/useWhishlist';
import Image from 'next/image'
import React from 'react';


function WhishListButton({ product }: { product: productType }) {

  const {addCart, isWhishList} = useWhishlist(product)
  

  return (
    <Image className='w-[30px] bg-white/60 absolute cursor-pointer top-1 right-1 z-[1] p-1 rounded-md' src={isWhishList ? '/heartfill.png' : '/heart.png'} alt='whishlist image' width={70} height={70} onClick={addCart} />
  )
}

export default WhishListButton
