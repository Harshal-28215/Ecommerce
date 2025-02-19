"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import AddAddressForm from './AddressForm'
import AllAddress from './AllAddress'

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
        async function getaddress() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/address`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: "include",
                })
                const data = await response.json()
                setAddress(data.address)
            } catch (error) {
                console.log(error);

            }
        }
        getaddress()

    }, [])
    return (
        <div className='md:w-[40%] w-[100%] md:border-r md:border-black/20 p-5'>
            <div className='w-full flex justify-between items-center pb-4 mb-4'>
                <h1 className='font-bold'>Select Delivery Address</h1>
                <Button variant="outline" onClick={() => setActive(!active)}>Add Address</Button>
                {active && <AddAddressForm address={undefined} edit={false} setActive={setActive} />}
            </div>
            <div>
                <h1>Address</h1>
                {address.map(address => <AllAddress address={address} key={address._id} />)}
            </div>
        </div>
    )
}

export default Address
