/*
  Warnings:

  - You are about to drop the column `location` on the `SupplierProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SupplierProfile" DROP COLUMN "location",
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION;
