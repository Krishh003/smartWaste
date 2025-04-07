/*
  Warnings:

  - Added the required column `organicWaste` to the `Analytics` table without a default value. This is not possible if the table is not empty.

*/
-- Add column with default value
ALTER TABLE `Analytics` ADD COLUMN `organicWaste` FLOAT NOT NULL DEFAULT 0;

-- Update existing records to calculate organic waste
UPDATE `Analytics` 
SET `organicWaste` = `totalWaste` - `recycledWaste` - `landfillWaste`;

-- Remove default value after data is populated
ALTER TABLE `Analytics` ALTER COLUMN `organicWaste` DROP DEFAULT;
