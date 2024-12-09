import React from 'react'
import AccountButton from './AccountButton';
import CartButton from './cart/CartButton';
import Link from 'next/link';
import Search from './Search';

function Navbar() {
  return (
    <nav className='flex justify-evenly py-5 items-center'>
        <Link href="/">E-commerce</Link>

        <Search />
        
        <div className='space-x-5'>
            <CartButton />
            <AccountButton />
        </div>
    </nav>
  )
}

export default Navbar
