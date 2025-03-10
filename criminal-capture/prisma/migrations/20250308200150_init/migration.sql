/*
  Warnings:

  - You are about to drop the column `city` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `distance_from_current_city` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleName` on the `Vehicle` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `City` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `distance` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `range` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `City` DROP COLUMN `city`,
    DROP COLUMN `distance_from_current_city`,
    ADD COLUMN `distance` INTEGER NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Vehicle` DROP COLUMN `vehicleName`,
    ADD COLUMN `range` INTEGER NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Cop` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `cityId` INTEGER NOT NULL,
    `vehicleId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Result` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fugitiveCity` VARCHAR(191) NOT NULL,
    `capturedBy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `City_name_key` ON `City`(`name`);

-- AddForeignKey
ALTER TABLE `Cop` ADD CONSTRAINT `Cop_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cop` ADD CONSTRAINT `Cop_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `Vehicle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
