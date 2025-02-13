import Image from 'next/image'
import React from 'react'

function Homecategory() {

    const categorydata = [
        {
            image: "/home/activewear-men.jpg",
            name: "Men's Activewear"
        },
        {
            image: "/home/activewear-women.jpg",
            name: "Women's Activewear"
        },
        {
            image: "/home/casual-men.jpg",
            name: "Men's Casual"
        },
        {
            image: "/home/casual-women.jpg",
            name: "Women's Activewear"
        },
        {
            image: "/home/ethic.jpg",
            name: "Women's Ethicwear"
        },
        {
            image: "/home/ethicwear.jpg",
            name: "Men's Ethicwear"
        },
        {
            image: "/home/kidswear.jpg",
            name: "Kids"
        },
        {
            image: "/home/loungewear.jpg",
            name: "Loungewear"
        },
        {
            image: "/home/plussize.jpg",
            name: "Plus Size"
        },
        {
            image: "/home/sportwear.jpg",
            name: "Sport wear"
        },
        {
            image: "/home/westernwear-women.jpg",
            name: "Women's Westernwear"
        },
        {
            image: "/home/workwear.jpg",
            name: "Workwear"
        },
    ]

    return (
        <section className='flex w-[80vw] mx-auto flex-col items-center justify-center my-10'>
            <h1 className='text-3xl font-bold py-10'>Shop By Category</h1>
            <div className='flex flex-wrap justify-center'>
                {categorydata.map((category, index) => (
                    <div key={index} className='w-[170px] h-auto flex flex-col items-center box-border p-2 m-2 bg-[#00000013] shadow-md rounded-md group'>
                        <div className='h-[200px] w-[150px] relative overflow-hidden rounded-sm'>
                            <Image className='w-full h-full object-cover rounded-sm group-hover:scale-105 transition-all' src={category.image} alt="Home category" height={500} width={500} />
                        </div>
                        <p className='font-bold text-sm text-center'>{category.name}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Homecategory
