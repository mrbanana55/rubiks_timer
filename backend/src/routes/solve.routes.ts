import { Router } from "express";
import authentication from "../middlewares/auth.middleware.js";
import solve from "../controllers/solve.controller.js";

const solveRouter = Router();

solveRouter.use(authentication);

solveRouter.post("/", solve);

export default solveRouter;
