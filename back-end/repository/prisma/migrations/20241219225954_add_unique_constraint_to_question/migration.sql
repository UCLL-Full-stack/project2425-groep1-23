/*
  Warnings:

  - A unique constraint covering the columns `[question]` on the table `Flashcard` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Flashcard_question_key" ON "Flashcard"("question");
