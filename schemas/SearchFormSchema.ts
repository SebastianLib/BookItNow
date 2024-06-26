import { z } from "zod";


export const SearchFormSchema = z.object({
  category: z.string(),
  service: z.string().optional(),
});
export type SearchFormSchemaType = z.infer<typeof SearchFormSchema>