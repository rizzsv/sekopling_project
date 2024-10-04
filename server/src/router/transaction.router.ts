import { Router } from "express";
import { createTransaction } from "../controller/transaction.controller";

const router = Router();

router.post("/", createTransaction);

export default router;