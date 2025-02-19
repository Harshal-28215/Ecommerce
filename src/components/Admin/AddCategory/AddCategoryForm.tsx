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
import { useMyContext } from "@/Context/context"
import { useState } from "react"

import { useToast } from "@/hooks/use-toast"
import SelectCategory from "../AddProduct/SelectCategory"

const formSchema = z.object({
  category: z.string(),
});

export default function AddCategoryForm() {
  const { toast } = useToast()
  const [isloading, setIsloading] = useState(false);
  const [selectedItemId,setSelectedItemId] = useState<string>("");
  const { setUser } = useMyContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {


    const data = {
      name: values.category,
      parentId: selectedItemId === "" ? null : selectedItemId,
    }

    try {
      setIsloading(true);
      const response = await fetch("/api/category/CreateCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      const user = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: "Category added",
        })
      }
      setUser(user.userObj);

    } catch (error) {
      toast({
        variant:"destructive",
        title: "Error",
        description: "Some Error Accured During adding category",
      })
      console.error(error)
    } finally {
      setIsloading(false)
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10 px-4">

        <SelectCategory selectedItemId={selectedItemId} setSelectedItemId={setSelectedItemId}/>

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input
                  placeholder="Category"

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
  )
}
