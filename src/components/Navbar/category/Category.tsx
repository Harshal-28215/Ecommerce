import React from 'react'
import Link from 'next/link'

type CategoryType = {
    _id: string;
    name: string;
    parent: string | null;
    subcategories?: CategoryType[];
}

async function Category() {

    async function fetchCategory(){
        const category = await fetch('http://localhost:3000/api/category/CreateCategory', {
            method: 'GET',
        })
        
        return category.json();
    }
    const category = await fetchCategory();
    

    return (
        <section className='w-[100vw] flex justify-center items-center h-10 gap-16'>
         {category.map((category: CategoryType) => (
            <Link href={{pathname:`/category/${category.name}`, query:{id:category._id}}} key={category._id}>{category.name}</Link>
         ))}
        </section>
    )
}

export default Category
