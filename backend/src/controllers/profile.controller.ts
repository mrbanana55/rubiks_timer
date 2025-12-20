import { Response, Request } from "express";
import User from "../models/User.js";
import Solve from "../models/Solve.js";
import validateEditProfile from "../schemas/editProfileSchema.js";
import bcrypt from "bcrypt";
import { string } from "zod";

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

export async function putProfile(req: Request, res: Response) {
  try {
    const result = validateEditProfile(req.body);
    const userId = req.user.id;

    if (result.error) {
      return res.status(400).json({ error: "Invalid body" });
    }

    const updateData: Record<string, any> = {};

    if (result.data.name !== undefined) {
      updateData.name = result.data.name;
    }

    if (result.data.password !== undefined) {
      updateData.passwordHash = await bcrypt.hash(result.data.password, 10);
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    const [affectedRows] = await User.update(updateData, {
      where: { id: userId },
    });

    if (affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "Successful data update" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
