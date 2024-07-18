/*
  Warnings:

  - Added the required column `slug` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Subject" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subject_name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration_in_minutes" INTEGER NOT NULL,
    "pass_score" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Subject" ("created_at", "description", "duration_in_minutes", "id", "pass_score", "subject_name", "updated_at") SELECT "created_at", "description", "duration_in_minutes", "id", "pass_score", "subject_name", "updated_at" FROM "Subject";
DROP TABLE "Subject";
ALTER TABLE "new_Subject" RENAME TO "Subject";
CREATE UNIQUE INDEX "Subject_slug_key" ON "Subject"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
