<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230516134223 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE done_extra_work DROP FOREIGN KEY FK_4EC33F4417790D71');
        $this->addSql('ALTER TABLE done_extra_work ADD value_at_init INT NOT NULL, CHANGE extra_work_type_id extra_work_type_id BINARY(16) DEFAULT NULL COMMENT \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE done_extra_work ADD CONSTRAINT FK_4EC33F4417790D71 FOREIGN KEY (extra_work_type_id) REFERENCES extra_work_types (id) ON DELETE SET NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE done_extra_work DROP FOREIGN KEY FK_4EC33F4417790D71');
        $this->addSql('ALTER TABLE done_extra_work DROP value_at_init, CHANGE extra_work_type_id extra_work_type_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE done_extra_work ADD CONSTRAINT FK_4EC33F4417790D71 FOREIGN KEY (extra_work_type_id) REFERENCES extra_work_types (id)');
    }
}
