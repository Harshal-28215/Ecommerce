"use client"

import React from 'react'
import Navbar from './Navbar'
import Category from './category/Category'
import { usePathname } from 'next/navigation'
import { categoryType } from '@/lib/utils'

function ConditionalOnNav({ category }: { category: categoryType[] }) {

    const pathname = usePathname();

    const noHeaderRoutes = ["/login", "/signup"];
    const iscontained = pathname ? !noHeaderRoutes.includes(pathname) : false;


    return (
        <>
            {iscontained &&
                <>
                    <Navbar />
                    <Category category={category} />
                </>
            }
        </>
    )
}

export default ConditionalOnNav
