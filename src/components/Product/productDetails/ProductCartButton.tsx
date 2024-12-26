"use client"

import { useMyContext } from '@/Context/context';
import { productType } from '@/utils/utils'
import { LucideShoppingBag, SquareCheck } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function ProductCartButton({ Product }: { Product: productType }) {

    const { user, setCart, cart } = useMyContext();
    const [isCart, setIsCart] = useState(false);

    const cartData = {
        productID: Product._id,
        userID: user?.id
    }

    useEffect(() => {
        const whishlistedCart = cart?.some(cartItem => cartItem._id === Product._id);
        if (whishlistedCart) {
            setIsCart(true);
        } else {
            setIsCart(false);
        }
    }, [cart])

    const addCart = async () => {
        const response = await fetch(`http://localhost:3000/api/cart/Cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartData),
            credentials: 'include'
        })

        if (response.ok && !isCart) {
            setCart((prevCart) => prevCart ? [...prevCart, Product] : [Product])
            setIsCart(true);
        } else {
            const filteredCart = cart?.filter(cart => cart._id != Product._id)
            if (filteredCart) {
                setCart(filteredCart)
            }
            setIsCart(false);
        }
    }

    return (
        <button className="h-[50px] w-[300px] text-center bg-[#ff527b] flex justify-center items-center gap-4 rounded-sm text-white font-bold" onClick={addCart}> {isCart ? <SquareCheck /> : <LucideShoppingBag />} ADD TO BAG </button>
    )
}

export default ProductCartButton
