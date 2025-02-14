import React from 'react'
import AccountButton from './AccountButton';
import CartButton from './cart/CartButton';
import Link from 'next/link';
import Search from './Search';

function Navbar() {

  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <>
      {screenWidth < 769 ? 
      <nav className='flex flex-col py-5 items-center gap-4 relative'>
        <div className='flex justify-between w-full px-3'>
          <Link href="/">E-commerce</Link>


          <div className='space-x-5 flex items-center justify-center'>
            <CartButton />
            <AccountButton />
          </div>
        </div>
        <Search width={'100%'}/>
      </nav>
        : <nav className='flex justify-evenly py-5 items-center'>
          <Link href="/">E-commerce</Link>

          <Search width={'40%'}/>

          <div className='space-x-5 flex items-center justify-center'>
            <CartButton />
            <AccountButton />
          </div>
        </nav>
      }
    </>
  )
}

export default Navbar
