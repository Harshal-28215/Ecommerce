import { useMyContext } from '@/Context/context';
import React from 'react'
import EditAddress from './EditAddress';
import { addressProp } from '@/utils/utils';
import DeleteAddress from './DeleteAddress';



function AllAddress({ address }: { address: addressProp }) {

    const { selected, setSelected } = useMyContext()

    return (
        <div className='w-full border border-black/10 p-3 rounded-md mb-3 cursor-pointer' onClick={() => setSelected(address._id)}>
            <div className='flex gap-2'>
                <div>
                    <input type="radio" onChange={() => setSelected(address._id)} checked={selected === address._id} />
                </div>
                <div className='text-sm'>
                    <h1 className='font-bold my-1'>{address.name}</h1>
                    <p>{address.address}</p>
                    <p>{address.city},{address.state}</p>
                    <p className='my-1'>Mobile:{address.mobile}</p>
                </div>
            </div>

            <div className='flex gap-2 mt-2'>
                <EditAddress address={address} selected={selected}/>
                <DeleteAddress address={address} selected={selected}/>
            </div>
        </div>
    )
}

export default AllAddress
