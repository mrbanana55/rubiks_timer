import { Request, Response } from "express";
import validateLogin from "../schemas/loginSchema.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default async function login(req: Request, res: Response) {
  try {
    //body validation
    const result = validateLogin(req.body);
    if (result.error) {
      return res.status(400).json({ error: result.error.message });
    }
    // get data from result
    const { email, password } = result.data;

    //find id, email and password
    const user = await User.findOne({
      attributes: ["id", "email", "passwordHash"],
      where: {
        email: email,
      },
    });
    const userData = user?.toJSON();

    if (!userData) {
      return res.status(401).json({ error: "invalid user and/or password" });
    }

    // Validate password
    const match = await bcrypt.compare(password, userData.passwordHash);

    if (!match) {
      return res.status(401).json({ error: "invalid user and/or password" });
    }

    // Create JWT
    const token = jwt.sign(
      { id: userData.id },
      process.env.SECRET_JWT as string,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token: token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
