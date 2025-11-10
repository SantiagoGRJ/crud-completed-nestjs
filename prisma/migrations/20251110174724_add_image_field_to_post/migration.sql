/*
  Warnings:

  - A unique constraint covering the columns `[image]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "image" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Post_image_key" ON "Post"("image");
