import { Router } from "express";
import register from "../controllers/register.controller.js";

const registerRouter = Router();

registerRouter.post("/", register);

export default registerRouter;
