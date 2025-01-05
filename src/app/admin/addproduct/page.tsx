import AddProduct from '@/components/Admin/AddProduct/AddProduct'
import React from 'react'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function page() {

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const response = await fetch('http://localhost:3000/api/user/user', {
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
  

  return (
    <div>
      <AddProduct />
    </div>
  )
}

export default page
