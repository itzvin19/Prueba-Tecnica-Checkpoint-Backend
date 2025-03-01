/*
  Warnings:

  - The primary key for the `Cliente` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Contraseña` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `Correo` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `Id` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `Nombre` on the `Cliente` table. All the data in the column will be lost.
  - The primary key for the `Leads` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Correo` on the `Leads` table. All the data in the column will be lost.
  - You are about to drop the column `Id` on the `Leads` table. All the data in the column will be lost.
  - The primary key for the `Producto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Descripcion` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `Id` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `Image` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `Nombre` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `Price` on the `Producto` table. All the data in the column will be lost.
  - Added the required column `contraseña` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correo` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correo` to the `Leads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descripcion` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagen` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precio` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cliente" DROP CONSTRAINT "Cliente_pkey",
DROP COLUMN "Contraseña",
DROP COLUMN "Correo",
DROP COLUMN "Id",
DROP COLUMN "Nombre",
ADD COLUMN     "contraseña" TEXT NOT NULL,
ADD COLUMN     "correo" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "nombre" TEXT NOT NULL,
ADD CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Leads" DROP CONSTRAINT "Leads_pkey",
DROP COLUMN "Correo",
DROP COLUMN "Id",
ADD COLUMN     "correo" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Leads_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Producto" DROP CONSTRAINT "Producto_pkey",
DROP COLUMN "Descripcion",
DROP COLUMN "Id",
DROP COLUMN "Image",
DROP COLUMN "Nombre",
DROP COLUMN "Price",
ADD COLUMN     "descripcion" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "imagen" TEXT NOT NULL,
ADD COLUMN     "nombre" TEXT NOT NULL,
ADD COLUMN     "precio" TEXT NOT NULL,
ADD CONSTRAINT "Producto_pkey" PRIMARY KEY ("id");
