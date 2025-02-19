"use client"

import {
  LucideShoppingBag,
  ShoppingBag,
  Trash,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMyContext } from "@/Context/context";
import ImageData from "./ImageData";
import Link from "next/link";
import React from "react";

function CartButton() {
  const { cart, user, setCart } = useMyContext();


  const handleDelete = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/Cart?uid=${user?.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
    })
    if (response.ok) {
      setCart(null);
    }else{
      throw new Error("Failed to delete cart")
    }
  }

  const handleProductDelete = async (pid: string) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/Cart?uid=${user?.id}&pid=${pid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
    })

    if (response.ok) {
      if (cart) {
        const updatedCart = cart.filter((item) => item._id !== pid);
        setCart(updatedCart);
      }
      else {
        setCart(null)
      }
    }else{
      throw new Error("Failed to delete product from cart")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"> <LucideShoppingBag /> <span className="text-base">Cart</span></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>

          {cart?.map((product) => {
            return (
              <div className="flex justify-between items-center group relative" key={product._id}>
                <Link href={`/product/${product._id}`} className="flex items-center justify-between hover:bg-accent transition-colors px-2 w-full">
                  <DropdownMenuItem className="cursor-pointer">
                    <ImageData id={product._id} width={40} height={40} />
                    <span>{product.name}</span>
                  </DropdownMenuItem>
                </Link>
                <Trash className="invisible group-hover:visible cursor-pointer absolute right-2" onClick={() => handleProductDelete(product._id)} />
              </div>
            )
          })}

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Link href='/cart' className="w-full flex items-center gap-2">
              <ShoppingBag className="w-4" />
              <span>Go To Cart</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete}>
            <Trash />
            <span>Clear All</span>
          </DropdownMenuItem>

        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CartButton
