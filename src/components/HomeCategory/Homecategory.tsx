import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Homecategory() {

    const categorydata = [
        {
            image: "/home/activewear-men.jpg",
            name: "Men's Activewear",
            path: "men-sports-&-active-wear"
        },
        {
            image: "/home/activewear-women.jpg",
            name: "Women's Activewear",
            path: "women-activewear"
        },
        {
            image: "/home/casual-men.jpg",
            name: "Men's Casual",
            path: "men-casual"
        },
        {
            image: "/home/casual-women.jpg",
            name: "Women's Activewear",
            path: "men-sports-&-active-wear"
        },
        {
            image: "/home/ethic.jpg",
            name: "Women's Ethicwear",
            path: "women-ethicwear"
        },
        {
            image: "/home/ethicwear.jpg",
            name: "Men's Ethicwear",
            path: "men-ethicwear"
        },
        {
            image: "/home/kidswear.jpg",
            name: "Kids",
            path: "t-shirt"
        },
        {
            image: "/home/loungewear.jpg",
            name: "Loungewear",
            path: "women-loungwear"
        },
        {
            image: "/home/plussize.jpg",
            name: "Plus Size",
            path: "women-plussize"
        },
        {
            image: "/home/sportwear.jpg",
            name: "Sport wear",
            path: "men-sports-&-active-wear"
        },
        {
            image: "/home/westernwear-women.jpg",
            name: "Women's Westernwear",
            path: "women-westternwear"
        },
        {
            image: "/home/workwear.jpg",
            name: "Workwear",
            path: "men-workwear"
        },
    ]

    return (
        <section className='flex md:w-[80vw] w-[95vw] mx-auto flex-col items-center justify-center my-10'>
            <h1 className='text-3xl font-bold py-10'>Shop By Category</h1>
            <div className='flex flex-wrap justify-center'>
                {categorydata.map((category, index) => (
                    <Link href={`/category/${encodeURIComponent(category.path)}?s=${encodeURIComponent(category.path)}`} key={index}>
                        <div className='w-[170px] h-auto flex flex-col items-center box-border p-2 m-2 bg-[#00000013] shadow-md rounded-md group'>
                            <div className='h-[200px] w-[150px] relative overflow-hidden rounded-sm'>
                                <Image className='w-full h-full object-cover rounded-sm group-hover:scale-105 transition-all' src={category.image} alt="Home category" height={500} width={500} />
                            </div>
                            <p className='font-bold text-sm text-center'>{category.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default Homecategory
