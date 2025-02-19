"use client"

import {
  LifeBuoy,
  LogIn,
  LogOut,
  Trash,
  Trash2,
  UserCheck2Icon,
  UserCircle,
  UserPlus,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useMyContext } from "@/Context/context"
import ImageData from "./cart/ImageData"

function AccountButton() {

  const { user, whishlist, setWhishlist } = useMyContext();

  const handleLogOut = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    if (response.ok) {
      window.location.href = '/'
    }else{
      console.log("Failed to logout")
    }
    console.log('Logged out');

  }

  const handleDelete = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/whishlist/whishlist?uid=${user?.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
    })
    if (response.ok) {
      setWhishlist(null);
    }else{
      console.log("Failed to delete whishlist")
    }
  }

  const handleProductDelete = async (pid: string) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/whishlist/whishlist?uid=${user?.id}&pid=${pid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
    })

    if (response.ok) {
      if (whishlist) {
        const updatedCart = whishlist.filter((item) => item._id !== pid);
        setWhishlist(updatedCart);
      }
      else {
        setWhishlist(null)
      }
    }else{
      console.log("Failed to delete product from whishlist")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"> <UserCircle /> <span className="text-base">{user ? user.name : "Account"}</span></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus />
              <span>WhishList</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>

                {whishlist?.map((product) => {
                  return (
                    <Link href={`/product/${product._id}`} className="flex items-center justify-between group hover:bg-accent transition-colors px-2" key={product._id}>
                      <DropdownMenuItem className="cursor-pointer">
                        <ImageData id={product._id} width={40} height={40} />
                        <span>{product.name}</span>
                      </DropdownMenuItem>
                      <Trash className="invisible group-hover:visible cursor-pointer" onClick={() => handleProductDelete(product._id)} />
                    </Link>
                  )
                })}

                <DropdownMenuSeparator />
                <Link href='/whishlist'>
                  <DropdownMenuItem className="cursor-pointer">
                    <span>Go To Whishlist</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={handleDelete}>
                  <Trash2 />
                  <span>Clear Whishlist</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LifeBuoy />
          <span>Support</span>
        </DropdownMenuItem>
        {user?.role === "admin" &&
          <Link href="/admin">
            <DropdownMenuItem>
              <UserCheck2Icon />
              <span>Admin</span>
            </DropdownMenuItem>
          </Link>}


        <DropdownMenuSeparator />
        {user == null ?
          <>
            <Link href='/login'>
              <DropdownMenuItem className="cursor-pointer">
                <LogIn />
                <span>Log In</span>
              </DropdownMenuItem>
            </Link>
            <Link href='/signup'>
              <DropdownMenuItem className="cursor-pointer">
                <LogIn />
                <span>Sign Up</span>
              </DropdownMenuItem>
            </Link>
          </> : <>
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogOut}>
              <LogOut />
              <span>Log out</span>
            </DropdownMenuItem>
          </>
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountButton
