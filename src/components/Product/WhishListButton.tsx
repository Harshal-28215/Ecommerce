"use client"

import Image from 'next/image'
import React from 'react';

function WhishListButton() {

    const [isWhishList, setIsWhishList] = React.useState(false);

    const handleclick =()=>{
        setIsWhishList(!isWhishList)
    }

  return (
    <Image className='w-[30px] bg-white/60 absolute cursor-pointer top-1 right-1 z-10 p-1 rounded-md' src={isWhishList? '/heartfill.png' : '/heart.png'} alt='whishlist image' width={70} height={70} onClick={handleclick} />
  )
}

export default WhishListButton
