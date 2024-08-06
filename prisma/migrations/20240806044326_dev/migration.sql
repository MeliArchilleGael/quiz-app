-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Answer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "questionId" TEXT,
    "resultId" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Answer_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Answer" ("created_at", "id", "questionId", "updated_at", "userId") SELECT "created_at", "id", "questionId", "updated_at", "userId" FROM "Answer";
DROP TABLE "Answer";
ALTER TABLE "new_Answer" RENAME TO "Answer";
CREATE TABLE "new_Result" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "subjectId" TEXT,
    "userScore" INTEGER NOT NULL DEFAULT 0,
    "lastResult" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Result_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Result_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Result" ("created_at", "id", "subjectId", "updated_at", "userId", "userScore") SELECT "created_at", "id", "subjectId", "updated_at", "userId", "userScore" FROM "Result";
DROP TABLE "Result";
ALTER TABLE "new_Result" RENAME TO "Result";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
