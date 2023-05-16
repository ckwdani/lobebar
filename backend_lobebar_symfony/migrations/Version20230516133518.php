<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230516133518 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE shift DROP FOREIGN KEY FK_A50B3B45C54C8C93');
        $this->addSql('ALTER TABLE shift CHANGE type_id type_id BINARY(16) DEFAULT NULL COMMENT \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE shift ADD CONSTRAINT FK_A50B3B45C54C8C93 FOREIGN KEY (type_id) REFERENCES shiftype (id) ON DELETE SET NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE shift DROP FOREIGN KEY FK_A50B3B45C54C8C93');
        $this->addSql('ALTER TABLE shift CHANGE type_id type_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE shift ADD CONSTRAINT FK_A50B3B45C54C8C93 FOREIGN KEY (type_id) REFERENCES shiftype (id)');
    }
}
