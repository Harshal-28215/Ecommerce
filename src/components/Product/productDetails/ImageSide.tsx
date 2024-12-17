import Image from 'next/image'
import React from 'react'

type ImageDataProps = {
    data: string[],
    contentType: string
}[]

function ImageSide({ ImageData }: { ImageData: ImageDataProps }) {
    return (
        <aside className="w-[50%] h-fit grid grid-cols-2 grid-flow-row gap-4">

            {ImageData.map(image => {

                const base64Image = `data:${image.contentType};base64,${image.data}`;

                return (
                    <div className="w-[100%] h-[500px]">
                        <Image className="w-[100%] h-[100%] object-cover" src={base64Image} width={700} height={500} alt="productimage" />
                    </div>
                )
            })}

        </aside>
    )
}

export default ImageSide
