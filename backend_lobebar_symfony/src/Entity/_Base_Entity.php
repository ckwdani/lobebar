<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\MappedSuperclass;
use JMS\Serializer\Annotation\Accessor;
use JMS\Serializer\Annotation\AccessType;
use JMS\Serializer\Annotation\Exclude;
use JMS\Serializer\Annotation\PostDeserialize;
use JMS\Serializer\Annotation\Type;
use Symfony\Bridge\Doctrine\IdGenerator\UuidGenerator;
use Symfony\Component\Uid\Uuid;

#[MappedSuperclass]
#[ORM\HasLifecycleCallbacks]
class _Base_Entity
{

    #[ORM\Id]
    #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
    #[ORM\Column(unique: true, type: "uuid")]
//    #[Exclude(if: "deserialize")]
    #[Accessor(getter: 'convertOwnUuid')]
    #[Type('string')]
    protected ?Uuid $id;


    #[PostDeserialize]
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


    public function  convertOwnUuid(): string {

        $id = $this->id;
        return self::convertUuid($id);
    }

    public static function convertUuid(Uuid $uuid): string{
        return $uuid->toRfc4122();
    }


}