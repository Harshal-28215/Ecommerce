"use client"

import { productType } from '@/utils/utils';
import { useWhishlist } from '@/utils/hooks/useWhishlist';
import Image from 'next/image';
import React from 'react'

function ProductWhishlistButton({ Product }: { Product: productType }) {

  // const { addCart, isWhishList } = useWhishlist(Product)

  return (
    <button className="h-[50px] w-[300px] text-center flex justify-center items-center gap-4 rounded-sm font-bold border">
      {/* <Image src={isWhishList ? '/heartfill.png' : '/heart.png'} width={25} height={25} alt='whishlist button' /> */}
      WHISHLIST
    </button>
  )
}

export default ProductWhishlistButton
