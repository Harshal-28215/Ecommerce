import { useMyContext } from "@/Context/context";
import { productType } from "@/utils/utils";
import { useEffect, useState } from "react";

export const useWhishlist = (product: productType) => {

  const { user, setWhishlist, whishlist } = useMyContext();

  const [isWhishList, setIsWhishList] = useState(false);


  const whishlistData = {
    productID: product._id,
    userID: user?.id
  }

  useEffect(() => {
    const whishlistedCart = whishlist?.some(cartItem => cartItem._id === product._id);
    if (whishlistedCart) {
      setIsWhishList(true);
    } else {
      setIsWhishList(false);
    }
  }, [whishlist])


  const addWhishlist = async () => {
    const response = await fetch(`http://localhost:3000/api/whishlist/whishlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(whishlistData),
      credentials: 'include'
    })

    if (response.ok && isWhishList == false) {
      setWhishlist((prevCart) => prevCart ? [...prevCart, product] : [product])
      setIsWhishList(true)
    } else {
      const filteredCart = whishlist?.filter(whishlist => whishlist._id != product._id)
      if (filteredCart) {
        setWhishlist(filteredCart)
      }
      setIsWhishList(false)
    }
  }

  return { addWhishlist, isWhishList }
}