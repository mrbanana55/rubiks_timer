import { Request, Response } from "express";
import Solve from "../../models/Solve.js";

export default async function deleteSolve(req: Request, res: Response) {
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
