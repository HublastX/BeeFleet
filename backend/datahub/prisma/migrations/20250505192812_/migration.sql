-- DropForeignKey
ALTER TABLE `Event` DROP FOREIGN KEY `Event_driverId_fkey`;

-- DropIndex
DROP INDEX `Event_driverId_fkey` ON `Event`;

-- AlterTable
ALTER TABLE `Event` MODIFY `driverId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `Driver`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
