import { Response, Request } from "express";
import Solve from "../../models/Solve.js";

export default async function getTimes(req: Request, res: Response) {
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
