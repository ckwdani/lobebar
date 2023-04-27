<?php

namespace App\Entity;

use App\Repository\OrgeventRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Persistence\ObjectManager;
use JMS\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation\MaxDepth;
use JMS\Serializer\Annotation\PostDeserialize;
use JMS\Serializer\Annotation\Type;
use Symfony\Component\Uid\Uuid;

const WITH_DETAILED_SHIFTS = "detailed_shifts";
#[ORM\Entity(repositoryClass: OrgeventRepository::class)]
#[ORM\CheckConstraints()]
class Orgevent extends _Base_Entity
{


    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Type("DateTime<'Y-m-d\TH:i:s.u\Z'>")]
    private ?\DateTimeInterface $start = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Type("DateTime<'Y-m-d\TH:i:s.u\Z'>")]
    private ?\DateTimeInterface $end = null;

    #[ORM\OneToMany(mappedBy: 'orgevent', targetEntity: Shift::class, cascade: ["remove", "persist"], orphanRemoval: true)]
    #[Groups(groups: [WITH_DETAILED_SHIFTS])]
    #[Type("ArrayCollection<App\Entity\Shift>")]
    #[MaxDepth(2)]
    private Collection $shifts;

    public function __construct()
    {
        parent::__construct();
        $this->shifts = new ArrayCollection();
    }


//    #[PostDeserialize]
//    public function giveIdToShiftsWithoutEvent(){
//        // go through all shifts and give them an event if they don't have one
//        foreach ($this->shifts as $shift) {
//            if ($shift->getOrgevent() === null) {
//                $shift->setOrgevent($this);
//            }
//        }
//    }

//    public function fixUpShifts(ObjectManager $manager){
//        foreach ($this->shifts as $shift) {
//            if ($shift->getOrgevent() === null) {
//                $shift->setOrgevent($this);
//            }
//            // get shiftype from database
//            //$shift->setType($manager->getRepository(Shiftype::class)->find($shift->getType()->getId()->toBinary()));
////            $shift->setType($manager->getReference(Shiftype::class, Uuid::fromString($shift->getType()->getId())));
//        }
//    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getStart(): ?\DateTimeInterface
    {
        return $this->start;
    }

    public function setStart(\DateTimeInterface $start): self
    {
        $this->start = $start;

        return $this;
    }

    public function getEnd(): ?\DateTimeInterface
    {
        return $this->end;
    }

    public function setEnd(\DateTimeInterface $end): self
    {
        $this->end = $end;

        return $this;
    }

    /**
     * @return Collection<int, Shift>
     */
    public function getShifts(): Collection
    {
        return $this->shifts;
    }

    public function addShift(Shift $shift): self
    {
        if (!$this->shifts->contains($shift)) {
            $this->shifts->add($shift);
            $shift->setOrgevent($this);
        }

        return $this;
    }

    public function removeShift(Shift $shift): self
    {
        if ($this->shifts->removeElement($shift)) {
            // set the owning side to null (unless already changed)
            if ($shift->getOrgevent() === $this) {
                $shift->setOrgevent(null);
            }
        }

        return $this;
    }
}
