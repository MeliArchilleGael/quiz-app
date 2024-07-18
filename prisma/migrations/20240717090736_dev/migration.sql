/*
  Warnings:

  - You are about to drop the column `end_date` on the `Access` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Access" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "startDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Access_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Access" ("created_at", "id", "startDate", "updated_at", "userId") SELECT "created_at", "id", "startDate", "updated_at", "userId" FROM "Access";
DROP TABLE "Access";
ALTER TABLE "new_Access" RENAME TO "Access";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
