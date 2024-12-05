import React from 'react'
import NavigationMenuDemo from './NavigationMenu';
import { categoryType } from '@/lib/utils';

function Category({ category }: { category: categoryType[] }) {
    return (
        <section className='w-[100vw] flex justify-center items-center h-10 gap-16'>
            <NavigationMenuDemo category={category} />
        </section>
    )
}

export default Category
