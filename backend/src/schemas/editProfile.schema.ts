import * as z from "zod";

const editProfileSchema = z
  .object({
    name: z.string().min(1).max(50).optional(),
    password: z.string().min(6).optional(),
  })
  .refine((data) => data.name || data.password, {
    message: "name or password expected",
  });

export default function validateEditProfile(object: object) {
  return editProfileSchema.safeParse(object);
}
