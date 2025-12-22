import { Request, Response } from "express";
import validateRegister from "../../schemas/register.schema.js";
import User from "../../models/User.js";
import bcrypt from "bcrypt";

export default async function Register(req: Request, res: Response) {
  try {
    // Body validation using zod
    const result = validateRegister(req.body);
    if (result.error) {
      return res.status(400).json({ error: "Invalid body" });
    }
    // If valid body, extract data from body
    const { email, password, name } = result.data;
    // Check if email already exists
    const emailFound = await User.findOne({ where: { email: email } });
    if (emailFound) {
      return res.status(409).json({ error: "Email has already been used" });
    }
    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    await User.create({
      name: name,
      email: email,
      passwordHash: passwordHash,
    });

    return res
      .status(201)
      .json({ message: "Account created", email: email, name: name });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
