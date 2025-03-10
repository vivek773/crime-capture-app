/*
  Warnings:

  - You are about to drop the column `country` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the `Cop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Criminal` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `distance_from_current_city` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `count` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleName` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Cop` DROP FOREIGN KEY `Cop_cityId_fkey`;

-- DropForeignKey
ALTER TABLE `Cop` DROP FOREIGN KEY `Cop_vehicleId_fkey`;

-- DropForeignKey
ALTER TABLE `Criminal` DROP FOREIGN KEY `Criminal_cityId_fkey`;

-- AlterTable
ALTER TABLE `City` DROP COLUMN `country`,
    DROP COLUMN `name`,
    DROP COLUMN `state`,
    ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `distance_from_current_city` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Vehicle` DROP COLUMN `createdAt`,
    DROP COLUMN `name`,
    ADD COLUMN `count` INTEGER NOT NULL,
    ADD COLUMN `vehicleName` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Cop`;

-- DropTable
DROP TABLE `Criminal`;
