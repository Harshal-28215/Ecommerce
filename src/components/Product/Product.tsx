import { productType } from '@/utils/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import WhishListButton from './WhishListButton'
import DeleteButton from './DeleteButton'


interface ProductProps {
    product: productType;
}

async function Product({ product }: ProductProps) {

    let response;
    try {
        response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Image/coverImage?id=${product._id}`, {
            method: "GET",
        }).then(data => data.json());
    } catch (error) {
        console.error('Error fetching cover image:', error);
        return null; // or handle the error as needed
    }

    const coverImage = await response.image?.CardImage;
    const base64Image = coverImage ? `data:${coverImage?.contentType};base64,${coverImage?.data}` : null;


    return (
        <div className='block relative w-[200px] h-[380px]' key={product._id}>
            <WhishListButton product={product} />
            <DeleteButton id={product._id} />
            <Link href={`/product/${product._id}`}>
                <div className='w-full h-[80%] bg-black relative'>
                    {base64Image ? (
                        <Image src={base64Image} alt='Product Image' width={300} height={500} />
                    ) : (
                        <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                            <span>No Image Available</span>
                        </div>
                    )}
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
