import React from 'react'
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

import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
    name: z.string(),
    slug: z.string(),
});

type editFormProps = {
    categoryname: string
    categoryslug: string
    categoryid: string
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
}

function EditForm({ categoryname, categoryslug, categoryid, setIsEdit }: editFormProps) {
    const { toast } = useToast()
    const [isloading, setIsloading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: categoryname,
            slug: categoryslug,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {


        const data = {
            name: values.name,
            slug: values.slug,
        }

        // console.log(data);
        
        try {
            setIsloading(true);
            const response = await fetch(`http://localhost:3000/api/category/CreateCategory?id=${categoryid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });
            const user = await response.json()
            console.log(user);


            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Login Successfully",
                })
            }

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Some Error Accured During Login",
            })
        } finally {
            setIsloading(false)
        }

    }
    return (
        <main className={`fixed top-0 left-0 w-full h-full justify-center items-center bg-black bg-opacity-50 flex`}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto py-10 w-[400px] bg-white rounded-lg shadow-lg p-8 relative space-y-2">
                    <div className="w-[30px] h-[30px] flex justify-center items-center cursor-pointer absolute top-2 right-2" onClick={() => setIsEdit(false)}><span className="cross"></span>
                    </div>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category Name</FormLabel>
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
                        name="slug"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category Slug</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Slug"

                                        type="text"
                                        {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={isloading}>{isloading ? "loading..." : "Submit"}</Button>
                </form>
            </Form>
        </main>
    )
}

export default EditForm
