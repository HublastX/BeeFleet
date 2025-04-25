/*
  Warnings:

  - A unique constraint covering the columns `[renavam]` on the table `Car` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chassis]` on the table `Car` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `brand` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chassis` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `renavam` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Car` ADD COLUMN `brand` VARCHAR(191) NOT NULL,
    ADD COLUMN `chassis` VARCHAR(191) NOT NULL,
    ADD COLUMN `renavam` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Car_renavam_key` ON `Car`(`renavam`);

-- CreateIndex
CREATE UNIQUE INDEX `Car_chassis_key` ON `Car`(`chassis`);
