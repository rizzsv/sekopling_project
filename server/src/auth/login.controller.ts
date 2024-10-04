import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import prisma from "../db";
import { Request, Response } from "express";
dotenv.config();

type Payload = {
  id: number;
  role: string;
};

const loginController = async (req: Request, res: Response) => {
  try {
    const { Email, Password } = req.body;

    const userAccount = await prisma.siswa.findFirst({
      where: { email: Email },
    });
    if (!userAccount)
      return res.status(400).json({ message: "user not found" });

    if (userAccount.role == "User") {
      bcrypt.compare(
        String(Password),
        String(userAccount.password),
        async (err, _) => {
          if (err) throw new Error("Wrong password");
          const payload: Payload = {
            id: Number(userAccount.id),
            role: String(userAccount.role),
          };
          const token = createToken(payload);
          return res.status(200).json({ message: "Login succes", token });
        },
      );
    } else {
      const checkPasswordAdmin = await prisma.siswa.findFirst({
        where: { password: String(userAccount.password) },
      });
      if (!checkPasswordAdmin) throw new Error("Wrong Password");
      const payload: Payload = {
        id: Number(checkPasswordAdmin.id),
        role: String(checkPasswordAdmin.role),
      };
      const token = createToken(payload);
      return [
        res.cookie("Token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        }),
        res.status(200).json({ message: "Login succes", token }),
      ];
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

function createToken(payloads: Payload) {
  return jwt.sign(payloads, String(process.env.secret_key), {
    expiresIn: "24h",
  });
}

export { loginController };

