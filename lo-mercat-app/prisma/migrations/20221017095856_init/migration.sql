/*
  Warnings:

  - The primary key for the `Market` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Market` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Market` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Market` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Farmer" DROP CONSTRAINT "Farmer_marketId_fkey";

-- DropForeignKey
ALTER TABLE "Stand" DROP CONSTRAINT "Stand_marketId_fkey";

-- DropIndex
DROP INDEX "Market_id_key";

-- AlterTable
ALTER TABLE "Market" DROP CONSTRAINT "Market_pkey",
DROP COLUMN "id",
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "Market_pkey" PRIMARY KEY ("name");

-- CreateIndex
CREATE UNIQUE INDEX "Market_name_key" ON "Market"("name");

-- AddForeignKey
ALTER TABLE "Farmer" ADD CONSTRAINT "Farmer_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "Market"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stand" ADD CONSTRAINT "Stand_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "Market"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
