import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../db";
/** CRUD Account User */
// Create User
const addAccountUser = async (req: Request, res: Response) => {
  try {
    const { namaSiswa, emailSiswa, passwordSiswa, noHpSiswa, absenSiswa } =
      req.body;
    const checkAccount = await prisma.siswa.findFirst({
      where: {
        nama: namaSiswa,
        email: emailSiswa,
        no_hp: noHpSiswa,
        absen: absenSiswa,
      },
    });
    if (checkAccount)
      return res.status(404).json({ message: "Account not found" });

    const encryptedPasswowrd = bcrypt.hash(
      passwordSiswa,
      Number(process.env.saltround),
      async (err, _) => {
        if (err) throw new Error("Terjadi kesalahan silahkan coba lagi");

        await prisma.siswa.create({
          data: {
            nama: String(namaSiswa),
            no_hp: String(noHpSiswa),
            email: String(emailSiswa),
            password: String(encryptedPasswowrd),
            absen: Number(absenSiswa),
            role: "User",
          },
        });
        return res.status(200).json({ messagge: "Succes Added Account" });
      },
    );
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// Delete User
const deleteAccountUser = async (req: Request, res: Response) => {
  try {
    const userId = String(req.params.id);
    await prisma.siswa.delete({ where: { id: userId } });
    return res.status(200).json({ message: "Account Deleted" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// update user
const updateData = (req: Request, res: Response) => {
  try {
    const idUser = req.params.id;
    const newData = req.body;

    const searchUser = prisma.siswa.findUnique({ where: { id: idUser } });
    if (!searchUser) return res.status(404).json({ message: "User not found" });
    const updateData = prisma.siswa.update({
      where: { id: idUser },
      data: {
        nama: String(newData.nama),
        absen: Number(newData.absen),
        email: String(),
      },
    });
  } catch (error) {
    return res.status(500);
  }
};

export { addAccountUser, deleteAccountUser, updateData };
