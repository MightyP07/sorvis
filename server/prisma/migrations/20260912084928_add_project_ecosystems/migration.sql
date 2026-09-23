/*
  Warnings:

  - You are about to drop the column `ecosystemId` on the `Project` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_ecosystemId_fkey";

-- DropIndex
DROP INDEX "Project_ecosystemId_idx";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "ecosystemId";

-- CreateTable
CREATE TABLE "ProjectEcosystem" (
    "projectId" TEXT NOT NULL,
    "ecosystemId" TEXT NOT NULL,

    CONSTRAINT "ProjectEcosystem_pkey" PRIMARY KEY ("projectId","ecosystemId")
);

-- CreateIndex
CREATE INDEX "ProjectEcosystem_ecosystemId_idx" ON "ProjectEcosystem"("ecosystemId");

-- AddForeignKey
ALTER TABLE "ProjectEcosystem" ADD CONSTRAINT "ProjectEcosystem_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectEcosystem" ADD CONSTRAINT "ProjectEcosystem_ecosystemId_fkey" FOREIGN KEY ("ecosystemId") REFERENCES "Ecosystem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
