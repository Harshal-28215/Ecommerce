import { useMyContext } from "@/Context/context";
import { productType } from "@/utils/utils";
import { useEffect, useState } from "react";

export const useWhishlist = (product: productType) => {

  const { user, setCart, cart } = useMyContext();

  const [isWhishList, setIsWhishList] = useState(false);


  const whishlistData = {
    productID: product._id,
    userID: user?.id
  }

  useEffect(() => {
    const whishlistedCart = cart?.some(cartItem => cartItem._id === product._id);
    if (whishlistedCart) {
      setIsWhishList(true);
    } else {
      setIsWhishList(false);
    }
  }, [cart])


  const addCart = async () => {
    const response = await fetch(`http://localhost:3000/api/cart/Cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(whishlistData),
      credentials: 'include'
    })

    if (response.ok && isWhishList == false) {
      setCart((prevCart) => prevCart ? [...prevCart, product] : [product])
      setIsWhishList(true)
    } else {
      const filteredCart = cart?.filter(cart => cart._id != product._id)
      if (filteredCart) {
        setCart(filteredCart)
      }
      setIsWhishList(false)
    }
  }

  return { addCart, isWhishList }
}