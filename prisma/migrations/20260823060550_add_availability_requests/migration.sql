-- CreateTable
CREATE TABLE "AvailabilityRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "district" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "phone" TEXT,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "AvailabilityRequest_status_idx" ON "AvailabilityRequest"("status");

-- CreateIndex
CREATE INDEX "AvailabilityRequest_createdAt_idx" ON "AvailabilityRequest"("createdAt");
