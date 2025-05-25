-- DropForeignKey
ALTER TABLE "PetPhoto" DROP CONSTRAINT "PetPhoto_pet_id_fkey";

-- AddForeignKey
ALTER TABLE "PetPhoto" ADD CONSTRAINT "PetPhoto_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
