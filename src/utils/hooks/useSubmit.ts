import { useState } from "react";


export default function useSubmit({selectedItem}:{selectedItem:string}) {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlesubmit = async (values: any) => {

        setIsSubmitting(true);

        try {
            const response = await fetch("http://localhost:3000/api/product/Product", {
                method: "POST",
                body: createformData(values),
                credentials: 'include',
            });

            if (!response.ok) throw new Error("Product creation failed");

            const { product } = await response.json();
            const productId = product._id;

            await Promise.all([
                uploadImages(`/api/Image/coverImage?id=${productId}`, values.cardImage),
                uploadImages(`/api/Image/productImage?id=${productId}`, values.images),
                submitProductDetails(productId, values),
            ]);

            return "Seccess"
        } catch (error) {
            console.error(error);
            return "Failed"
        }finally{
            setIsSubmitting(false)
        }
    }

    function createformData(values:any) {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
            if (key === "cardImage" || key === "images") return; // Handle separately
            formData.append(key, values[key]);
        });
        formData.append("category", selectedItem);
        return formData;
    }

    async function uploadImages(url: string, files: File[]) {
        const formData = new FormData();
        files.forEach((file) => formData.append("images", file));
        await fetch(url, { method: "POST", body: formData, credentials: "include" });
    }

    async function submitProductDetails(productId: string, values: any) {
        const detailData = new FormData();
        detailData.append("ProductId", productId);
        detailData.append("materialAndCare", values.materialAndCare);
        detailData.append("ProductDetails", values.ProductDetails);
        detailData.append("sizeAndFit", values.sizeAndFit);
        detailData.append(
            "specifications",
            JSON.stringify(values.specifications)
        );
        await fetch("/api/productdetail/product", {
            method: "POST",
            body: detailData,
            credentials: "include",
        });
    }

    return {isSubmitting,handlesubmit}
}