import React from 'react'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

async function page() {

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        console.error('No token found');
        redirect('/');
    }

    let data;
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `token=${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        data = await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        redirect('/');
    }

    if (data.role !== 'admin') {
        redirect('/');
    }


    return (
        <div className='flex gap-4 px-5'>
            <Link href="/admin/addproduct" className='border-black/20 border p-3 rounded-md hover:bg-black/10'>Add Product</Link>
            <Link href="/admin/addcategory" className='border-black/20 border p-3 rounded-md hover:bg-black/10'>Add Category</Link>
        </div>
    )
}

export default page
