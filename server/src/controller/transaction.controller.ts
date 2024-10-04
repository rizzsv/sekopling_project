import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import prisma from "../db";

const createTransaction = async (req: Request, res: Response) => {
    try {
        const {siswaId, statusPembayaranId} = req.body;

        const transaction = await prisma.transaksi.create({
            data: {
                siswaId,
                statusPembayaranId
            },
        });
        return res.status(200).json(transaction);
    } catch (error) {
        return res.status(500).json({
            error: "gagal membuat transaksi"
        })
    }
}

//update transaksi siswa


// mengambil semua transaksi siswa tertentu
const getAllTransactions = async (
    req: Request,
    res: Response
) => {
    try {
        const {siswaId} = req.params;

        const transaction = await prisma.transaksi.findMany({
            where: {siswaId},
            include: {StatusPembayaran: true} //info status
        });
        return res.status(200).json(transaction);
    } catch (error){
        return res.status(500).json({
            error: "gagal memuat transaksi"
        })
    }
}

export {createTransaction, getAllTransactions}