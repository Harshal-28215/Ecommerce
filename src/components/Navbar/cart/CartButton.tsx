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
import Image from "next/image";
import ImageData from "./ImageData";

function CartButton() {
const {cart} = useMyContext();

const products = cart?.products || [];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Cart</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>

          {products.map((product, index) => {            
            return(
            <DropdownMenuItem key={index}>
              <ImageData image={product.cardImage}/>
              <span>{product.name}</span>
            </DropdownMenuItem>
          )})}
          <DropdownMenuItem>
            <User />
            <span>Profile</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <ShoppingBag />
            <span>Go To Cart</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash />
            <span>Clear All</span>
          </DropdownMenuItem>

        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CartButton
