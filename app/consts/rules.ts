// consts/rules.ts
// shared zod schemas for form fields, used in <UForm :schema>
// combine them: rules.VALIDATE.pipe(rules.MAX_LENGTH(100))
import { z } from "zod";

export default {
  VALIDATE: z.string().trim().min(1, "This field is required"),
  MAX_LENGTH: (max: number) =>
    z.string().max(max, `Maximum ${max} characters`),
};
