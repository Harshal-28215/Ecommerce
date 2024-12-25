"use client"

import { productType } from '@/utils/utils';
import { useWhishlist } from '@/utils/hooks/useWhishlist';
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import React from 'react';


function WhishListButton({ product }: { product: productType }) {
  const pathname = usePathname()

  const { addWhishlist, isWhishList } = useWhishlist(product)


  return (
    <>
      {pathname !== "/whishlist" &&
        <Image className='w-[30px] bg-white/60 absolute cursor-pointer top-1 right-1 z-[1] p-1 rounded-md' src={isWhishList ? '/heartfill.png' : '/heart.png'} alt='whishlist image' width={70} height={70} onClick={addWhishlist} />
      }
    </>
  )
}

export default WhishListButton
