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
import {
  PasswordInput
} from "@/components/ui/password-input"
import { useRouter } from "next/navigation"
import { useMyContext } from "@/Context/context"
import { useState } from "react"

import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export default function LoginForm() {
  const { toast } = useToast()
  const [isloading, setIsloading] = useState(false);
  const { setUser } = useMyContext();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {


    const data = {
      email: values.email,
      password: values.password,
    }

    try {
      setIsloading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json(); // Get error message from API
        throw new Error(errorData.message || "Login failed"); // Show API error
      }

      const user = await response.json();
      toast({
        title: "Success",
        description: "Login Successfully",
      });
      router.push("/");
      setUser(user.userObj);

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Some Error Accured During Login",
      })
      console.error(error)
    } finally {
      setIsloading(false)
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10 md:px-0 px-7">

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email"

                  type="email"
                  {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Password" {...field} />
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