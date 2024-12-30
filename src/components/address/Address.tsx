"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import AddAddressForm from './AddressForm'
import AllAddress from './AllAddress'

function Address() {
    const [active, setActive] = useState(false)
    const [address, setAddress] = useState([])

    useEffect(() => {
        async function getaddress(){
            const response = await fetch(`http://localhost:3000/api/user/address`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
            })
            const data = await response.json()
            setAddress(data.address)
        }
        getaddress()
        
    },[])
    return (
        <div className='w-[40%]'>
            <div className='w-full flex justify-between items-center'>
                <h1>Select Delivery Address</h1>
                <Button variant="outline" onClick={() => setActive(!active)}>Add Address</Button>
                <AddAddressForm address={active} setAddress={setActive} />
            </div>
            <div>
                <h1>Address</h1>
                {address.map(address => <AllAddress address={address} key={address._id}/>)}
            </div>
        </div>
    )
}

export default Address
