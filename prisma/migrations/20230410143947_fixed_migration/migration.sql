/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Drivers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Recipients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Senders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Drivers_name_key" ON "Drivers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Recipients_name_key" ON "Recipients"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Senders_name_key" ON "Senders"("name");
