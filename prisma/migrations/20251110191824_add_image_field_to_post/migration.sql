/*
  Warnings:

  - You are about to drop the column `image` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[path_image]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Post_image_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "image",
ADD COLUMN     "path_image" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Post_path_image_key" ON "Post"("path_image");
