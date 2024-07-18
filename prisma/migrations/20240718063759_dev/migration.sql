/*
  Warnings:

  - You are about to drop the column `multipleChoice` on the `Option` table. All the data in the column will be lost.

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
    "answerId" TEXT,
    CONSTRAINT "Option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Option_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Option" ("answerId", "created_at", "id", "isCorrect", "optionOrder", "optionText", "questionId", "updated_at") SELECT "answerId", "created_at", "id", "isCorrect", "optionOrder", "optionText", "questionId", "updated_at" FROM "Option";
DROP TABLE "Option";
ALTER TABLE "new_Option" RENAME TO "Option";
CREATE TABLE "new_Question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "categoryId" TEXT,
    "title" TEXT NOT NULL,
    "questionType" TEXT NOT NULL DEFAULT 'text',
    "mediaLink" TEXT NOT NULL,
    "durationInSeconds" INTEGER NOT NULL DEFAULT 10,
    "multipleChoice" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "subjectId" TEXT,
    CONSTRAINT "Question_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Question_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Question" ("categoryId", "created_at", "durationInSeconds", "id", "mediaLink", "questionType", "subjectId", "title", "updated_at") SELECT "categoryId", "created_at", "durationInSeconds", "id", "mediaLink", "questionType", "subjectId", "title", "updated_at" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
CREATE TABLE "new_Subject" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subjectName" TEXT NOT NULL,
    "slug" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL,
    "durationInMinutes" INTEGER NOT NULL,
    "passScore" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Subject" ("created_at", "description", "durationInMinutes", "id", "passScore", "subjectName", "updated_at") SELECT "created_at", "description", "durationInMinutes", "id", "passScore", "subjectName", "updated_at" FROM "Subject";
DROP TABLE "Subject";
ALTER TABLE "new_Subject" RENAME TO "Subject";
CREATE UNIQUE INDEX "Subject_slug_key" ON "Subject"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
