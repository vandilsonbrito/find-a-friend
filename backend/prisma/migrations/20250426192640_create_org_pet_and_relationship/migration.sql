-- CreateEnum
CREATE TYPE "Age" AS ENUM ('puppy', 'adult', 'senior');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('small', 'medium', 'large');

-- CreateEnum
CREATE TYPE "EnergyLevel" AS ENUM ('low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "IndependenceLevel" AS ENUM ('low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "Environment" AS ENUM ('small', 'medium', 'large');

-- CreateTable
CREATE TABLE "Org" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Org_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "age" "Age" NOT NULL,
    "size" "Size" NOT NULL,
    "energyLevel" "EnergyLevel" NOT NULL,
    "independenceLevel" "IndependenceLevel" NOT NULL,
    "environment" "Environment" NOT NULL,
    "city" TEXT NOT NULL,
    "isAdopted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetPhoto" (
    "id" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "PetPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Org_email_key" ON "Org"("email");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetPhoto" ADD CONSTRAINT "PetPhoto_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
