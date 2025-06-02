-- AlterTable
ALTER TABLE `Manager` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `deletedById` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Manager` ADD CONSTRAINT `Manager_deletedById_fkey` FOREIGN KEY (`deletedById`) REFERENCES `Manager`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
