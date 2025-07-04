// import React from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { SignUpFormSchema, TSignUpForm } from "@/lib/validations/auth";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Link, useNavigate } from "react-router-dom";
// import { useSignUpMutation } from "@/redux/services/authApi";
// import { toast } from "sonner";
// import { countryOptions } from "@/components/ui/country-code";
// import { useDispatch } from "react-redux";
// import { login } from "@/redux/slices/authSlice";

// export function SignUpForm() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [signUp, { isLoading }] = useSignUpMutation();

//   const form = useForm<TSignUpForm>({
//     resolver: zodResolver(SignUpFormSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       phone: "",
//       password: "",
//       confirmPassword: "",
//       countryCode: "IN",
//     },
//   });

//   const onSubmit = async (values: TSignUpForm) => {
//     try {
//       const res = await signUp(values).unwrap();

//       // ✅ Do NOT store token in localStorage
//       // ✅ Just update Redux with user data
//       dispatch(login(res.user));

//       toast.success("Account created successfully!");
//       setTimeout(() => navigate("/", { replace: true }), 1000);
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Sign up failed");
//       console.error("Signup error:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
//       <Card className="w-full max-w-md shadow-md border dark:border-gray-700">
//         <CardHeader>
//           <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Full Name</FormLabel>
//                     <FormControl>
//                       <Input placeholder="John Doe" {...field} disabled={isLoading} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input type="email" placeholder="john@example.com" {...field} disabled={isLoading} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="phone"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Phone Number</FormLabel>
//                     <FormControl>
//                       <Input type="tel" placeholder="9876543210" {...field} disabled={isLoading} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="countryCode"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Country</FormLabel>
//                     <FormControl>
//                       <select
//                         {...field}
//                         className="w-full h-10 border border-input rounded-md px-3 dark:bg-background"
//                         disabled={isLoading}
//                       >
//                         <option value="">Select country</option>
//                         {countryOptions.map((country) => (
//                           <option key={country.value} value={country.value}>
//                             {country.label}
//                           </option>
//                         ))}
//                       </select>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                       <Input type="password" placeholder="••••••••" {...field} disabled={isLoading} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="confirmPassword"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Confirm Password</FormLabel>
//                     <FormControl>
//                       <Input type="password" placeholder="••••••••" {...field} disabled={isLoading} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <Button type="submit" className="w-full" disabled={isLoading}>
//                 {isLoading ? "Signing up..." : "Sign Up"}
//               </Button>
//             </form>
//           </Form>
//           <div className="mt-4 text-center text-sm">
//             Already have an account?{" "}
//             <Link to="/sign-in" className="underline text-blue-600 dark:text-blue-400">
//               Sign in
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormSchema, TSignUpForm } from "@/lib/validations/auth";
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
import { useSignUpMutation } from "@/redux/services/authApi";
import { toast } from "sonner";
import { countryOptions } from "@/components/ui/country-code";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/authSlice";

export function SignUpForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signUp, { isLoading }] = useSignUpMutation();

  const form = useForm<TSignUpForm>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      countryCode: "IN",
    },
  });

  const onSubmit = async (values: TSignUpForm) => {
    try {
      const res = await signUp(values).unwrap();

      // ✅ Do NOT store token in localStorage
      // ✅ Just update Redux with user data
      dispatch(login(res.user));

      toast.success("Account created successfully!");
      setTimeout(() => navigate("/", { replace: true }), 1000);
    } catch (err: any) {
      toast.error(err?.data?.message || "Sign up failed");
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md shadow-md border dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} disabled={isLoading} />
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
                      <Input type="email" placeholder="john@example.com" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="9876543210" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="countryCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full h-10 border border-input rounded-md px-3 dark:bg-background"
                        disabled={isLoading}
                      >
                        <option value="">Select country</option>
                        {countryOptions.map((country) => (
                          <option key={country.value} value={country.value}>
                            {country.label}
                          </option>
                        ))}
                      </select>
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
                      <Input type="password" placeholder="••••••••" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing up..." : "Sign Up"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/sign-in" className="underline text-blue-600 dark:text-blue-400">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
