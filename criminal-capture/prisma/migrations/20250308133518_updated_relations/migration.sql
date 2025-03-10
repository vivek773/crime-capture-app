/*
  Warnings:

  - You are about to drop the column `distance` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `count` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `kind` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `range` on the `Vehicle` table. All the data in the column will be lost.
  - Added the required column `country` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cityId` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `City_name_key` ON `City`;

-- AlterTable
ALTER TABLE `City` DROP COLUMN `distance`,
    ADD COLUMN `country` VARCHAR(191) NOT NULL,
    ADD COLUMN `state` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Vehicle` DROP COLUMN `count`,
    DROP COLUMN `kind`,
    DROP COLUMN `range`,
    ADD COLUMN `cityId` INTEGER NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Vehicle` ADD CONSTRAINT `Vehicle_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
