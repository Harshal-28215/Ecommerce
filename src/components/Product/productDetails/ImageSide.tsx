import Image from 'next/image'
import React from 'react'

async function ImageSide({ id }: { id: string }) {

const response = await fetch(`http://localhost:3000/api/Image/productImage?id=${id}`,{
    method:"GET"
}).then(data => data.json())

const ImageData = response.image.DetailImage

    return (
        <aside className="md:w-[50%] w-full h-fit grid grid-cols-2 grid-flow-row gap-4">

            {ImageData?.map((image:{data:string,contentType:string,_id:string}) => {

                const base64Image = `data:${image.contentType};base64,${image.data}`;

                return (
                    <div className="w-[100%] md:h-[500px] h-[300px]" key={image._id}>
                        <Image className="w-full h-full object-cover" src={base64Image} width={700} height={500} alt="productimage" />
                    </div>
                )
            })}

        </aside>
    )
}

export default ImageSide
