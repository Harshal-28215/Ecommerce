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
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  UserName: z.string().min(3),
  email: z.string(),
  Password: z.string(),
  ConfirmPassword: z.string()
})
  .refine((data) => data.Password === data.ConfirmPassword, {
    message: "Passwords do not match",
    path: ["ConfirmPassword"], // Specify which field the error applies to
  });

export default function SignupForm() {
  const { toast } = useToast();
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      UserName: "",
      email: "",
      Password: "",
      ConfirmPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

    const data = {
      name: values.UserName,
      email: values.email,
      password: values.Password,
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Signup Successfully"
        })
        router.push('/login')
      }else{
        toast({
          title: "Error",
          description: "Error during signup"
        })
      }

    } catch (error) {
      toast({
        title: "Error",
        description: "Error during signup"
      })
      console.error(error)
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10 px-5">

        <FormField
          control={form.control}
          name="UserName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UserName</FormLabel>
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
          name="Password"
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


        <FormField
          control={form.control}
          name="ConfirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Confirm Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}