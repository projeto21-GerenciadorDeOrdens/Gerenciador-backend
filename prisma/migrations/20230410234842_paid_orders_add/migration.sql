-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "paidOrdersId" INTEGER;

-- CreateTable
CREATE TABLE "PaidOrders" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "PaidOrders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaidOrders_orderId_key" ON "PaidOrders"("orderId");

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_paidOrdersId_fkey" FOREIGN KEY ("paidOrdersId") REFERENCES "PaidOrders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
