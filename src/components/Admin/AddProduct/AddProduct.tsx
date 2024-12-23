"use client"

import {
    useForm
} from "react-hook-form"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Button
} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Input
} from "@/components/ui/input"
import { useState } from "react"
import { Textarea } from "../../ui/textarea"
import AddProductDetail from "./AddProductDetail"
import AddCoverImage from "./AddCoverImage"
import AddCoverProduct from "./AddCoverProduct"
import AddProductDetailImage from "./AddProductDetailImage"

const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string(),
    price: z.string(),
    category: z.string(),
    cardImage: z
        .instanceof(FileList)
        .refine((files) => files.length == 1, "Only one image is required")
        .transform((files) => Array.from(files)),
    images: z
        .instanceof(FileList)
        .refine((files) => files.length > 0 || files.length < 7, "Only one image is required")
        .transform((files) => Array.from(files)),
    materialAndCare: z.string(),
    ProductDetails: z.string(),
    sizeAndFit: z.string(),
    specifications: z.array(
        z.object({
            title: z.string().nonempty("Title is required"),
            about: z.string().nonempty("About is required"),
        })
    ),
});

export default function AddProduct() {

    const [specifications, setSpecifications] = useState<{ title: string; about: string }[]>([
        { title: "", about: "" },
    ]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            price: "",
            category: "men-t-shirts",
            materialAndCare: "",
            ProductDetails: "",
            sizeAndFit: "",
            specifications: [],
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {

        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("price", values.price);
        formData.append("category", values.category);

        const coverImageData = new FormData();

        values.cardImage.forEach((file) => {
            coverImageData.append("cardImage", file);
        });

        const ProductDetailsformdata = new FormData();

        ProductDetailsformdata.append("materialAndCare", values.materialAndCare)
        ProductDetailsformdata.append("ProductDetails", values.ProductDetails)
        ProductDetailsformdata.append("sizeAndFit", values.sizeAndFit)
        ProductDetailsformdata.append("specifications", JSON.stringify(specifications))

        const productImageData = new FormData();
        values.images.forEach((file) => {
            productImageData.append("images", file)
        })        

        const response = await fetch("http://localhost:3000/api/product/Product", {
            method: "POST",
            body: formData,
            credentials: 'include',
        });

        const responseData = await response.json()
        const productId = responseData.product._id

        if (response.ok && productId) {
            await fetch(`http://localhost:3000/api/Image/coverImage?id=${productId}`, {
                method: "POST",
                body: coverImageData,
                credentials: 'include',
            });

            await fetch(`http://localhost:3000/api/Image/productImage?id=${productId}`, {
                method: "POST",
                body: productImageData,
                credentials: 'include',
            });

            ProductDetailsformdata.append("ProductId", productId)

            await fetch("http://localhost:3000/api/productdetail/product", {
                method: "POST",
                body: ProductDetailsformdata,
                credentials: 'include',
            });

        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
                <AddCoverProduct form={form} />
                <AddCoverImage form={form}/>
                <AddProductDetail form={form}  specifications={specifications} setSpecifications={setSpecifications}/>
                <AddProductDetailImage form={form}/>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}