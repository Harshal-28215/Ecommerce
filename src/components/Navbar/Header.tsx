import React from 'react'
import ConditionalOnNav from './ConditionalOnNav'

async function Header() {

  const response = await fetch('http://localhost:3000/api/category/CreateCategory', {
    cache:'force-cache',
    next:{revalidate:3600},

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
