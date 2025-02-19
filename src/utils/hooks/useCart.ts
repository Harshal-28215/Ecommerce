import { useMyContext } from "@/Context/context";
import { productType } from "@/utils/utils";
import { useEffect, useState } from "react";

export const useCart = (product: productType) => {

    const { user, setCart, cart } = useMyContext();
    const [isCart, setIsCart] = useState(false);

    const cartData = {
        productID: product._id,
        userID: user?.id
    }

    useEffect(() => {
        const whishlistedCart = cart?.some(cartItem => cartItem._id === product._id);
        if (whishlistedCart) {
            setIsCart(true);
        } else {
            setIsCart(false);
        }
    }, [cart])

    const addCart = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/Cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartData),
            credentials: 'include'
        })

        if (response.ok && !isCart) {
            setCart((prevCart) => prevCart ? [...prevCart, product] : [product])
            setIsCart(true);
        } else {
            const filteredCart = cart?.filter(cart => cart._id != product._id)
            if (filteredCart) {
                setCart(filteredCart)
            }
            setIsCart(false);
        }
    }
    return { addCart, isCart }
}