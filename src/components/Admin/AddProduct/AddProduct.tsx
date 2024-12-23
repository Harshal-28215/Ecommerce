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
    Form
} from "@/components/ui/form"
import { useState } from "react"
import AddProductDetail from "./AddProductDetail"
import AddCoverImage from "./AddCoverImage"
import AddCoverProduct from "./AddCoverProduct"
import AddProductDetailImage from "./AddProductDetailImage"
import useSubmit from "@/utils/hooks/useSubmit"

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

    const { isSubmitting, handlesubmit } = useSubmit()

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handlesubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
                <AddCoverProduct form={form} />
                <AddCoverImage form={form} />
                <AddProductDetail form={form} specifications={specifications} setSpecifications={setSpecifications} />
                <AddProductDetailImage form={form} />
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Loading..." : "Submit"}</Button>
            </form>
        </Form>
    )
}