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
    <main className='flex gap-8 p-8'>
      {products.map((product: productType) => (
        <Product forKey={product.id} product={product} />
      ))}
    </main>
  )
}

export default page

export const dynamic = "force-dynamic"; 
