<?php

namespace App\Entity;

use App\Repository\SnackUsedRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SnackUsedRepository::class)]
class SnackUsed
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'snacksUsed')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'snacksUsed')]
    #[ORM\JoinColumn(nullable: false)]
    private ?SnackTypes $snackType = null;

    public function getId(): ?int
    {
        return $this->id;
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
}
