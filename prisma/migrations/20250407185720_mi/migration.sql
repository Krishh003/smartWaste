-- AlterTable
ALTER TABLE `Analytics` MODIFY `collectionCost` DOUBLE NOT NULL,
    MODIFY `maintenanceCost` DOUBLE NOT NULL,
    MODIFY `processingCost` DOUBLE NOT NULL,
    MODIFY `transportationCost` DOUBLE NOT NULL;
