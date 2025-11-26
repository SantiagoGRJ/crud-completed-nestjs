/*
  Warnings:

  - You are about to drop the column `user_id` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `role_Id` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_user_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_role_Id_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role_Id";
