import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export default function authentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Get authorization header from request
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ error: "Authorization header expected" });
  }

  // Get token from header and verify type
  const [type, token] = header.split(" ");
  if (type.toLowerCase() !== "bearer") {
    return res.status(401).json({ error: "Invalid type" });
  }
  if (!token) {
    return res.status(401).json({ error: "Token is required" });
  }

  const SECRET_JWT = process.env.SECRET_JWT;

  try {
    const decoded = jwt.verify(token, SECRET_JWT);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "invalid token" });
  }
}
