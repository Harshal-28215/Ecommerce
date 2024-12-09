import Image from 'next/image';
import React from 'react'

function ImageData({ image }:{image:{contentType:string, data:string}}) {
    const base64Image = `data:${image.contentType};base64,${image.data}`;

    return (
            <Image src={base64Image} alt="Product Image" width={50} height={50} className="w-[40px] h-[40px] object-cover" />
    )
}

export default ImageData
