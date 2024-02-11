/*
  Warnings:

  - You are about to drop the column `dishId` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `dishOptionId` on the `Choice` table. All the data in the column will be lost.
  - You are about to drop the column `dishId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `restaurantId` on the `Favourite` table. All the data in the column will be lost.
  - You are about to drop the column `restaurantId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `dishId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Dish` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DishLike` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DishOption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DishRating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DishReview` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Restaurant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RestaurantRating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RestaurantReview` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `clothingItemId` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clothingItemOptionId` to the `Choice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clothingItemId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopId` to the `Favourite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clothingItemId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_dishId_fkey";

-- DropForeignKey
ALTER TABLE "Choice" DROP CONSTRAINT "Choice_dishOptionId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_dishId_fkey";

-- DropForeignKey
ALTER TABLE "Dish" DROP CONSTRAINT "Dish_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "DishLike" DROP CONSTRAINT "DishLike_dishId_fkey";

-- DropForeignKey
ALTER TABLE "DishLike" DROP CONSTRAINT "DishLike_userId_fkey";

-- DropForeignKey
ALTER TABLE "DishOption" DROP CONSTRAINT "DishOption_dishId_fkey";

-- DropForeignKey
ALTER TABLE "DishRating" DROP CONSTRAINT "DishRating_dishId_fkey";

-- DropForeignKey
ALTER TABLE "DishRating" DROP CONSTRAINT "DishRating_userId_fkey";

-- DropForeignKey
ALTER TABLE "DishReview" DROP CONSTRAINT "DishReview_dishId_fkey";

-- DropForeignKey
ALTER TABLE "DishReview" DROP CONSTRAINT "DishReview_userId_fkey";

-- DropForeignKey
ALTER TABLE "Favourite" DROP CONSTRAINT "Favourite_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_dishId_fkey";

-- DropForeignKey
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_id_fkey";

-- DropForeignKey
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "RestaurantRating" DROP CONSTRAINT "RestaurantRating_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "RestaurantRating" DROP CONSTRAINT "RestaurantRating_userId_fkey";

-- DropForeignKey
ALTER TABLE "RestaurantReview" DROP CONSTRAINT "RestaurantReview_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "RestaurantReview" DROP CONSTRAINT "RestaurantReview_userId_fkey";

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "dishId",
ADD COLUMN     "clothingItemId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Choice" DROP COLUMN "dishOptionId",
ADD COLUMN     "clothingItemOptionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "dishId",
ADD COLUMN     "clothingItemId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Favourite" DROP COLUMN "restaurantId",
ADD COLUMN     "shopId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "restaurantId",
ADD COLUMN     "shopId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "dishId",
ADD COLUMN     "clothingItemId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Dish";

-- DropTable
DROP TABLE "DishLike";

-- DropTable
DROP TABLE "DishOption";

-- DropTable
DROP TABLE "DishRating";

-- DropTable
DROP TABLE "DishReview";

-- DropTable
DROP TABLE "Restaurant";

-- DropTable
DROP TABLE "RestaurantRating";

-- DropTable
DROP TABLE "RestaurantReview";

-- CreateTable
CREATE TABLE "Shop" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "coverImg" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "ownerId" TEXT NOT NULL,
    "clothingCategoryId" INTEGER,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClothingCategory" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "coverImg" TEXT NOT NULL,

    CONSTRAINT "ClothingCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClothingItem" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "photo" TEXT NOT NULL,
    "shopId" INTEGER NOT NULL,
    "ratingId" INTEGER NOT NULL,

    CONSTRAINT "ClothingItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShopCategory" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "coverImg" TEXT NOT NULL,

    CONSTRAINT "ShopCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClothingItemLike" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "clothingItemId" INTEGER NOT NULL,

    CONSTRAINT "ClothingItemLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClothingItemOption" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "extra" DOUBLE PRECISION NOT NULL,
    "clothingItemId" INTEGER NOT NULL,

    CONSTRAINT "ClothingItemOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClothingItemReview" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "text" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "clothingItemId" INTEGER NOT NULL,

    CONSTRAINT "ClothingItemReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShopReview" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "text" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "shopId" INTEGER NOT NULL,

    CONSTRAINT "ShopReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClothingItemRating" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "clothingItemId" INTEGER NOT NULL,

    CONSTRAINT "ClothingItemRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShopRating" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "shopId" INTEGER NOT NULL,

    CONSTRAINT "ShopRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ShopToShopCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ClothingCategoryToClothingItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Shop_ownerId_key" ON "Shop"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "ClothingItemLike_userId_key" ON "ClothingItemLike"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ClothingItemReview_userId_key" ON "ClothingItemReview"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ShopReview_userId_key" ON "ShopReview"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ClothingItemRating_userId_key" ON "ClothingItemRating"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ShopRating_userId_key" ON "ShopRating"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_ShopToShopCategory_AB_unique" ON "_ShopToShopCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_ShopToShopCategory_B_index" ON "_ShopToShopCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClothingCategoryToClothingItem_AB_unique" ON "_ClothingCategoryToClothingItem"("A", "B");

-- CreateIndex
CREATE INDEX "_ClothingCategoryToClothingItem_B_index" ON "_ClothingCategoryToClothingItem"("B");

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_clothingCategoryId_fkey" FOREIGN KEY ("clothingCategoryId") REFERENCES "ClothingCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClothingItem" ADD CONSTRAINT "ClothingItem_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_clothingItemId_fkey" FOREIGN KEY ("clothingItemId") REFERENCES "ClothingItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_clothingItemId_fkey" FOREIGN KEY ("clothingItemId") REFERENCES "ClothingItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favourite" ADD CONSTRAINT "Favourite_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClothingItemLike" ADD CONSTRAINT "ClothingItemLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClothingItemLike" ADD CONSTRAINT "ClothingItemLike_clothingItemId_fkey" FOREIGN KEY ("clothingItemId") REFERENCES "ClothingItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_clothingItemId_fkey" FOREIGN KEY ("clothingItemId") REFERENCES "ClothingItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClothingItemOption" ADD CONSTRAINT "ClothingItemOption_clothingItemId_fkey" FOREIGN KEY ("clothingItemId") REFERENCES "ClothingItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Choice" ADD CONSTRAINT "Choice_clothingItemOptionId_fkey" FOREIGN KEY ("clothingItemOptionId") REFERENCES "ClothingItemOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClothingItemReview" ADD CONSTRAINT "ClothingItemReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClothingItemReview" ADD CONSTRAINT "ClothingItemReview_clothingItemId_fkey" FOREIGN KEY ("clothingItemId") REFERENCES "ClothingItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopReview" ADD CONSTRAINT "ShopReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopReview" ADD CONSTRAINT "ShopReview_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClothingItemRating" ADD CONSTRAINT "ClothingItemRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClothingItemRating" ADD CONSTRAINT "ClothingItemRating_clothingItemId_fkey" FOREIGN KEY ("clothingItemId") REFERENCES "ClothingItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopRating" ADD CONSTRAINT "ShopRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopRating" ADD CONSTRAINT "ShopRating_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShopToShopCategory" ADD CONSTRAINT "_ShopToShopCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShopToShopCategory" ADD CONSTRAINT "_ShopToShopCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "ShopCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClothingCategoryToClothingItem" ADD CONSTRAINT "_ClothingCategoryToClothingItem_A_fkey" FOREIGN KEY ("A") REFERENCES "ClothingCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClothingCategoryToClothingItem" ADD CONSTRAINT "_ClothingCategoryToClothingItem_B_fkey" FOREIGN KEY ("B") REFERENCES "ClothingItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
