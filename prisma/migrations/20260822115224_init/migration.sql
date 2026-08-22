-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "PointOfPresence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "district" TEXT NOT NULL,
    "generalArea" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "name" TEXT,
    "btrcPopId" TEXT,
    "exactAddress" TEXT,
    "latitude" REAL,
    "longitude" REAL,
    "nttnProvider" TEXT,
    "linkId" TEXT,
    "vlan" TEXT,
    "ipAddress" TEXT,
    "oltInfo" TEXT,
    "routerSwitchInfo" TEXT,
    "internalCapacityMbps" INTEGER,
    "topologyNotes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE INDEX "PointOfPresence_district_idx" ON "PointOfPresence"("district");

-- CreateIndex
CREATE INDEX "PointOfPresence_status_idx" ON "PointOfPresence"("status");
