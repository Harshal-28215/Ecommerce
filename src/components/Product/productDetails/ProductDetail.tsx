import { NotepadTextIcon } from 'lucide-react'
import React from 'react'

function ProductDetail({ProductDetails}:{ProductDetails:string}) {
    return (
        <div>
            <h1 className='flex gap-2 text-xl font-bold my-3'>Product Details <NotepadTextIcon /></h1>

            {ProductDetails.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>
            ))}
        </div>
    )
}

export default ProductDetail
