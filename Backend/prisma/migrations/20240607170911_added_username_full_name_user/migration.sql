/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL DEFAULT 'default',
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "username" TEXT NOT NULL DEFAULT 'default';
