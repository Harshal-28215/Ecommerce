"use client"

import { useCart } from '@/utils/hooks/useCart';
import { productType } from '@/utils/utils'
import { LucideShoppingBag, SquareCheck } from 'lucide-react'

function ProductCartButton({ Product }: { Product: productType }) {

    const {addCart, isCart} = useCart(Product)

    return (
        <button className="h-[50px] w-[300px] text-center bg-[#ff527b] flex justify-center items-center gap-4 rounded-sm text-white font-bold" onClick={addCart}> {isCart ? <SquareCheck /> : <LucideShoppingBag />} ADD TO BAG </button>
    )
}

export default ProductCartButton
