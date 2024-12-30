import React from 'react'

type addressProp = {
    _id: string,
    name: string,
    mobile: number,
    pincode: number,
    address: string,
    town: string,
    city: string,
    state:string,
    default: boolean,
    userId: string
};

function AllAddress({ address }:{address:addressProp}) {
    console.log(address);
    
    return (
        <div className='w-full border border-black/10 p-3 rounded-md mb-3 flex gap-2'>
            <div>
                <input type="radio" />
            </div>
            <div>
                <h1>{address.name}</h1>
                <p>{address.address}</p>
                <p>{address.city},{address.state}</p>
                <p>Mobile:{address.mobile}</p>
            </div>
        </div>
    )
}

export default AllAddress
