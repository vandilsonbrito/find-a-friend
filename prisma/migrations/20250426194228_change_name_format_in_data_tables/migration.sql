/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Org` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `Org` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `energyLevel` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `independenceLevel` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `isAdopted` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `orgId` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `petId` on the `PetPhoto` table. All the data in the column will be lost.
  - Added the required column `password_hash` to the `Org` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energy_level` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `independence_level` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `org_id` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pet_id` to the `PetPhoto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_orgId_fkey";

-- DropForeignKey
ALTER TABLE "PetPhoto" DROP CONSTRAINT "PetPhoto_petId_fkey";

-- AlterTable
ALTER TABLE "Org" DROP COLUMN "createdAt",
DROP COLUMN "passwordHash",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "password_hash" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "createdAt",
DROP COLUMN "energyLevel",
DROP COLUMN "independenceLevel",
DROP COLUMN "isAdopted",
DROP COLUMN "orgId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "energy_level" "EnergyLevel" NOT NULL,
ADD COLUMN     "independence_level" "IndependenceLevel" NOT NULL,
ADD COLUMN     "is_adopted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "org_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PetPhoto" DROP COLUMN "petId",
ADD COLUMN     "pet_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetPhoto" ADD CONSTRAINT "PetPhoto_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
