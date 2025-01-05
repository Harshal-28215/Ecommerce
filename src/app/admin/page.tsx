import React from 'react'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

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
        <div className='flex gap-4'>
            <Link href="/admin/addproduct" className='border-black/20 border p-3 rounded-md hover:bg-black/10'>Add Product</Link>
            <Link href="/admin/addcategory" className='border-black/20 border p-3 rounded-md hover:bg-black/10'>Add Category</Link>
        </div>
    )
}

export default page
