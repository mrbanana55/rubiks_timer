import { Router } from "express";
import authentication from "../middlewares/auth.middleware.js";
import getProfile from "../controllers/profile/getProfile.controller.js";
import getTimes from "../controllers/profile/getTimes.controller.js";
import putProfile from "../controllers/profile/putProfile.controller.js";

const profileRouter = Router();
profileRouter.use(authentication);

profileRouter.get("/", getProfile);
profileRouter.get("/times", getTimes);

profileRouter.put("/edit", putProfile);

export default profileRouter;
