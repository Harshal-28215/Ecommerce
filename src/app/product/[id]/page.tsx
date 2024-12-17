import DetailSide from "@/components/Product/productDetails/DetailSide"
import ImageSide from "@/components/Product/productDetails/ImageSide"

function page() {

    return (
        <div className="p-4 flex gap-4">

            <ImageSide />
            <DetailSide />
        </div>
    )
}

export default page
