-- AlterTable
ALTER TABLE `Car` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `deletedById` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Driver` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `deletedById` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Event` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `deletedById` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Driver` ADD CONSTRAINT `Driver_deletedById_fkey` FOREIGN KEY (`deletedById`) REFERENCES `Manager`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_deletedById_fkey` FOREIGN KEY (`deletedById`) REFERENCES `Manager`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_deletedById_fkey` FOREIGN KEY (`deletedById`) REFERENCES `Manager`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
