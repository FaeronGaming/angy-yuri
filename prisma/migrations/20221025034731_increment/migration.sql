/*
  Warnings:

  - Added the required column `increment` to the `tip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tip" ADD COLUMN     "increment" DECIMAL(65,30) NOT NULL;
