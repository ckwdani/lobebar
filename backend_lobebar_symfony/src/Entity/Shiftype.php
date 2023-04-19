<?php

namespace App\Entity;

use App\Repository\ShiftypeRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ShiftypeRepository::class)]
class Shiftype extends _Base_Entity
{


    #[ORM\Column(length: 255)]
    private ?string $name = null;



    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }
}
