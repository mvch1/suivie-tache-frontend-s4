-- DropForeignKey
ALTER TABLE `projet` DROP FOREIGN KEY `Projet_ownerId_fkey`;

-- DropIndex
DROP INDEX `Projet_ownerId_key` ON `projet`;

-- AddForeignKey
ALTER TABLE `Projet` ADD CONSTRAINT `Projet_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
