import React from 'react'
import NavigationMenuDemo from './NavigationMenu';

async function Category() {

    async function fetchCategory(){
        const category = await fetch('http://localhost:3000/api/category/CreateCategory', {
            // cache:'force-cache',
            // next:{revalidate:3600},

            method: 'GET',
        })
        
        return category.json();
    }
    const category = await fetchCategory();
    

    return (
        <section className='w-[100vw] flex justify-center items-center h-10 gap-16'>
         <NavigationMenuDemo category={category}/>
        </section>
    )
}

export default Category
