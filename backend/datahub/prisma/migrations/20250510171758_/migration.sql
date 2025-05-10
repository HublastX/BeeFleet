/*
  Warnings:

  - The values [IN_REPAIR] on the enum `Car_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [REPAIR,REPAIR_RETURN] on the enum `Report_eventType` will be removed. If these variants are still used in the database, this will fail.
  - The values [REPAIR,REPAIR_RETURN] on the enum `Report_eventType` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `odometer` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `driverId` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Event` DROP FOREIGN KEY `Event_driverId_fkey`;

-- DropIndex
DROP INDEX `Event_driverId_fkey` ON `Event`;

-- AlterTable
ALTER TABLE `Car` MODIFY `status` ENUM('AVAILABLE', 'IN_USE') NOT NULL DEFAULT 'AVAILABLE';

-- AlterTable
ALTER TABLE `Event` MODIFY `eventType` ENUM('CHECKOUT', 'RETURN') NOT NULL,
    MODIFY `odometer` INTEGER NOT NULL,
    MODIFY `driverId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Report` MODIFY `eventType` ENUM('CHECKOUT', 'RETURN') NOT NULL;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `Driver`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
