/*
  Warnings:

  - You are about to drop the column `cityId` on the `Vehicle` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Vehicle` DROP FOREIGN KEY `Vehicle_cityId_fkey`;

-- DropIndex
DROP INDEX `Vehicle_cityId_fkey` ON `Vehicle`;

-- AlterTable
ALTER TABLE `Vehicle` DROP COLUMN `cityId`;
