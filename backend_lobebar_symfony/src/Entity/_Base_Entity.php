<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\MappedSuperclass;
use JMS\Serializer\Annotation\Accessor;
use Symfony\Bridge\Doctrine\IdGenerator\UuidGenerator;
use Symfony\Component\Uid\Uuid;

#[MappedSuperclass]
class _Base_Entity
{

    #[ORM\Id]
    #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
    #[ORM\Column(unique: true, type: "uuid")]
    #[Accessor(['convertOwnUuid'])]
    protected ?Uuid $id;



    function __construct()
    {
        $this->id = Uuid::v4();
    }

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function setId(string $uuid){
        $this->id = Uuid::fromString($uuid);
    }


    public function  convertOwnUuid() {
        $id = $this->id;
        return self::convertUuid($id);
    }

    public static function convertUuid(Uuid $uuid){
        return $uuid->toRfc4122();
    }


}