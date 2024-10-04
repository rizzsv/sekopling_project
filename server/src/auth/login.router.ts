import Express from "express";
import { loginValidate } from "../middleware/login.middleware";
import { loginController } from "./login.controller";
const router = Express()



router.use('/login', [loginValidate], loginController)

export default router
