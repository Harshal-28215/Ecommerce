import React from 'react'

type searchParams = {
        amount:number
}

async function page({searchParams}: {searchParams:Promise<searchParams>}) {
    const {amount} = await searchParams;    
  return (
    <div className='flex justify-center items-center h-[80vh]'>
      <h1>Your payment of {amount} is Success full</h1>
    </div>
  )
}

export default page
