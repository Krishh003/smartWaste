/*
  Warnings:

  - You are about to drop the column `notifications` on the `User` table. All the data in the column will be lost.
  - Added the required column `collectionCost` to the `Analytics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maintenanceCost` to the `Analytics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `processingCost` to the `Analytics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transportationCost` to the `Analytics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Analytics` ADD COLUMN `collectionCost` FLOAT NOT NULL DEFAULT 0,
    ADD COLUMN `maintenanceCost` FLOAT NOT NULL DEFAULT 0,
    ADD COLUMN `processingCost` FLOAT NOT NULL DEFAULT 0,
    ADD COLUMN `transportationCost` FLOAT NOT NULL DEFAULT 0;

-- Update existing records with calculated costs based on total waste
UPDATE `Analytics` 
SET 
    `collectionCost` = `totalWaste` * 2.5,
    `processingCost` = `totalWaste` * 1.8,
    `transportationCost` = `totalWaste` * 1.2,
    `maintenanceCost` = `totalWaste` * 0.5;

-- Remove default values after data is populated
ALTER TABLE `Analytics` ALTER COLUMN `collectionCost` DROP DEFAULT;
ALTER TABLE `Analytics` ALTER COLUMN `processingCost` DROP DEFAULT;
ALTER TABLE `Analytics` ALTER COLUMN `transportationCost` DROP DEFAULT;
ALTER TABLE `Analytics` ALTER COLUMN `maintenanceCost` DROP DEFAULT;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `notifications`;
