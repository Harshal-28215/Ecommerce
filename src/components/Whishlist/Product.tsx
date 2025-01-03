"use client"

import Link from 'next/link'
import React, { useEffect } from 'react'
import ImageData from '../Navbar/cart/ImageData'
import { productType } from '@/utils/utils'
import { LucideShoppingBag, SquareCheck, Trash2 } from 'lucide-react'
import { useMyContext } from '@/Context/context'
import { useCart } from '@/utils/hooks/useCart'
import { useToast } from '@/hooks/use-toast'

function Product({ product }: { product: productType }) {

    const {toast} = useToast();

    const { user, whishlist, setWhishlist } = useMyContext();
    const {isCart, addCart} = useCart(product);

    const pid = product._id;
    const handledelete = async () => {

        const response = await fetch(`http://localhost:3000/api/whishlist/whishlist?uid=${user?.id}&pid=${pid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
        })

        if (response.ok) {
            if (whishlist) {
                const updatedCart = whishlist.filter((item) => item._id !== pid);
                setWhishlist(updatedCart);
            }
            else {
                setWhishlist(null)
            }
        }
    }

    useEffect(() => {
      if (isCart) {
        handledelete();
        toast({
            description: "Product added to cart",
        })
      }
    }, [isCart])
    

    return (
        <div className='block relative w-[210px] h-[390px]' key={product._id}>
            <div className='absolute top-1 right-1 bg-white/50 z-[1] cursor-pointer rounded-sm p-1' onClick={handledelete}><Trash2 /></div>
            <Link href={`/product/${product._id}`}>
                <div className='w-full h-[80%] bg-black relative'>
                    <ImageData id={product._id} width={200} height={300} />
                    <div className='absolute text-black bg-white/40 p-1 bottom-2 left-1 flex text-end flex-row text-[12px] font-bold'>
                        <span>4.5</span>
                        <span>⭐</span>
                        <span>|</span>
                        <span>102.5k</span>
                    </div>
                </div>
                <div className='p-1'>
                    <h1 className='text-[16px] font-bold text-ellipsis overflow-hidden'>{product.name}</h1>
                    <p className='text-[14px] font-thin text-black/70 text-ellipsis overflow-hidden'>{product.description}</p>
                    <div className='flex gap-1 items-end'>
                        <p className='text-[14px] font-bold'>Rs. {product.price}</p>
                        <p className='line-through text-[12px] text-black/40'>Rs. 380</p>
                        <p className='text-[12px] text-[#ff905a]'>(5% OFF)</p>
                    </div>
                </div>
            </Link>
            <button className="h-[40px] w-full text-center bg-[#ff527b] flex justify-center items-center gap-4 rounded-sm text-white font-bold" onClick={addCart}> {isCart ? <SquareCheck /> : <LucideShoppingBag />} ADD TO BAG </button>
        </div>
    )
}

export default Product
