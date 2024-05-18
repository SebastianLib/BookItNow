import { z } from "zod";

export const UserServicesSchema = z.object({
  category: z.string().optional(),
  services: z.object({})
});
export type UserServicesSchemaType = z.infer<typeof UserServicesSchema>