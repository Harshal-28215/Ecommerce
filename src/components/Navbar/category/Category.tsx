import React from 'react'
import Link from 'next/link'

function Category() {

    const category = [
        { name: 'Men' },
        { name: 'Women' },
        { name: 'Kids' },
        { name: 'Upper' },
        { name: 'Bottom' },
        { name: 'Middle' },
    ]

    return (
        <section className='w-[100vw] flex justify-center items-center h-10 gap-16'>
         {category.map((category) => (
            <Link href='/category' key={category.name}>{category.name}</Link>
         ))}
        </section>
    )
}

export default Category
