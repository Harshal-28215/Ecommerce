import Image from 'next/image';
import React, { useEffect, useState } from 'react'

function ImageData({ id, width, height }: { id: string, width: number, height: number }) {

    const [image, setImage] = useState<string | null>(null)

    useEffect(() => {
        async function getImagefromId(id: string) {

            const response = await fetch(`http://localhost:3000/api/Image/coverImage?id=${id}`, {
                method: "GET",
            })
                .then(data => data.json())

            const coverImage = await response.image.CardImage;
            const base64Image = `data:${coverImage.contentType};base64,${coverImage.data}`;

            setImage(base64Image)
        }

        getImagefromId(id)
    }, [id])


    return (
        <>
            {image && <Image src={image} alt="Product Image" width={width} height={height} className="object-cover" style={{ width: width, height: height }} />}
        </>
    )
}

export default ImageData
