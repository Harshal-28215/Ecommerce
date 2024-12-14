"use client"

import { useMyContext } from '@/Context/context';
import { productType } from '@/lib/utils';
import Image from 'next/image'
import React from 'react';


function WhishListButton({product}:{product:productType}) {

  const {user,setCart} = useMyContext();

  const [isWhishList, setIsWhishList] = React.useState(false);
    

    const whishlistData = {
      productID: product._id,
      userID: user?.id
    }    

    const handleclick = async ()=>{
      const response = await fetch(`http://localhost:3000/api/cart/Cart`, {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(whishlistData),
        credentials: 'include'
      })

      if (response.ok) {
        setCart((prevCart) => prevCart ? [...prevCart, product] : [product])
      }
      
      
        setIsWhishList(!isWhishList)
    }

  return (
    <Image className='w-[30px] bg-white/60 absolute cursor-pointer top-1 right-1 z-10 p-1 rounded-md' src={isWhishList? '/heartfill.png' : '/heart.png'} alt='whishlist image' width={70} height={70} onClick={handleclick} />
  )
}

export default WhishListButton
