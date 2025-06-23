/*
  Warnings:

  - Added the required column `cep` to the `Org` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Org` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Org` table without a default value. This is not possible if the table is not empty.
  - Added the required column `breed` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('dog', 'cat');

-- AlterTable
ALTER TABLE "Org" ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "breed" TEXT NOT NULL,
ADD COLUMN     "sex" "Sex" NOT NULL,
ADD COLUMN     "type" "Type" NOT NULL;
