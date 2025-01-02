"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import AddAddressForm from './AddressForm'
import AllAddress from './AllAddress'
import { useMyContext } from '@/Context/context'

type addressProp = {
    _id: string,
    name: string,
    mobile: number,
    pincode: number,
    address: string,
    town: string,
    city: string,
    state: string,
    default: boolean,
    userId: string
};

function Address() {
    const [address, setAddress] = useState<addressProp[]>([])
    const [active, setActive] = useState(false)

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
        <div className='w-[40%] border-r border-black/20 p-5'>
            <div className='w-full flex justify-between items-center pb-4 mb-4'>
                <h1 className='font-bold'>Select Delivery Address</h1>
                <Button variant="outline" onClick={() => setActive(!active)}>Add Address</Button>
                {active && <AddAddressForm address={undefined} edit={false} setActive={setActive}/>}
            </div>
            <div>
                <h1>Address</h1>
                {address.map(address => <AllAddress address={address} key={address._id} />)}
            </div>
        </div>
    )
}

export default Address
