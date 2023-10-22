/*
  Warnings:

  - You are about to drop the column `code` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[reference]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Made the column `reference` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Product_code_key";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "deletedAt" SET DEFAULT null;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "code",
ADD COLUMN     "description" TEXT,
ALTER COLUMN "reference" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_reference_key" ON "Product"("reference");
