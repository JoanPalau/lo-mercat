-- CreateTable
CREATE TABLE "Farmer" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "registration_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "birthday" TIMESTAMP(3) NOT NULL,
    "marketId" TEXT NOT NULL,

    CONSTRAINT "Farmer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Market" (
    "name" TEXT NOT NULL,
    "location" TEXT,
    "schedule" TEXT,

    CONSTRAINT "Market_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Stand" (
    "id" TEXT NOT NULL,
    "marketId" TEXT NOT NULL,
    "farmerId" TEXT NOT NULL,

    CONSTRAINT "Stand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stock" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "farmerId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "custombyFarmerId" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderLine" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "OrderLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "purchaseId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Farmer_id_key" ON "Farmer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Farmer_email_key" ON "Farmer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Market_name_key" ON "Market"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Stand_id_key" ON "Stand"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_id_key" ON "Stock"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OrderLine_id_key" ON "OrderLine"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_id_key" ON "Purchase"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_id_key" ON "Customer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- AddForeignKey
ALTER TABLE "Farmer" ADD CONSTRAINT "Farmer_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "Market"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stand" ADD CONSTRAINT "Stand_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "Market"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stand" ADD CONSTRAINT "Stand_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_custombyFarmerId_fkey" FOREIGN KEY ("custombyFarmerId") REFERENCES "Farmer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderLine" ADD CONSTRAINT "OrderLine_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderLine" ADD CONSTRAINT "OrderLine_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
