-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Lunas', 'BayarSetengah', 'BelumBayar');

-- CreateTable
CREATE TABLE "Siswa" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "absen" INTEGER NOT NULL,
    "no_hp" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Siswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mapel" (
    "id" SERIAL NOT NULL,
    "nama_mapel" TEXT NOT NULL,
    "guruId" INTEGER NOT NULL,

    CONSTRAINT "Mapel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusPembayaran" (
    "id" SERIAL NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'BelumBayar',

    CONSTRAINT "StatusPembayaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guru" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "Guru_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tugas" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "startTugas" TIMESTAMP(3) NOT NULL,
    "deadlineTugas" TIMESTAMP(3) NOT NULL,
    "jadwalId" INTEGER NOT NULL,

    CONSTRAINT "Tugas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaksi" (
    "id" SERIAL NOT NULL,
    "siswaId" INTEGER NOT NULL,

    CONSTRAINT "Transaksi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JamMengajar" (
    "id" SERIAL NOT NULL,
    "hari" TEXT NOT NULL,
    "sesi" INTEGER NOT NULL,
    "jamMengajar" TEXT NOT NULL,

    CONSTRAINT "JamMengajar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jadwal" (
    "id" SERIAL NOT NULL,
    "jamMengajarId" INTEGER NOT NULL,
    "guruId" INTEGER NOT NULL,
    "mapelId" INTEGER NOT NULL,
    "hari" TEXT NOT NULL DEFAULT '',
    "sesi" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Jadwal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MapelTugas" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MapelTugas_AB_unique" ON "_MapelTugas"("A", "B");

-- CreateIndex
CREATE INDEX "_MapelTugas_B_index" ON "_MapelTugas"("B");

-- AddForeignKey
ALTER TABLE "Mapel" ADD CONSTRAINT "Mapel_guruId_fkey" FOREIGN KEY ("guruId") REFERENCES "Guru"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tugas" ADD CONSTRAINT "Tugas_jadwalId_fkey" FOREIGN KEY ("jadwalId") REFERENCES "Jadwal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_siswaId_fkey" FOREIGN KEY ("siswaId") REFERENCES "Siswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jadwal" ADD CONSTRAINT "Jadwal_jamMengajarId_fkey" FOREIGN KEY ("jamMengajarId") REFERENCES "JamMengajar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jadwal" ADD CONSTRAINT "Jadwal_guruId_fkey" FOREIGN KEY ("guruId") REFERENCES "Guru"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jadwal" ADD CONSTRAINT "Jadwal_mapelId_fkey" FOREIGN KEY ("mapelId") REFERENCES "Mapel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MapelTugas" ADD CONSTRAINT "_MapelTugas_A_fkey" FOREIGN KEY ("A") REFERENCES "Mapel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MapelTugas" ADD CONSTRAINT "_MapelTugas_B_fkey" FOREIGN KEY ("B") REFERENCES "Tugas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
