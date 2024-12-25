import Product from '@/components/Product/Product';
import { productType } from '@/utils/utils';
import React from 'react'

type URLSearchParams = {
  s: string;
}

async function page({ searchParams }: { searchParams: Promise<URLSearchParams> }) {

  const s = (await searchParams).s;

  const encodedS = encodeURIComponent(s);

  const data = await fetch(`http://localhost:3000/api/product/Product?s=${encodedS}`, {
    method: "GET",
    // cache:'force-cache',
    // next:{revalidate:3600}
  })

  const products = await data.json();


  return (
    <main className='flex gap-8 p-8 flex-wrap'>
      {products.map((product: productType) => (
        <Product product={product} key={product._id} />
      ))}
    </main>
  )
}

export default page