import Image from 'next/image';
import React, { useEffect, useState } from 'react'

function ImageData({ id, width, height }: { id: string, width: number, height: number }) {

    const [image, setImage] = useState<string | null>(null)

    useEffect(() => {
        async function getImagefromId(id: string) {
            try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Image/coverImage?id=${id}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const coverImage = data.image.CardImage;
            const base64Image = `data:${coverImage.contentType};base64,${coverImage.data}`;

            setImage(base64Image);
            } catch (error) {
            console.error('Error fetching image:', error);
            setImage(null);
            }
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
