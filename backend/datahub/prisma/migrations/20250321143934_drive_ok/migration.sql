/*
  Warnings:

  - Made the column `driverId` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `CarRequest` DROP FOREIGN KEY `CarRequest_carId_fkey`;

-- DropForeignKey
ALTER TABLE `Event` DROP FOREIGN KEY `Event_driverId_fkey`;

-- DropIndex
DROP INDEX `CarRequest_carId_fkey` ON `CarRequest`;

-- DropIndex
DROP INDEX `Event_driverId_fkey` ON `Event`;

-- AlterTable
ALTER TABLE `CarRequest` MODIFY `carId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Event` MODIFY `driverId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `CarRequest` ADD CONSTRAINT `CarRequest_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `Driver`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
