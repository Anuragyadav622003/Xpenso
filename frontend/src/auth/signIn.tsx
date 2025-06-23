import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormSchema, TAuthForm } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useSignInMutation } from "@/redux/services/authApi";
import { toast } from "sonner";

export function SignInForm() {
  const navigate = useNavigate();
  const [signIn, { isLoading }] = useSignInMutation();
  const form = useForm<TAuthForm>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: TAuthForm) {
    console.log(values);

    // Handle sign in logic here
    try {
      const res = await signIn(values).unwrap();
      console.log("access token=>", res);
      localStorage.setItem("accessToken", res.access_token);
      toast.success("Signed in successfully!");
      navigate("/"); // or your desired route
    } catch (err: any) {
      toast.error(err?.data?.message || "Invalid credentials");
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md shadow-md border dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} />
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
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/sign-up" className="underline text-blue-600 dark:text-blue-400">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
