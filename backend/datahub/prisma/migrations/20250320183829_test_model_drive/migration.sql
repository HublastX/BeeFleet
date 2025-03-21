/*
  Warnings:

  - You are about to drop the column `driverPhone` on the `Event` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpf]` on the table `Driver` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[driverLicense]` on the table `Driver` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `driverCpf` to the `CarRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `driverLicense` to the `CarRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `driverName` to the `CarRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `driverLicense` to the `Driver` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CarRequest` ADD COLUMN `driverCpf` VARCHAR(191) NOT NULL,
    ADD COLUMN `driverLicense` VARCHAR(191) NOT NULL,
    ADD COLUMN `driverName` VARCHAR(191) NOT NULL,
    ADD COLUMN `driverPhone` VARCHAR(191) NULL,
    ADD COLUMN `requestDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Driver` ADD COLUMN `cpf` VARCHAR(191) NOT NULL,
    ADD COLUMN `driverLicense` VARCHAR(191) NOT NULL,
    MODIFY `phone` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Event` DROP COLUMN `driverPhone`,
    MODIFY `driverId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Driver_cpf_key` ON `Driver`(`cpf`);

-- CreateIndex
CREATE UNIQUE INDEX `Driver_driverLicense_key` ON `Driver`(`driverLicense`);
