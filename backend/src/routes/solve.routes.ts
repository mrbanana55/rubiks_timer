import { Router } from "express";
import authentication from "../middlewares/auth.middleware.js";
import postSolve from "../controllers/solve/postSolve.controller.js";
import deleteSolve from "../controllers/solve/deleteSolve.controller.js";

const solveRouter = Router();

solveRouter.use(authentication);

solveRouter.post("/", postSolve);
solveRouter.delete("/:id", deleteSolve);

export default solveRouter;
