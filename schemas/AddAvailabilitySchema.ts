import { z } from "zod";

export const AddAvailabilitySchema = z
  .object({
    day: z.string(),
    hours: z.array(z.number()).optional(),
  })

export type AddAvailabilitySchemaType = z.infer<typeof AddAvailabilitySchema>