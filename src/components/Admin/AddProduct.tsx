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
import { Textarea } from "../ui/textarea"

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

    const addRow = () => {
        setSpecifications([...specifications, { title: "", about: "" }]);
    };

    const removeRow = (index: number) => {
        const updated = [...specifications];
        updated.splice(index, 1);
        setSpecifications(updated);
    };

    const updateRow = (index: number, field: 'title' | 'about', value: string) => {
        const updated = [...specifications];
        updated[index][field] = value;
        setSpecifications(updated);
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {

        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("price", values.price);
        formData.append("category", values.category);

        values.cardImage.forEach((file) => {
            formData.append("cardImage", file);
        });

        console.log(formData);
        

        const ProductDetailsformdata = new FormData();
        
        values.images.forEach((file) => {
            ProductDetailsformdata.append("images",file)
        })

        ProductDetailsformdata.append("materialAndCare",values.materialAndCare)
        ProductDetailsformdata.append("ProductDetails",values.ProductDetails)
        ProductDetailsformdata.append("sizeAndFit",values.sizeAndFit)
        ProductDetailsformdata.append("specifications", JSON.stringify(specifications))        

        const response = await fetch("http://localhost:3000/api/product/Product", {
            method: "POST",
            body: formData,
            credentials: 'include',
        });

        const responseData = await response.json()
        const productId = responseData.product._id
        

        if (response.ok && productId) {
            ProductDetailsformdata.append("ProductId",productId)

            const response = await fetch("http://localhost:3000/api/productdetail/product", {
                method: "POST",
                body: ProductDetailsformdata,
                credentials: 'include',
            });

            console.log(response);
        }
        

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Name"

                                    type="text"
                                    {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Description"

                                    type="text"
                                    {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="price"

                                    type="number"
                                    {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="cardImage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Card Image</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Card Image"
                                    type="file"
                                    onChange={(e) => {
                                        field.onChange(e.target.files);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="category"
                                    type="text"
                                    {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* product detail data */}
                <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Images</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Product Image"
                                    type="file"
                                    multiple
                                    onChange={(e) => {
                                        field.onChange(e.target.files);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="sizeAndFit"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Size & Fit</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Size & Fit"
                                    type="text"
                                    {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="ProductDetails"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Details</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Product Details"
                                    {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="materialAndCare"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Material & Care</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Material & Care"
                                    {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="specifications"
                    render={() => (
                        <FormItem>
                            <FormLabel>Specifications</FormLabel>
                            <div>
                                {specifications.map((row, index) => (
                                    <div key={index} className="flex items-center gap-4 mb-2">
                                        <Input
                                            placeholder="Title"
                                            value={row.title}
                                            onChange={(e) => updateRow(index, "title", e.target.value)}
                                        />
                                        <Input
                                            placeholder="About"
                                            value={row.about}
                                            onChange={(e) => updateRow(index, "about", e.target.value)}
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            onClick={() => removeRow(index)}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                                <Button type="button" onClick={addRow}>
                                    Add Specification
                                </Button>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}