/*
  Warnings:

  - You are about to alter the column `odometer` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `Car` MODIFY `renavam` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Event` MODIFY `odometer` INTEGER NOT NULL;
