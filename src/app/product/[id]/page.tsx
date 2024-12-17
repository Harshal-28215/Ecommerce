import DetailSide from "@/components/Product/productDetails/DetailSide"
import ImageSide from "@/components/Product/productDetails/ImageSide"

async function page({ params }: { params: { id: string } }) {

    const { id } = await params

    const response = await fetch(`http://localhost:3000/api/productdetail/product?id=${id}`, {
        method: "GET",
        headers: {
            'Content-Type': "application/json"
        },
        credentials: 'include',
    })

    const data = await response.json()

    const { _id, ProductDetails, sizeAndFit, materialAndCare, ProductId, specifications } = data[0];

    const DeatailSideData = {
        _id,
        ProductDetails,
        sizeAndFit,
        materialAndCare,
        ProductId,
        specifications
    }


    return (
        <div className="p-4 flex gap-4">
            <ImageSide ImageData={data[0].images} />
            <DetailSide DeatailSideData={DeatailSideData}/>
        </div>
    )
}

export default page
