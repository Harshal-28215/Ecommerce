"use client"

import React from 'react'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMyContext } from '@/Context/context'

function DeleteButton({ id }: { id: string }) {

  const { user } = useMyContext();

  const router = useRouter()

  const handleclick = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/Product?id=${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })

    if (response.ok) {
      router.refresh()
    }else{
      console.error('Failed to delete product')
    }

  }

  return (
    <>
      {user?.role === 'admin' &&
        <Button className='absolute top-[12%] w-[30px] hover:bg-white/50 right-1 bg-white/50 text-black z-[1]' onClick={handleclick}>
          <Trash2 />
        </Button>
      }
    </>
  )
}

export default DeleteButton
