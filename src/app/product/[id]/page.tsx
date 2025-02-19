import DetailSide from "@/components/Product/productDetails/DetailSide"
import ImageSide from "@/components/Product/productDetails/ImageSide"

async function page({ params }: { params: Promise<{ id: string }> }) {

    const productId = (await params).id;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/productdetail/product?id=${productId}`, {
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
        <div className="p-4 flex gap-4 md:flex-row flex-col">
            <ImageSide id={productId} />
            <DetailSide DeatailSideData={DeatailSideData} />
        </div>
    )
}

export default page
