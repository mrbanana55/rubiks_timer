import { Router } from "express";
import authentication from "../middlewares/auth.middleware.js";
import {
  getProfile,
  getTimes,
  putProfile,
} from "../controllers/profile.controller.js";

const profileRouter = Router();
profileRouter.use(authentication);

profileRouter.get("/", getProfile);
profileRouter.get("/times", getTimes);

profileRouter.put("/edit", putProfile);

export default profileRouter;
