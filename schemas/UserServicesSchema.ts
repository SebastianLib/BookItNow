import { z } from "zod";

export const UserServicesSchema = z.object({
  category: z.string().optional(),
  services: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});
export type UserServicesSchemaType = z.infer<typeof UserServicesSchema>