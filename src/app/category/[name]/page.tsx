import Product from '@/components/Product/Product';
import { productType } from '@/lib/utils';
import React from 'react'

type URLSearchParams = {
  s: string;
}

async function page({ searchParams }: { searchParams: Promise<URLSearchParams> }) {

  const s = (await searchParams).s;

  const data = await fetch(`http://localhost:3000/api/product/Product?s=${s}`)

  const products = await data.json();
  

  return (
    <main className='flex gap-8 p-8 flex-wrap'>
      {products.map((product: productType) => (
        <Product product={product} key={product._id}/>
      ))}
    </main>
  )
}

export default page

export const dynamic = "force-dynamic"; 
