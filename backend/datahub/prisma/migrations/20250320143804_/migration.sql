/*
  Warnings:

  - You are about to drop the column `email` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Driver` table. All the data in the column will be lost.
  - Made the column `phone` on table `Driver` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Driver_email_key` ON `Driver`;

-- AlterTable
ALTER TABLE `Driver` DROP COLUMN `email`,
    DROP COLUMN `password`,
    MODIFY `phone` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `CarRequest` (
    `id` VARCHAR(191) NOT NULL,
    `carId` VARCHAR(191) NOT NULL,
    `managerId` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CarRequest` ADD CONSTRAINT `CarRequest_managerId_fkey` FOREIGN KEY (`managerId`) REFERENCES `Manager`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarRequest` ADD CONSTRAINT `CarRequest_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
