-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "deletedAt" SET DEFAULT null;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
