import { Request, Response } from "express";
import validateSolve from "../schemas/solveSchema.js";
import Solve from "../models/Solve.js";

export default async function solve(req: Request, res: Response) {
  try {
    const result = validateSolve(req.body);

    if (result.error) {
      return res.status(400).json({ error: result.error.message });
    }

    const { time, scramble } = result.data;
    const userId = req.user.id;

    const solve = await Solve.create({
      userId: userId,
      time: time,
      scramble: scramble,
    });

    return res
      .status(201)
      .json({
        id: solve.id,
        time: time,
        scramble: scramble,
        createdAt: solve.createdAt,
      });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
