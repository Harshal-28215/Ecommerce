import CategoryName from '@/components/Navbar/category/CategoryName';
import React from 'react'

type URLSearchParams = {
  id: string;
}

async function page({searchParams}:{searchParams:URLSearchParams}) {

  const {id} = await searchParams;

  async function fetchCategory(){
    const category = await fetch(`http://localhost:3000/api/category/CreateCategory?id=${id}`, {
      cache:'force-cache',
      next:{revalidate:3600},
      
        method: 'GET',
    })
    
    return category.json();
}


const category = await fetchCategory();

  return (
    <main>
      <CategoryName category={category}/>
    </main>
  )
}

export default page
