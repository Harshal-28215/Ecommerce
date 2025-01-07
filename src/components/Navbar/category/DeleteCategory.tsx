import { toast } from '@/hooks/use-toast'
import { Trash2 } from 'lucide-react'
import React from 'react'

function DeleteCategory({id}: {id: string}) {

  const deleteCategory = async () => {
    const response = await fetch(`http://localhost:3000/api/category/CreateCategory?id=${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    if (response.ok) {
      toast({
        title: 'Category Deleted',
        description: 'Category has been deleted successfully',
      })
    }else{
      toast({
        title: 'Error',
        description: 'Category could not be deleted',
      })
    }
  }

  return (
    <div className='cursor-pointer hover:bg-gray-200 p-1 rounded-md'>
      <Trash2 size={15} onClick={deleteCategory}/>
    </div>
  )
}

export default DeleteCategory
