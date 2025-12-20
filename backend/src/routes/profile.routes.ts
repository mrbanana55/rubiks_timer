import { Router } from "express";
import authentication from "../middlewares/auth.middleware.js";
import getProfile from "../controllers/profile.controller.js";

const profileRouter = Router();
profileRouter.use(authentication);

profileRouter.get("/", getProfile);

export default profileRouter;
