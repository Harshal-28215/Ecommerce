import Link from 'next/link';
import React from 'react'

type CategoryType = {
    _id: string;
    name: string;
    parent: string | null;
}

function CategoryName({category}:{category:CategoryType[]}) {

  return (
    <div>
      {category.map((category) => (
        <Link href={{pathname:`/category/${category.name}`, query:{id:category._id}}} key={category._id}>{category.name}</Link>
      ))}
    </div>
  )
}

export default CategoryName
