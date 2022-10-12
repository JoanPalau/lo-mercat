/*
  Warnings:

  - Added the required column `gender` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthday" DATETIME NOT NULL,
    "gender" TEXT NOT NULL
);
INSERT INTO "new_Customer" ("birthday", "email", "id", "name", "password") SELECT "birthday", "email", "id", "name", "password" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_id_key" ON "Customer"("id");
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
