import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.Token;
    if (token == null) throw new Error("Acces Denied");
    const checkToken = verifyToken(token);
    if (checkToken == null) throw new Error("Acces Denied");
    return next();
  } catch (error) {
    return res.status(401).json({
      status: "Failed",
      message: error,
    });
  }
};

function verifyToken(token: any) {
  const verifyProcess = jwt.verify(
    String(token),
    String(process.env.secret_key),
  );
  if (!verifyProcess) return null;
  return verifyProcess;
}
