-- CreateEnum
CREATE TYPE "InspectionStatus" AS ENUM ('PENDING_UPLOAD', 'PENDING_AI', 'ANALYZED', 'MINTED');

-- CreateEnum
CREATE TYPE "DamageClass" AS ENUM ('shattered_glass', 'flat_tire', 'broken_lamp', 'dent', 'scratch', 'crack');

-- CreateEnum
CREATE TYPE "DamageSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "Inspection" (
    "id" TEXT NOT NULL,
    "vehicleLabel" TEXT,
    "plate" TEXT NOT NULL,
    "vin" TEXT NOT NULL,
    "status" "InspectionStatus" NOT NULL DEFAULT 'PENDING_UPLOAD',
    "score" INTEGER,
    "totalDamages" INTEGER,
    "avgConfidence" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inspection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InspectionImage" (
    "id" TEXT NOT NULL,
    "inspectionId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "orderIndex" INTEGER NOT NULL,

    CONSTRAINT "InspectionImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InspectionDamage" (
    "id" TEXT NOT NULL,
    "inspectionId" TEXT NOT NULL,
    "imageId" TEXT,
    "clazz" "DamageClass" NOT NULL,
    "severity" "DamageSeverity" NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "location" TEXT,
    "bbox" JSONB,

    CONSTRAINT "InspectionDamage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VctToken" (
    "id" TEXT NOT NULL,
    "inspectionId" TEXT NOT NULL,
    "policyId" TEXT NOT NULL,
    "assetName" TEXT NOT NULL,
    "txHash" TEXT NOT NULL,
    "network" TEXT NOT NULL,
    "mintedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB NOT NULL,

    CONSTRAINT "VctToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VctToken_inspectionId_key" ON "VctToken"("inspectionId");

-- AddForeignKey
ALTER TABLE "InspectionImage" ADD CONSTRAINT "InspectionImage_inspectionId_fkey" FOREIGN KEY ("inspectionId") REFERENCES "Inspection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InspectionDamage" ADD CONSTRAINT "InspectionDamage_inspectionId_fkey" FOREIGN KEY ("inspectionId") REFERENCES "Inspection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VctToken" ADD CONSTRAINT "VctToken_inspectionId_fkey" FOREIGN KEY ("inspectionId") REFERENCES "Inspection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
