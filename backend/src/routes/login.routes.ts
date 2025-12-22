import { Router } from "express";
import login from "../controllers/auth/login.controller.js";

const loginRouter = Router();

loginRouter.post("/", login);

export default loginRouter;
