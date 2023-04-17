/*
  Warnings:

  - You are about to drop the column `paidOrdersId` on the `Orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_paidOrdersId_fkey";

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "paidOrdersId";
