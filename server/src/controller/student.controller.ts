import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../db";
import { error } from "console";


/** Schema untuk Create  */
const CreateStudent = async (req: Request, res:Response) => {
    try {
        const namaSiswa: string = req.body.namaSiswa;
        const emailSiswa: string = req.body.emailSiswa;
        const passwordSiswa: string = req.body.passwordSiswa;
        const noHpSiswa: string = req.body.noHpSiswa;
        const absenSiswa: number = req.body.absenSiswa

        //check validasi
        if(!namaSiswa || !emailSiswa || !passwordSiswa || !noHpSiswa || !absenSiswa){
            return res.status(400).send(`semua nilai harus di isi`)
        }

        //check validasi email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(emailSiswa)){
            return res.status(400).send(`format email tidak valid`)
        }

        //validasi nomor telepon sederhana (contoh format)
        const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
        if(!phoneRegex.test(noHpSiswa)){
            return res.status(400).send(`no hp tidak valid`)
        }


        const checkAccount = await prisma.siswa.findUnique({
            where: {
                email: emailSiswa,
            },
        });

        if(checkAccount)
            return res.status(404).json({message: "Account not found"})

        const encryptedPassword = bcrypt.hash(
            passwordSiswa, Number(process.env.saltround),
            async (error, _) => {
                if (error) throw new Error("an error occurred please try again")
            }
        )

        const hashPassword = await bcrypt.hash(passwordSiswa, 12)
        
        const newSiswa = await prisma.siswa.create({
            data: {
                nama: (namaSiswa),
                no_hp: (noHpSiswa),
                email: (emailSiswa),
                password: hashPassword,
                absen: (absenSiswa),
                role: "User",
            }
        });
    }catch (error){

        console.log(error)

    }
}

/** Schema untuk Read */
const readStudent = async (req: Request, res: Response) => {
    try{
        const search = req.query.search
        const allStudent = await prisma.siswa.findMany({
            where: {
                OR: [
                    {nama: {contains: search?.toString() || ""}}
                ]
            }
        })
        return res.status(200).json({
            message: `student has been succes`,
            data: allStudent
        })
    }catch(error){
        res.status(500).json(error)
    }
}

/** Schema untuk Update */
const updateStudent = async (req: Request, res:Response) => {
    try{
        const id = req.params.id
        const newData = req.body

        const findSiswa = await prisma.siswa
        .findFirst({
            where: {id: String(id)}
        })

        if(!findSiswa) {
            return res.status(200).json ({
                message: "student not found"
            })
        }

        /** read property */
        const {
            namaSiswa,
            emailSiswa,
            passwordSiswa,
            noHpSiswa,
            absenSiswa
            } = req.body

        /** update student */
        const saveSiswa = await prisma.siswa.update({
            where: {id: String(id)},
            data: {
                nama: String(newData.nama),
                absen: Number(newData.absen),
                email: String()
            }
        })
    }catch(error){
        return res.status(500);
    }
}

/** Schema untuk Delete */
const deleteStudent = async (req: Request, res: Response) => {
    try{
        const id = req.params.id

        /** check existing student*/
        const findStudent = await prisma.siswa.findFirst({
            where: {
                id: String(id)
            }
        })

        if(!findStudent) {
            return res.status(200).json({
                message: `student is not found`
            })

            /** delete student */
            const saveStudent = await prisma.siswa.delete({
                where: {id: String(id)}
            })
            return res.status(200).json ({
                message: `student has been removed`,
                data: saveStudent
            })
        }
    }catch(error){
        return res.status(500).json(error)
    }
}

export {CreateStudent, readStudent ,updateStudent, deleteStudent}