-- CreateTable
CREATE TABLE "settings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "siteName" TEXT NOT NULL DEFAULT 'Xelkoom-AI',
    "siteDescription" TEXT NOT NULL DEFAULT 'Votre partenaire en solutions d''Intelligence Artificielle',
    "siteUrl" TEXT NOT NULL DEFAULT 'https://xelkoomai.sn',
    "logoUrl" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "seoKeywords" TEXT,
    "twitterHandle" TEXT,
    "facebookUrl" TEXT,
    "linkedinUrl" TEXT,
    "instagramUrl" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "newsletterEnabled" BOOLEAN NOT NULL DEFAULT true,
    "newsletterProvider" TEXT,
    "newsletterApiKey" TEXT,
    "primaryColor" TEXT NOT NULL DEFAULT '#0D7330',
    "accentColor" TEXT NOT NULL DEFAULT '#10b981',
    "updatedAt" DATETIME NOT NULL
);
