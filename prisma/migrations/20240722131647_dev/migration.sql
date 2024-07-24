-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Subject" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subjectName" TEXT NOT NULL,
    "slug" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL,
    "durationInMinutes" INTEGER NOT NULL,
    "passScore" INTEGER DEFAULT 0,
    "maxScore" INTEGER DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Subject" ("created_at", "description", "durationInMinutes", "id", "passScore", "slug", "subjectName", "updated_at") SELECT "created_at", "description", "durationInMinutes", "id", "passScore", "slug", "subjectName", "updated_at" FROM "Subject";
DROP TABLE "Subject";
ALTER TABLE "new_Subject" RENAME TO "Subject";
CREATE UNIQUE INDEX "Subject_slug_key" ON "Subject"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
