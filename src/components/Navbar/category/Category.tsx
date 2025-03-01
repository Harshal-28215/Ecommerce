import React from 'react'
import NavigationMenuDemo from './NavigationMenu';
import { categoryType } from '@/utils/utils';

function Category({ category }: { category: categoryType[] }) {
    return (
        <section className='w-[100%] flex justify-center items-center h-10 gap-16'>
            <NavigationMenuDemo category={category} />
        </section>
    )
}

export default Category
