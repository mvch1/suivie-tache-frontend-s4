-- CreateTable
CREATE TABLE `Notification` (
    `id` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `lue` BOOLEAN NOT NULL DEFAULT false,
    `dateEnvoi` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `destinataireId` VARCHAR(191) NOT NULL,
    `proprietaireId` VARCHAR(191) NOT NULL,
    `Taches_id` VARCHAR(191) NULL,
    `Projets_id` VARCHAR(191) NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_Projets_id_fkey` FOREIGN KEY (`Projets_id`) REFERENCES `Projet`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_destinataireId_fkey` FOREIGN KEY (`destinataireId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_proprietaireId_fkey` FOREIGN KEY (`proprietaireId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_Taches_id_fkey` FOREIGN KEY (`Taches_id`) REFERENCES `Task`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
