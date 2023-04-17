/*
  Warnings:

  - Added the required column `driverFinishedService` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "driverFinishedService" BOOLEAN NOT NULL;
