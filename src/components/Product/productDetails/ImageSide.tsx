import Image from 'next/image'
import React from 'react'

function ImageSide() {
    return (
        <aside className="w-[50%] grid grid-cols-2 grid-flow-row gap-4">
            <div className="w-[100%] h-[500px]">
                <Image className="w-[100%] h-[100%] object-cover" src='/temp.webp' width={700} height={500} alt="productimage" />
            </div>
            <div className="w-[100%] h-[500px]">
                <Image className="w-[100%] h-[100%] object-cover" src='/download.jpeg' width={700} height={500} alt="productimage" />
            </div>
            <div className="w-[100%] h-[500px]">
                <Image className="w-[100%] h-[100%] object-cover" src='/temp.webp' width={700} height={500} alt="productimage" />
            </div>
            <div className="w-[100%] h-[500px]">
                <Image className="w-[100%] h-[100%] object-cover" src='/temp.webp' width={700} height={500} alt="productimage" />
            </div>
            <div className="w-[100%] h-[500px]">
                <Image className="w-[100%] h-[100%] object-cover" src='/temp.webp' width={700} height={500} alt="productimage" />
            </div>
            <div className="w-[100%] h-[500px]">
                <Image className="w-[100%] h-[100%] object-cover" src='/temp.webp' width={700} height={500} alt="productimage" />
            </div>
        </aside>
    )
}

export default ImageSide
