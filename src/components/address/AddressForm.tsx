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
    FormMessage,
} from "@/components/ui/form"
import {
    Input
} from "@/components/ui/input"
import { useState } from "react"

import { useToast } from "@/hooks/use-toast"
import { useMyContext } from "@/Context/context"
import { addressProp } from "@/utils/utils"

const formSchema = z.object({
    name: z.string().nonempty("Name is required"),
    mobile: z.string().nonempty("Mobile is required"),
    pincode: z.string().nonempty("Pincode is required"),
    address: z.string().nonempty("Address is required"),
    town: z.string().nonempty("Town is required"),
    city: z.string().nonempty("City is required"),
    state: z.string().nonempty("State is required"),
});

export default function AddAddressForm({ address,edit,setActive }: { address?: addressProp, edit?: boolean,setActive:React.Dispatch<React.SetStateAction<boolean>> }) {
    const { toast } = useToast()
    const { user } = useMyContext();
    const [isloading, setIsloading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: edit ? address?.name : "",
            mobile: edit ? address?.mobile.toString() : "",
            pincode: edit ? address?.pincode.toString() : "",
            address: edit ? address?.address : "",
            town: edit ? address?.town : "",
            city: edit ? address?.city : "",
            state: edit ? address?.state : "",
        }
    })

    const url = address && edit ? `${process.env.NEXT_PUBLIC_API_URL}/api/user/address?id=${address?._id}&uid=${user?.id}` : `${process.env.NEXT_PUBLIC_API_URL}/api/user/address`

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsloading(true);
        try {
            const response = await fetch(url, {
                method: address?"PUT":"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
                credentials: "include",
            });

            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Address added successfully",
                })
                form.reset();
                window.location.reload();
            } else {
                const data = await response.json();
                toast(data.message)
            }

        } catch (error) {
            toast({
                title: "Error",
                description: "Error adding address",
            })
            console.log(error);
            
        } finally {
            setIsloading(false);
        }
    }

    return (
        <div className={`fixed w-[100vw] h-[100vh] top-0 left-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto py-10 w-[400px] bg-white rounded-lg shadow-lg p-8 relative">
                    <div className="absolute top-4 left-0 px-5 w-full flex justify-between items-center border-b border-black/10 pb-4">
                        <h1>Add New Address</h1>
                        <div className="w-[30px] h-[30px] flex justify-center items-center relative cursor-pointer" onClick={()=>setActive(false)}><span className="cross"></span>
                        </div>
                    </div>
                    <div className="space-y-3 mt-10">
                        <h1>Contect Details</h1>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
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
                            name="mobile"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Mobile No."

                                            type="number"
                                            {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <h1>Address</h1>
                        <FormField
                            control={form.control}
                            name="pincode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Pincode"

                                            type="number"
                                            {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Address (House no, street, landmark)"

                                            type="text"
                                            {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="town"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Locality/Town"

                                            type="text"
                                            {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-3">
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="City/District"

                                                type="text"
                                                {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="State"

                                                type="text"
                                                {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" disabled={isloading}>{isloading ? "loading..." : "Submit"}</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}