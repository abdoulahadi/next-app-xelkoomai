-- CreateTable
CREATE TABLE "realizations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "benefits" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "link" TEXT,
    "icon" TEXT NOT NULL DEFAULT 'Sparkles',
    "published" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "realizations_published_idx" ON "realizations"("published");

-- CreateIndex
CREATE INDEX "realizations_order_idx" ON "realizations"("order");
