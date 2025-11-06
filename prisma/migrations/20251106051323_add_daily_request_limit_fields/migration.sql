-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastRequestDate" TIMESTAMP(3),
ADD COLUMN     "requestCount" INTEGER NOT NULL DEFAULT 0;
