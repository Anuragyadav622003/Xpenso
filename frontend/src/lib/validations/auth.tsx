import { z } from "zod";

// Common password schema
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(32, "Password must be less than 32 characters")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character");

export const AuthFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(100, "Email must be less than 100 characters"),
  password: passwordSchema,
});

export const SignUpFormSchema = AuthFormSchema.extend({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits")
    .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number"),

  countryCode: z
    .string()
    .length(2, "Invalid country code")
    .regex(/^[A-Z]{2}$/, "Country code must be 2 uppercase letters"),

  confirmPassword: z.string().min(1, "Please confirm your password"),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})
.refine(
  (data) => {
    const commonPasswords = ["password", "12345678", "qwerty"];
    return !commonPasswords.includes(data.password.toLowerCase());
  },
  {
    message: "Password is too common",
    path: ["password"],
  }
);

export type TAuthForm = z.infer<typeof AuthFormSchema>;
export type TSignUpForm = z.infer<typeof SignUpFormSchema>;
