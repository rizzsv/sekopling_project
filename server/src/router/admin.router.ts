import { Router } from "express";
import { addAccountUser, deleteAccountUser, updateData } from "../controller/admin.controller"; 
import { loginValidate } from "../middleware/login.middleware";
const router = Router();

router.post("/", [loginValidate], addAccountUser);
router.put("/update-account/:id", updateData);
router.delete("/delete-account/:id", deleteAccountUser);

export default router;