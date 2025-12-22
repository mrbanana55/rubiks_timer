import * as z from "zod";
import { Jwt } from "jsonwebtoken";

export const jwtPayload = z.object({ id: z.uuid() });
