<?php

namespace App\Entity;

use App\Repository\ExtraWorkTypesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Exclude;

#[ORM\Entity(repositoryClass: ExtraWorkTypesRepository::class)]
class ExtraWorkTypes extends _Base_Entity
{


    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $value = null;

    #[ORM\OneToMany(mappedBy: 'extraWorkType', targetEntity: DoneExtraWork::class, orphanRemoval: true)]
    #[Exclude]
    private Collection $usersDoneWork;

    public function __construct()
    {
        parent::__construct();
        $this->usersDoneWork = new ArrayCollection();
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
     * @return Collection<int, DoneExtraWork>
     */
    public function getUsersDoneWork(): Collection
    {
        return $this->usersDoneWork;
    }

    public function addUsersDoneWork(DoneExtraWork $usersDoneWork): self
    {
        if (!$this->usersDoneWork->contains($usersDoneWork)) {
            $this->usersDoneWork->add($usersDoneWork);
            $usersDoneWork->setExtraWorkType($this);
        }

        return $this;
    }

    public function removeUsersDoneWork(DoneExtraWork $usersDoneWork): self
    {
        if ($this->usersDoneWork->removeElement($usersDoneWork)) {
            // set the owning side to null (unless already changed)
            if ($usersDoneWork->getExtraWorkType() === $this) {
                $usersDoneWork->setExtraWorkType(null);
            }
        }

        return $this;
    }
}
