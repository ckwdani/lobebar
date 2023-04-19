<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230419152030 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE done_extra_work (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', user_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', extra_work_type_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', date DATETIME NOT NULL, INDEX IDX_4EC33F44A76ED395 (user_id), INDEX IDX_4EC33F4417790D71 (extra_work_type_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE extra_work_types (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', name VARCHAR(255) NOT NULL, value SMALLINT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE orgevent (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', name VARCHAR(255) NOT NULL, start DATETIME NOT NULL, end DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE shift (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', orgevent_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', description VARCHAR(255) DEFAULT NULL, headcount SMALLINT NOT NULL, starttime DATETIME NOT NULL, endtime DATETIME NOT NULL, INDEX IDX_A50B3B4576C05D38 (orgevent_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE shift_user (shift_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', user_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', INDEX IDX_B8AAA986BB70BC0E (shift_id), INDEX IDX_B8AAA986A76ED395 (user_id), PRIMARY KEY(shift_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE shiftype (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE snack_types (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', name VARCHAR(255) NOT NULL, value SMALLINT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE snack_used (id INT AUTO_INCREMENT NOT NULL, user_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', snack_type_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', INDEX IDX_4C39E101A76ED395 (user_id), INDEX IDX_4C39E10168B3B2AB (snack_type_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', username VARCHAR(180) NOT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, email VARCHAR(255) DEFAULT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, titel VARCHAR(255) NOT NULL, hygienepass TINYINT(1) NOT NULL, telephone VARCHAR(20) DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D649F85E0677 (username), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE done_extra_work ADD CONSTRAINT FK_4EC33F44A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE done_extra_work ADD CONSTRAINT FK_4EC33F4417790D71 FOREIGN KEY (extra_work_type_id) REFERENCES extra_work_types (id)');
        $this->addSql('ALTER TABLE shift ADD CONSTRAINT FK_A50B3B4576C05D38 FOREIGN KEY (orgevent_id) REFERENCES orgevent (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE shift_user ADD CONSTRAINT FK_B8AAA986BB70BC0E FOREIGN KEY (shift_id) REFERENCES shift (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE shift_user ADD CONSTRAINT FK_B8AAA986A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE snack_used ADD CONSTRAINT FK_4C39E101A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE snack_used ADD CONSTRAINT FK_4C39E10168B3B2AB FOREIGN KEY (snack_type_id) REFERENCES snack_types (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE done_extra_work DROP FOREIGN KEY FK_4EC33F44A76ED395');
        $this->addSql('ALTER TABLE done_extra_work DROP FOREIGN KEY FK_4EC33F4417790D71');
        $this->addSql('ALTER TABLE shift DROP FOREIGN KEY FK_A50B3B4576C05D38');
        $this->addSql('ALTER TABLE shift_user DROP FOREIGN KEY FK_B8AAA986BB70BC0E');
        $this->addSql('ALTER TABLE shift_user DROP FOREIGN KEY FK_B8AAA986A76ED395');
        $this->addSql('ALTER TABLE snack_used DROP FOREIGN KEY FK_4C39E101A76ED395');
        $this->addSql('ALTER TABLE snack_used DROP FOREIGN KEY FK_4C39E10168B3B2AB');
        $this->addSql('DROP TABLE done_extra_work');
        $this->addSql('DROP TABLE extra_work_types');
        $this->addSql('DROP TABLE orgevent');
        $this->addSql('DROP TABLE shift');
        $this->addSql('DROP TABLE shift_user');
        $this->addSql('DROP TABLE shiftype');
        $this->addSql('DROP TABLE snack_types');
        $this->addSql('DROP TABLE snack_used');
        $this->addSql('DROP TABLE user');
    }
}
