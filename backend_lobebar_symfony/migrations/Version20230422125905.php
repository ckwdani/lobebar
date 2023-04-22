<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230422125905 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE UNIQUE INDEX UNIQ_6BB71FD25E237E06 ON shiftype (name)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_3D6E5F725E237E06 ON snack_types (name)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_6BB71FD25E237E06 ON shiftype');
        $this->addSql('DROP INDEX UNIQ_3D6E5F725E237E06 ON snack_types');
    }
}
