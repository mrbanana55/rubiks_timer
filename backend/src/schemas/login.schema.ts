import * as z from "zod";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().nonempty(),
});

function validateLogin(object: object) {
  return loginSchema.safeParse(object);
}

export default validateLogin;
