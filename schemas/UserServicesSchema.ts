
import { z } from "zod";

const serviceSchema = z.object({
  id: z.string(),
  name: z.string(),
  minutes: z.number().int(),
});

export const UserServicesSchema = z.object({
  category: z.string(),
  services: z.array(serviceSchema).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});
export type UserServicesSchemaType = z.infer<typeof UserServicesSchema>