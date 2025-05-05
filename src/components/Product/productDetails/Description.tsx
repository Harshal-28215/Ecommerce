import { Truck } from 'lucide-react'
import React from 'react'
import ProductWhishlistButton from './ProductWhishlistButton'
import { productType } from '@/utils/utils'
import ProductCartButton from './ProductCartButton'


function Description({ Product }: { Product: productType }) {

    return (
        <>
            <div className="flex flex-col gap-4 border-b pb-5">
                <div>
                    <h1 className="text-2xl font-bold">{Product.name}</h1>
                    <p className="text-xl text-black/50">{Product.description}</p>
                </div>
                <div className="flex items-center border w-[170px] h-[30px] justify-center">
                    <span>4.5</span>
                    <span>⭐</span>
                    <span>|</span>
                    <span>102.5k Ratings</span>
                </div>
            </div>

            <div className="border-b pb-5">
                <div className="flex gap-3 my-[10px]">
                    <h1 className="text-xl font-bold">${Product.price}</h1>
                    <h1 className="text-xl text-black/50">MRP <span className="line-through">$799</span></h1>
                    <h1 className="text-xl text-[#ff905a] font-bold">(20% OFF)</h1>
                </div>
                <p className="text-[#03a685] text-sm font-bold">inclusive of all taxes</p>
                <div className="space-y-4 mt-4">
                    <div className="flex items-center gap-4">
                        <h1>SELECT SIZE</h1>
                        <h1 className="flex items-center gap-1 text-sm text-[#ff3e6c]">SIZE CHART <span className="text-xl">&gt;</span></h1>
                    </div>
                    <div className="space-x-4">
                        <button className="w-[50px] h-[50px] border border-black/30 rounded-full text-sm text-center">S</button>
                        <button className="w-[50px] h-[50px] border border-black/30 rounded-full text-sm text-center">M</button>
                        <button className="w-[50px] h-[50px] border border-black/30 rounded-full text-sm text-center">L</button>
                    </div>
                    <div className="flex gap-4">
                        <ProductCartButton Product={Product} />
                        <ProductWhishlistButton Product={Product} />
                    </div>
                </div>
            </div>

            <div>
                <div className="space-y-3 my-4 font-thin">
                    <h2>100% Original Products</h2>
                    <h2>Pay on delivery might be available</h2>
                    <h2>Easy 10 days returns and exchanges</h2>
                </div>
            </div>
        </>
    )
}

export default Description
