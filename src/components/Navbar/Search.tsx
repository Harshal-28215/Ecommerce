import React from 'react'
import { Input } from "@/components/ui/input";
import { redirect } from 'next/navigation';

function Search() {

  const [search, setSearch] = React.useState('')

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    redirect(`/search?search=${search}`)
  }

  return (
    <form onSubmit={handlesubmit} className='w-[40%]'>
      <Input type="text" placeholder="Search" className='w-[100%]' value={search} onChange={onchange} />
    </form>
  )
}

export default Search
