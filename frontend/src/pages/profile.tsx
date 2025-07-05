import React, { useEffect } from "react";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/redux/services/authApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader } from "@/components/ui/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, Globe } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { countryOptions } from "@/components/ui/country-code";

// Form validation schema
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(6, "Phone number is too short"),
  countryCode: z.string().min(1, "Country is required"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const { data: user, isLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      phone: "",
      countryCode: "IN", // Default to India like in sign-up form
    }
  });

  // Populate form with user data when available
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        phone: user.phone || "",
        countryCode: user.countryCode || "IN",
      });
    }
  }, [user, form]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      await updateProfile(data).unwrap();
      toast.success("Profile updated successfully", {
        description: "Your changes have been saved",
        position: "top-center",
      });
    } catch (error) {
      toast.error("Failed to update profile", {
        description: "Please try again later",
        position: "top-center",
      });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your account information and settings
          </p>
        </div>

        <Separator />

        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-medium">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{user?.name || "User"}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} disabled={isUpdating} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone Field */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="9876543210" {...field} disabled={isUpdating} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Country Field */}
                  <FormField
                    control={form.control}
                    name="countryCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Country
                        </FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="w-full h-10 border border-input rounded-md px-3 dark:bg-background"
                            disabled={isUpdating}
                          >
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

                  {/* Read-only Email Field */}
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        value={user?.email || ""}
                        disabled
                        className="opacity-70 cursor-not-allowed"
                      />
                    </FormControl>
                  </FormItem>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => form.reset()}
                    disabled={isUpdating}
                  >
                    Reset
                  </Button>
                  <Button type="submit" disabled={isUpdating}>
                    {isUpdating ? (
                      <>
                        <Loader  />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;