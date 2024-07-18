/*
  Warnings:

  - You are about to drop the column `start_date` on the `Access` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Access` table. All the data in the column will be lost.
  - You are about to drop the column `question_id` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `category_name` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `point_per_question` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `is_correct` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `multiple_choice` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `option_order` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `option_text` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `question_id` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `answer_id` on the `OptionChoose` table. All the data in the column will be lost.
  - You are about to drop the column `option_id` on the `OptionChoose` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `duration_in_seconds` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `media_link` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `question_type` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `subject_id` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `subject_id` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `user_score` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `duration_in_minutes` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `pass_score` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `subject_name` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - Added the required column `startDate` to the `Access` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryName` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optionText` to the `Option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionId` to the `Option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaLink` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durationInMinutes` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passScore` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectName` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Access" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "startDate" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Access_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Access" ("created_at", "end_date", "id", "updated_at") SELECT "created_at", "end_date", "id", "updated_at" FROM "Access";
DROP TABLE "Access";
ALTER TABLE "new_Access" RENAME TO "Access";
CREATE TABLE "new_Answer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "questionId" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Answer" ("created_at", "id", "updated_at") SELECT "created_at", "id", "updated_at" FROM "Answer";
DROP TABLE "Answer";
ALTER TABLE "new_Answer" RENAME TO "Answer";
CREATE TABLE "new_Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "categoryName" TEXT NOT NULL,
    "pointPerQuestion" INTEGER NOT NULL DEFAULT 1,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Category" ("created_at", "id", "updated_at") SELECT "created_at", "id", "updated_at" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE TABLE "new_Option" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "questionId" TEXT NOT NULL,
    "optionText" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "multipleChoice" BOOLEAN NOT NULL DEFAULT false,
    "optionOrder" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "answerId" TEXT,
    CONSTRAINT "Option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Option_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Option" ("answerId", "created_at", "id", "updated_at") SELECT "answerId", "created_at", "id", "updated_at" FROM "Option";
DROP TABLE "Option";
ALTER TABLE "new_Option" RENAME TO "Option";
CREATE TABLE "new_OptionChoose" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "answerId" TEXT,
    "optionId" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "OptionChoose_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "OptionChoose_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_OptionChoose" ("created_at", "id", "updated_at") SELECT "created_at", "id", "updated_at" FROM "OptionChoose";
DROP TABLE "OptionChoose";
ALTER TABLE "new_OptionChoose" RENAME TO "OptionChoose";
CREATE TABLE "new_Question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "categoryId" TEXT,
    "title" TEXT NOT NULL,
    "questionType" TEXT NOT NULL DEFAULT 'text',
    "mediaLink" TEXT NOT NULL,
    "durationInSeconds" INTEGER NOT NULL DEFAULT 10,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "subjectId" TEXT,
    CONSTRAINT "Question_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Question_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Question" ("created_at", "id", "title", "updated_at") SELECT "created_at", "id", "title", "updated_at" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
CREATE TABLE "new_Result" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "subjectId" TEXT,
    "userScore" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Result_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Result_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Result" ("created_at", "id", "updated_at") SELECT "created_at", "id", "updated_at" FROM "Result";
DROP TABLE "Result";
ALTER TABLE "new_Result" RENAME TO "Result";
CREATE TABLE "new_Subject" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subjectName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "durationInMinutes" INTEGER NOT NULL,
    "passScore" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Subject" ("created_at", "description", "id", "updated_at") SELECT "created_at", "description", "id", "updated_at" FROM "Subject";
DROP TABLE "Subject";
ALTER TABLE "new_Subject" RENAME TO "Subject";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_User" ("created_at", "email", "id", "name", "updated_at") SELECT "created_at", "email", "id", "name", "updated_at" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");
