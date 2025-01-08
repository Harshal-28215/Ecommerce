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
    const response = await fetch(`http://localhost:3000/api/product/Product?id=${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })

    if (response.ok) {
      router.refresh()
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
