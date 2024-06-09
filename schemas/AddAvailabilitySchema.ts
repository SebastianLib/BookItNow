import { z } from "zod";

export const AddAvailabilitySchema = z
  .object({
    date: z.date({
      required_error: "A date is required.",
    }),
    hours: z.array(z.number()).optional(),
  })

export type AddAvailabilitySchemaType = z.infer<typeof AddAvailabilitySchema>