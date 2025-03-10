-- DropForeignKey
ALTER TABLE `Cop` DROP FOREIGN KEY `Cop_cityId_fkey`;

-- DropForeignKey
ALTER TABLE `Cop` DROP FOREIGN KEY `Cop_vehicleId_fkey`;

-- DropIndex
DROP INDEX `Cop_cityId_fkey` ON `Cop`;

-- DropIndex
DROP INDEX `Cop_vehicleId_fkey` ON `Cop`;

-- AlterTable
ALTER TABLE `Cop` MODIFY `cityId` INTEGER NULL,
    MODIFY `vehicleId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Cop` ADD CONSTRAINT `Cop_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cop` ADD CONSTRAINT `Cop_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `Vehicle`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
