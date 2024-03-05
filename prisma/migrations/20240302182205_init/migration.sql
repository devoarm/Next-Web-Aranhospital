/*
  Warnings:

  - You are about to alter the column `description` on the `arh_project` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE `arh_project` ADD COLUMN `active` BOOLEAN NULL DEFAULT true,
    MODIFY `description` VARCHAR(50) NULL;
