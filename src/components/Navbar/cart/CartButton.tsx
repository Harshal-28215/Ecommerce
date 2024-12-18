"use client"

import {
  ShoppingBag,
  Trash,
  User,
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

function CartButton() {
  const { cart, user, setCart } = useMyContext();

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:3000/api/cart/Cart?uid=${user?.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
    })
    if (response.ok) {
      setCart(null);
    }
  }

  const handleProductDelete = async (pid: string) => {

    const response = await fetch(`http://localhost:3000/api/cart/Cart?uid=${user?.id}&pid=${pid}`, {
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
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Cart</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>

          {cart?.map((product) => {
            return (
              <div className="flex items-center justify-between group hover:bg-accent transition-colors px-2" key={product._id}>
                <DropdownMenuItem>
                  <ImageData image={product.cardImage} />
                  <span>{product.name}</span>
                </DropdownMenuItem>
                <Trash className="invisible group-hover:visible cursor-pointer" onClick={() => handleProductDelete(product._id)} />
              </div>
            )
          })}
          <DropdownMenuItem>
            <User />
            <span>Profile</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Link href='/cart' className="w-full flex items-center gap-2">
              <ShoppingBag className="w-4"/>
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
