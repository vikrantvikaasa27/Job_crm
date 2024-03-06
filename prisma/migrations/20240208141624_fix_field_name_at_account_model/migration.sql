/*
  Warnings:

  - You are about to drop the column `usernmae` on the `Account` table. All the data in the column will be lost.
  - Added the required column `username` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "usernmae",
ADD COLUMN     "username" TEXT NOT NULL;
