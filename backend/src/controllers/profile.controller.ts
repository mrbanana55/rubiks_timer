import { Response, Request } from "express";
import User from "../models/User.js";
import Solve from "../models/Solve.js";

export async function getProfile(req: Request, res: Response) {
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

export async function getTimes(req: Request, res: Response) {
  try {
    const userId = req.user.id;

    const times = await Solve.findAll({
      attributes: ["id", "time", "scramble", "createdAt"],
      where: { userId: userId },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({ times: times });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
