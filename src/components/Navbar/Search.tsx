import React from 'react'
import { Input } from "@/components/ui/input";
import { redirect } from 'next/navigation';
import { Button } from '../ui/button';


function Search({ width }: { width: string }) {

  const [search, setSearch] = React.useState('')
  

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearch("")
    redirect(`/search?search=${search}`)
  }

  return (
    <>
        <form onSubmit={handlesubmit} className={`flex gap-4 transition-all px-3`} style={{width:width}}>
          <Input type="text" placeholder="Search" className='w-[100%]' value={search} onChange={handlechange} />
          <Button type="submit" className='bg-white text-black hover:bg-black/5'>Search</Button>
        </form>
    </>
  )
}

export default Search
