import React from 'react'
import ConditionalOnNav from './ConditionalOnNav'

async function Header() {

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category/CreateCategory`, {
    // cache:'force-cache',
    // next:{revalidate:3600},

    method: 'GET',
})
const category = await response.json()

  
  return (
    <header>
      <ConditionalOnNav category={category} />
    </header>
  )
}

export default Header
