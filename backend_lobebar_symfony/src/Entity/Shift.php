<?php

namespace App\Entity;

use App\Repository\ShiftRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ShiftRepository::class)]
class Shift extends _Base_Entity
{
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $headcount = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $starttime = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $endtime = null;

    #[ORM\ManyToOne(inversedBy: 'shifts')]
    #[ORM\JoinColumn(nullable: false, onDelete: "CASCADE")]
    private ?Orgevent $orgevent = null;

    #[ORM\ManyToMany(targetEntity: User::class, inversedBy: 'shifts')]
    private Collection $users;

    public function __construct()
    {
        parent::__construct();
        $this->users = new ArrayCollection();
    }

    #[ORM\PostPersist]
    #[ORM\PostUpdate]
    #[ORM\PreFlush]
    public function checkHeadCount(): void{
        if ($this->users->count() > $this->headcount) {
            throw new \Exception('Too many users for this shift', 401);
        }
    }






    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

//    public function getHeadcount(): ?int
//    {
//        return $this->headcount;
//    }
//
//    public function setHeadcount(int $headcount): self
//    {
//        $this->headcount = $headcount;
//
//        return $this;
//    }
//
//    public function getStarttime(): ?\DateTimeInterface
//    {
//        return $this->starttime;
//    }
//
//    public function setStarttime(\DateTimeInterface $starttime): self
//    {
//        $this->starttime = $starttime;
//
//        return $this;
//    }
//
//    public function getEndtime(): ?\DateTimeInterface
//    {
//        return $this->endtime;
//    }
//
//    public function setEndtime(\DateTimeInterface $endtime): self
//    {
//        $this->endtime = $endtime;
//
//        return $this;
//    }

    public function getOrgevent(): ?Orgevent
    {
        return $this->orgevent;
    }

    public function setOrgevent(?Orgevent $orgevent): self
    {
        $this->orgevent = $orgevent;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users->add($user);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        $this->users->removeElement($user);

        return $this;
    }
}
