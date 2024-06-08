import { z } from "zod";

export const EditUserSchema = z
  .object({
    image: z.string().optional(),
    name: z.string().min(1, "Full name is required").max(30),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    oldPassword: z
      .string()
      .min(8, "Password must have than 8 characters").optional(),
    newPassword: z
      .string()
      .min(8, "Password must have than 8 characters").optional(),
    confirmPassword: z.string().min(1, "Password confirmation is required").optional(),
    isCreator: z.boolean().default(false),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

export type EditUserSchemaType = z.infer<typeof EditUserSchema>