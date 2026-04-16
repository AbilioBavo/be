/*
  Manual migration:
  - Create Category table
  - Create categories from existing Product.category values
  - Add nullable categoryId
  - Backfill categoryId
  - Make it required
  - Drop old category column
*/

-- 1. Create the Category table first
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- 2. Insert unique categories from existing Product.category values
INSERT INTO "Category" (
    "id",
    "name",
    "createdAt",
    "updatedAt"
)
SELECT
    gen_random_uuid()::text,
    "category",
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM "Product"
WHERE "category" IS NOT NULL
GROUP BY "category";

-- 3. Add categoryId as nullable first
ALTER TABLE "Product"
ADD COLUMN "categoryId" TEXT;

-- 4. Populate categoryId by matching category names
UPDATE "Product" p
SET "categoryId" = c."id"
FROM "Category" c
WHERE p."category" = c."name";

-- 5. Make it required after data is populated
ALTER TABLE "Product"
ALTER COLUMN "categoryId" SET NOT NULL;

-- 6. Add foreign key
ALTER TABLE "Product"
ADD CONSTRAINT "Product_categoryId_fkey"
FOREIGN KEY ("categoryId")
REFERENCES "Category"("id")
ON DELETE RESTRICT
ON UPDATE CASCADE;

-- 7. Drop old category column
ALTER TABLE "Product"
DROP COLUMN "category";