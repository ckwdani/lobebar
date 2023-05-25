<?php

namespace App\Entity;

use App\Repository\DoneExtraWorkRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\PostDeserialize;

const WITH_USER_GROUP_EW = "withUserEW";
#[ORM\Entity(repositoryClass: DoneExtraWorkRepository::class)]
class DoneExtraWork extends _Base_Entity
{


    #[ORM\ManyToOne(cascade: ["remove"], inversedBy: 'doneExtrawork')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(groups: [WITH_USER_GROUP_EW])]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'usersDoneWork')]
    #[ORM\JoinColumn(nullable: true, onDelete: "SET NULL")]
    private ?ExtraWorkTypes $extraWorkType = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column]
    private ?int $valueAtInit = null;


    public function __construct()
    {
        parent::__construct();
        $this->date = new \DateTime('now');
    }


    // after deserialization set valueAtInit to the current value of the extraWorkType
    #[PostDeserialize]
    public function setValue(): void
    {
        $this->valueAtInit = $this->extraWorkType->getValue();
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getExtraWorkType(): ?ExtraWorkTypes
    {
        return $this->extraWorkType;
    }

    public function setExtraWorkType(?ExtraWorkTypes $extraWorkType): self
    {
        $this->extraWorkType = $extraWorkType;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getValueAtInit(): ?int
    {
        return $this->valueAtInit;
    }

    public function setValueAtInit(int $valueAtInit): self
    {
        $this->valueAtInit = $valueAtInit;

        return $this;
    }
}
