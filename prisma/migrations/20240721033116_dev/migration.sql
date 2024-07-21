/*
  Warnings:

  - You are about to drop the column `answerId` on the `Option` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Option" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "questionId" TEXT NOT NULL,
    "optionText" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "optionOrder" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Option" ("created_at", "id", "isCorrect", "optionOrder", "optionText", "questionId", "updated_at") SELECT "created_at", "id", "isCorrect", "optionOrder", "optionText", "questionId", "updated_at" FROM "Option";
DROP TABLE "Option";
ALTER TABLE "new_Option" RENAME TO "Option";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
