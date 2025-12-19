import * as z from "zod";

const solveSchema = z.object({
  time: z.number().int().positive(),
  scramble: z.string().nonempty(),
});

function validateSolve(object: object) {
  return solveSchema.safeParse(object);
}

export default validateSolve;
