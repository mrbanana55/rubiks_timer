import { Response, Request } from "express";
import User from "../models/User.js";

export default async function getProfile(req: Request, res: Response) {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId, {
      attributes: { exclude: ["passwordHash", "updatedAt"] },
    });

    const userData = user?.toJSON();
    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      createdAt: userData.createdAt,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
