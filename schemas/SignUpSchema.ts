import { z } from "zod";

export const SignUpSchema = z
.object({
  name: z.string().min(1, "Full name is required").max(30),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
  confirmPassword: z.string().min(1, "Password confirmation is required"),
  isCreator: z.boolean().default(false)
})
.refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Password do not match",
});

  export type SignUpSchemaType = z.infer<typeof SignUpSchema>