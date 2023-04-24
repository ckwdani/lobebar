<?php

namespace App\Entity;

use App\Repository\SnackUsedRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Groups;

const WITH_USER_GROUP= "withUser";

#[ORM\Entity(repositoryClass: SnackUsedRepository::class)]
#[ORM\HasLifecycleCallbacks]
class SnackUsed extends _Base_Entity
{


    #[ORM\ManyToOne(inversedBy: 'snacksUsed')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(groups: [WITH_USER_GROUP])]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'snacksUsed')]
    #[ORM\JoinColumn(nullable: false)]
    private ?SnackTypes $snackType = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date = null;



    public function __construct()
    {
        parent::__construct();
        $this->setDate();
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

    public function getSnackType(): ?SnackTypes
    {
        return $this->snackType;
    }

    public function setSnackType(?SnackTypes $snackType): self
    {
        $this->snackType = $snackType;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    #[ORM\PrePersist]
    #[ORM\PreFlush]
    private function setDate(): void
    {
        $this->date = new \DateTime("now");
    }
}
