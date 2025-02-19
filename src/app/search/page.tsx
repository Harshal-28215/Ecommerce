import SearchedProduct from '@/components/search/SearchedProduct'
import React from 'react'

async function page({searchParams}:{searchParams:Promise<{search:string}>}) {
    const {search} = await searchParams
    
  return (
    <>
        <SearchedProduct search={search}/>
    </>
  )
}

export default page
