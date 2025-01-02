import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Edit } from 'lucide-react'
import { addressProp } from '@/utils/utils'
import AddAddressForm from './AddressForm'

function EditAddress({ address, selected }: { address: addressProp, selected: string }) {
    const [active, setActive] = useState(false);
    return (
        <>
            {selected === address._id &&
                <Button variant='outline' className='flex items-center' onClick={() => setActive(true)}>
                    Edit <span className='h-full flex items-center'><Edit /></span>
                </Button>
            }
            {active && <AddAddressForm address={address} edit={true} setActive={setActive} />}
        </>
    )
}

export default EditAddress
