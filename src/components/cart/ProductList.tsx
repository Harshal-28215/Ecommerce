"use client"

import { useMyContext } from '@/Context/context'
import React, { useEffect } from 'react'
import ImageData from '../Navbar/cart/ImageData'
import Link from 'next/link'

function ProductList() {

    const { cart, setCart, user, item, setItem, allitem, setAllitem } = useMyContext()

    useEffect(() => {
        if (item && item.length > 0) {
            setAllitem(true)
        } else {
            setAllitem(false)
        }
    }, [item])

    const allitemchange = () => {
        if (allitem) {
            setAllitem(false);
            setItem([]);
        } else {
            setAllitem(true);
            cart?.forEach(product => setItem(prev => [...(prev || []), { id: product._id, price: product.price }]))
        }
    }

    const handleremove = async () => {
        const response = await fetch(`${process.env.URL}/api/cart/Cart?uid=${user?.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
        })
        if (response.ok) {
            setCart(null);
        }else{
            throw new Error("Error deleting cart");
        }
    }

    const deleteproduct = async (pid: string) => {

        const response = await fetch(`/api/cart/Cart?uid=${user?.id}&pid=${pid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
        })

        if (response.ok) {
            if (cart) {
                const updatedCart = cart.filter((item) => item._id !== pid);
                setCart(updatedCart);
            }
            else {
                setCart(null)
            }
        }
    }

    const handlechange = (id: string, price: number) => {
        const checkitem = item?.some(item => item.id === id);
        if (checkitem) {
            const filteritem = item?.filter(item => item.id !== id)
            setItem(filteritem || [])
        } else {
            setItem(prevItems => [...(prevItems || []), { id, price }])
        }
    }

    return (
        <>
            <div className='flex justify-between my-5'>
                <div className='space-x-2'>
                    <input
                        type="checkbox"
                        name="check"
                        className='w-4 h-4'
                        onChange={allitemchange}
                        checked={allitem}
                    />
                    <label htmlFor="check">{item?.length}/{cart?.length} Item Selected</label>
                </div>
                <p className='cursor-pointer' onClick={handleremove}>Remove</p>
            </div>

            {cart?.map((product) => (
                <div key={product._id} className='flex gap-4 relative w-full border border-black/10 p-3 rounded-md mb-3'>
                    <input type="checkbox" name="cheak" className='absolute w-4 h-4 top-4 left-4' onChange={() => handlechange(product._id,product.price)} checked={item?.some(item => item.id === product._id)} />
                    <Link href={`/product/${product._id}`}>
                        <ImageData id={product._id} width={100} height={150} />
                    </Link>
                    <div>
                        <Link href={`/product/${product._id}`}>
                            <h1>{product.name}</h1>
                            <p>comfort washed effect pure cotton casual shirt</p>
                        </Link>
                        <div>
                            <p>${product.price}</p>
                            <p className='line-through text-black/60'>$2,399</p>
                            <p>38% OFF</p>
                        </div>
                        <p className='flex items-center'>
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.63639 6.99013C6.84386 7.1976 6.84386 7.53397 6.63639 7.74143L5.7725 8.60533H8.27232C9.21251 8.60533 9.97949 7.84333 9.97949 6.89824C9.97949 5.95914 9.21859 5.19824 8.27949 5.19824H6.89116C6.59776 5.19824 6.35991 4.96039 6.35991 4.66699C6.35991 4.37359 6.59776 4.13574 6.89116 4.13574H8.27949C9.80539 4.13574 11.042 5.37234 11.042 6.89824C11.042 8.43232 9.79722 9.66783 8.27241 9.66783H5.77242L6.63639 10.5318C6.84386 10.7393 6.84386 11.0756 6.63639 11.2831C6.42893 11.4906 6.09256 11.4906 5.88509 11.2831L4.11426 9.51227C4.0417 9.43971 3.99452 9.35138 3.97271 9.25831C3.96352 9.21922 3.95866 9.17846 3.95866 9.13658C3.95866 9.05996 3.97488 8.98713 4.00407 8.92134C4.02519 8.87367 4.05366 8.82847 4.08949 8.78745C4.09828 8.77738 4.10745 8.76764 4.11697 8.75826L5.88509 6.99013C6.09256 6.78267 6.42893 6.78267 6.63639 6.99013Z" fill="#282C3F"></path><path fillRule="evenodd" clipRule="evenodd" d="M0.416992 7.50033C0.416992 3.58831 3.58831 0.416992 7.50033 0.416992C11.4123 0.416992 14.5837 3.58831 14.5837 7.50033C14.5837 11.4123 11.4123 14.5837 7.50033 14.5837C3.58831 14.5837 0.416992 11.4123 0.416992 7.50033ZM7.50033 1.47949C4.17511 1.47949 1.47949 4.17511 1.47949 7.50033C1.47949 10.8255 4.17511 13.5212 7.50033 13.5212C10.8255 13.5212 13.5212 10.8255 13.5212 7.50033C13.5212 4.17511 10.8255 1.47949 7.50033 1.47949Z" fill="#282C3F"></path></svg>

                            <span className='font-bold'>14 days</span> return available
                        </p>
                    </div>
                    <span className='absolute cursor-pointer top-3 right-3' onClick={() => deleteproduct(product._id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className="itemContainer-base-closeIcon"><path fill="#000" fillRule="evenodd" d="M9.031 8l6.756-6.756a.731.731 0 0 0 0-1.031.732.732 0 0 0-1.031 0L8 6.969 1.244.213a.732.732 0 0 0-1.031 0 .731.731 0 0 0 0 1.03L6.969 8 .213 14.756a.731.731 0 0 0 0 1.031.732.732 0 0 0 1.031 0L8 9.031l6.756 6.756a.732.732 0 0 0 1.031 0 .731.731 0 0 0 0-1.03L9.031 8z"></path></svg></span>
                </div>
            ))}
        </>
    )
}

export default ProductList
