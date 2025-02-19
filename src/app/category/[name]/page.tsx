import Product from '@/components/Product/Product';
import { productType } from '@/utils/utils';
import React from 'react'

type URLSearchParams = {
  s: string;
}

async function page({ searchParams }: { searchParams: Promise<URLSearchParams> }) {

  const s = (await searchParams).s;

  const encodedS = encodeURIComponent(s);


  let products = [];
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/Product?s=${encodedS}`, {
      method: "GET",
    });

    if (!data.ok) {
      throw new Error('Network response was not ok');
    }

    products = await data.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }


  return (
    <main className='flex md:gap-8 md:p-8 gap-2 p-[10px] flex-wrap'>
      {products.map((product: productType) => (
        <Product product={product} key={product._id} />
      ))}
    </main>
  )
}

export default page