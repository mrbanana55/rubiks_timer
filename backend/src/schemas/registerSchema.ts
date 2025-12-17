import * as z from "zod";

const registerSchema = z.object({
  name: z.string().min(1).max(50),
  email: z.email(),
  password: z.string().min(6),
});

function validateRegister(object: object) {
  return registerSchema.safeParse(object);
}

export default validateRegister;
