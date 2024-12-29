"use client"

import React, { useState } from 'react'
import { Button } from '../ui/button'
import AddAddressForm from './AddressForm'

function Address() {
    const [address, setAddress] = useState(false)
  return (
    <div className='flex justify-between w-[40%] items-center my-5'>
      <h1>Select Delivery Address</h1>
      <Button variant="outline" onClick={()=>setAddress(!address)}>Add Address</Button>
      <AddAddressForm address={address} setAddress={setAddress}/>
    </div>
  )
}

export default Address
