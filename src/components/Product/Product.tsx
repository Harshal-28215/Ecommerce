import { productType } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import WhishListButton from './WhishListButton'

function Product({ product }: { product: productType }) {
    
    return (
        <div className='block relative w-[210px] h-[390px]' key={product._id}>
            <WhishListButton product={product}/>
            <Link href='/product'>
                <div className='w-full h-[80%] bg-black relative'>
                    <Image src='/temp.webp' alt='Product Image' width={300} height={500} />
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
        </div>
    )
}

export default Product
