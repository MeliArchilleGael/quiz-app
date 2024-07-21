-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "categoryId" TEXT,
    "title" TEXT NOT NULL,
    "questionType" TEXT NOT NULL DEFAULT 'text',
    "mediaLink" TEXT,
    "mediaType" TEXT,
    "durationInSeconds" INTEGER,
    "multipleChoice" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "subjectId" TEXT,
    CONSTRAINT "Question_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Question_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Question" ("categoryId", "created_at", "durationInSeconds", "id", "mediaLink", "mediaType", "multipleChoice", "questionType", "subjectId", "title", "updated_at") SELECT "categoryId", "created_at", "durationInSeconds", "id", "mediaLink", "mediaType", "multipleChoice", "questionType", "subjectId", "title", "updated_at" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
