import { addressProp } from '@/utils/utils'
import React from 'react'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'
import { useMyContext } from '@/Context/context';
import { useToast } from '@/hooks/use-toast';

function DeleteAddress({ address, selected }: { address: addressProp, selected: string }) {

    const { user } = useMyContext();
    const { toast } = useToast();

    const handledelete = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/address?id=${address._id}&uid=${user?.id}`, {
                method: "DELETE",
                credentials: "include"
            })

            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Address deleted successfully"
                })
            } else {
                toast({
                    title: "Error",
                    description: "Error deleting address"
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {selected === address._id &&
                <Button variant="destructive" className='flex items-center' onClick={handledelete}>
                    Delete <span className='h-full flex items-center'><Trash2 /></span>
                </Button>}
        </>
    )
}

export default DeleteAddress
