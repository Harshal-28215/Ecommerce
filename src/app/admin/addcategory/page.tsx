import AddCategoryForm from '@/components/Admin/AddCategory/AddCategoryForm'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

async function page() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) {
    redirect('/login');
  }
  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${token}`
      }
    })
    const data = await response.json()
    if (data.role !== 'admin') {
      redirect('/')
    }
  } catch (error) {
    console.log(error);
    redirect('/login');
  }

  return (
    <div>
      <AddCategoryForm />
    </div>
  )
}

export default page
