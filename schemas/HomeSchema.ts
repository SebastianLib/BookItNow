import { z } from "zod";

export const Homeschema = z.object({
  category: z
    .string({
      required_error: "Please select an email to display.",
    })
});
export type HomeschemaType = z.infer<typeof Homeschema>