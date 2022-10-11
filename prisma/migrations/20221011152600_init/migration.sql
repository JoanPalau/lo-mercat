/*
  Warnings:

  - You are about to drop the column `custom` on the `Product` table. All the data in the column will be lost.
  - The primary key for the `Farmer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `customerId` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchaseId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `farmerId` to the `Stand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marketId` to the `Stand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marketId` to the `Farmer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `OrderLine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `OrderLine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `farmerId` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Purchase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerId" TEXT NOT NULL,
    CONSTRAINT "Purchase_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Purchase" ("created_at", "id") SELECT "created_at", "id" FROM "Purchase";
DROP TABLE "Purchase";
ALTER TABLE "new_Purchase" RENAME TO "Purchase";
CREATE UNIQUE INDEX "Purchase_id_key" ON "Purchase"("id");
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "completed" BOOLEAN NOT NULL,
    "purchaseId" TEXT NOT NULL,
    CONSTRAINT "Order_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("completed", "id") SELECT "completed", "id" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "custombyFarmerId" TEXT,
    CONSTRAINT "Product_custombyFarmerId_fkey" FOREIGN KEY ("custombyFarmerId") REFERENCES "Farmer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("id", "name") SELECT "id", "name" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");
CREATE TABLE "new_Stand" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "marketId" TEXT NOT NULL,
    "farmerId" TEXT NOT NULL,
    CONSTRAINT "Stand_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "Market" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Stand_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Stand" ("id") SELECT "id" FROM "Stand";
DROP TABLE "Stand";
ALTER TABLE "new_Stand" RENAME TO "Stand";
CREATE UNIQUE INDEX "Stand_id_key" ON "Stand"("id");
CREATE TABLE "new_Farmer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "registration_time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "birthday" DATETIME NOT NULL,
    "marketId" TEXT NOT NULL,
    CONSTRAINT "Farmer_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "Market" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Farmer" ("birthday", "email", "id", "name", "password", "registration_time") SELECT "birthday", "email", "id", "name", "password", "registration_time" FROM "Farmer";
DROP TABLE "Farmer";
ALTER TABLE "new_Farmer" RENAME TO "Farmer";
CREATE UNIQUE INDEX "Farmer_id_key" ON "Farmer"("id");
CREATE UNIQUE INDEX "Farmer_email_key" ON "Farmer"("email");
CREATE TABLE "new_OrderLine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quantity" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    CONSTRAINT "OrderLine_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderLine_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderLine" ("cost", "id", "quantity") SELECT "cost", "id", "quantity" FROM "OrderLine";
DROP TABLE "OrderLine";
ALTER TABLE "new_OrderLine" RENAME TO "OrderLine";
CREATE UNIQUE INDEX "OrderLine_id_key" ON "OrderLine"("id");
CREATE TABLE "new_Stock" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quantity" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "farmerId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "Stock_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Stock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Stock" ("cost", "id", "quantity") SELECT "cost", "id", "quantity" FROM "Stock";
DROP TABLE "Stock";
ALTER TABLE "new_Stock" RENAME TO "Stock";
CREATE UNIQUE INDEX "Stock_id_key" ON "Stock"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
