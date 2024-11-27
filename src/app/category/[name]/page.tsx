import React from 'react'

type URLSearchParams = {
  s: string;
}

async function page({searchParams}:{searchParams:URLSearchParams}) {

  const { s } = await searchParams;

  

  return (
    <main>
      {s}
    </main>
  )
}

export default page
export const dynamic = "force-dynamic"; 
