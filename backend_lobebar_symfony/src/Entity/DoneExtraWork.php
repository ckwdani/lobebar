<?php

namespace App\Entity;

use App\Repository\ExtraWorkTypesUserRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ExtraWorkTypesUserRepository::class)]
class DoneExtraWork extends _Base_Entity
{


    #[ORM\ManyToOne(cascade: ["remove"], inversedBy: 'doneExtrawork')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\ManyToOne(cascade: ["remove"], inversedBy: 'usersDoneWork')]
    #[ORM\JoinColumn(nullable: false)]
    private ?ExtraWorkTypes $extraWorkType = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date = null;


    public function __construct()
    {
        parent::__construct();
        $this->date = new \DateTime('now');
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
}
