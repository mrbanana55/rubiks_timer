import { Request, Response } from "express";
import validateSolve from "../schemas/solveSchema.js";
import Solve from "../models/Solve.js";

export async function postSolve(req: Request, res: Response) {
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

    return res.status(201).json({
      id: solve.id,
      time: time,
      scramble: scramble,
      createdAt: solve.createdAt,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteSolve(req: Request, res: Response) {
  try {
    const { id: solveId } = req.params;
    const userId = req.user.id;

    if (!solveId) {
      return res.status(400).json({ error: "Solve ID is required" });
    }

    const affectedRows = await Solve.destroy({
      where: {
        id: solveId,
        userId: userId,
      },
    });

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Solve not found" });
    }
    return res.status(200).json({ message: "Solve deleted" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
