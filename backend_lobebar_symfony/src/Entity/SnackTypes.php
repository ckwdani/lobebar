<?php

namespace App\Entity;

use App\Repository\SnackTypesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Exclude;
use JMS\Serializer\Annotation\Groups;


const WITH_USED_COUNT= "usedCount";
#[ORM\Entity(repositoryClass: SnackTypesRepository::class)]
class SnackTypes extends _Base_Entity
{

    #[ORM\Column(length: 255, unique: true)]
    private ?string $name = null;

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $value = null;


    #[ORM\OneToMany(mappedBy: 'snackType', targetEntity: SnackUsed::class, cascade: ["remove"], orphanRemoval: true)]
    #[Exclude]
    private Collection $snacksUsed;

    #[Groups(groups: [WITH_USED_COUNT])]
    public int $usedCount = 0;

    public function __construct()
    {
        parent::__construct();
        $this->snacksUsed = new ArrayCollection();
    }


    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getValue(): ?int
    {
        return $this->value;
    }

    public function setValue(int $value): self
    {
        $this->value = $value;

        return $this;
    }

    /**
     * @return Collection<int, SnackUsed>
     */
    public function getSnacksUsed(): Collection
    {
        return $this->snacksUsed;
    }

    public function addSnacksUsed(SnackUsed $snacksUsed): self
    {
        if (!$this->snacksUsed->contains($snacksUsed)) {
            $this->snacksUsed->add($snacksUsed);
            $snacksUsed->setSnackType($this);
        }

        return $this;
    }

    public function removeSnacksUsed(SnackUsed $snacksUsed): self
    {
        if ($this->snacksUsed->removeElement($snacksUsed)) {
            // set the owning side to null (unless already changed)
            if ($snacksUsed->getSnackType() === $this) {
                $snacksUsed->setSnackType(null);
            }
        }

        return $this;
    }
}
