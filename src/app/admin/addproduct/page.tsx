import AddProduct from '@/components/Admin/AddProduct/AddProduct'
import React from 'react'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function page() {

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/');
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    if (data.role !== 'admin') {
      redirect('/');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    redirect('/');
  }


  return (
    <div>
      <AddProduct />
    </div>
  )
}

export default page
