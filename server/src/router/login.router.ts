import { Express, Router } from "express";
import { loginValidate } from "../middleware/login.middleware";
import { loginController } from "../auth/login.controller";
const router = Router();

router.post(`/login`, loginValidate, loginController)

export default router;