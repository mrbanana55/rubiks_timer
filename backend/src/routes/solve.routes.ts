import { Router } from "express";
import authentication from "../middlewares/auth.middleware.js";
import { postSolve, deleteSolve } from "../controllers/solve.controller.js";

const solveRouter = Router();

solveRouter.use(authentication);

solveRouter.post("/", postSolve);
solveRouter.delete("/:id", deleteSolve);

export default solveRouter;
