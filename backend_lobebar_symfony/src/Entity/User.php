<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use JMS\Serializer\Annotation as Serializer;
use JMS\Serializer\Annotation\Exclude;
use JMS\Serializer\Annotation\ReadOnlyProperty;
use Symfony\Bridge\Doctrine\IdGenerator\UuidGenerator;
use Symfony\Component\Uid\Uuid;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Uid\UuidV4;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User extends _Base_Entity implements UserInterface, PasswordAuthenticatedUserInterface
{


    #[ORM\Column(length: 180, unique: true)]
    private ?string $username = null;

    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    #[Serializer\Groups(groups: ["DeSer" => "DeSer"])]
    private ?string $password = null;

    #[ORM\Column(type: Types::ASCII_STRING, unique: true)]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $firstname = null;

    #[ORM\Column(length: 255)]
    private ?string $lastname = null;

    #[ORM\Column(length: 255)]
    private ?string $titel = null;

    #[ORM\Column]
    private ?bool $hygienepass = null;

    #[ORM\Column(length: 20, nullable: true)]
    private ?string $telephone = null;


    #[ORM\ManyToMany(targetEntity: Shift::class, mappedBy: 'users')]
    #[Serializer\Groups(groups: ["details"])]
    private Collection $shifts;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: DoneExtraWork::class, cascade: ["remove"], orphanRemoval: true)]
    #[Serializer\Groups(groups: ["details"])]
    private Collection $doneExtrawork;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: SnackUsed::class, cascade: ["remove"], orphanRemoval: true)]
    #[Serializer\Groups(groups: ["details"])]
    private Collection $snacksUsed;

    #[ORM\Column]
    #[ReadOnlyProperty(readOnly: true)]
    private ?bool $isApproved = false;

    public function __construct()
    {
        parent::__construct();
        $this->shifts = new ArrayCollection();
        $this->doneExtrawork = new ArrayCollection();
        $this->snacksUsed = new ArrayCollection();
    }





    public function initCollsIfNull(){
        $this->shifts = empty($this->shifts) ?  new ArrayCollection() : $this->shifts;
        $this->doneExtrawork = empty($this->doneExtrawork) ?  new ArrayCollection() : $this->doneExtrawork;
        $this->snacksUsed = empty($this->snacksUsed) ?  new ArrayCollection() : $this->snacksUsed;
    }



    #[Serializer\VirtualProperty(name: "balance")]
    //#[Serializer\Groups(groups: ["list", "details"])]
    public function getBalance(): int
    {
        $positive = $this->shifts->count()  + (int) $this->doneExtrawork->map(function (DoneExtraWork $extraWork) {
            return $extraWork->getExtraWorkType()->getValue();
        })->reduce(function ($carry, $value) {
                return $carry + $value;
            }, 0);
        $negative =  (int) $this->snacksUsed->map(function (SnackUsed $snackUsed) {return $snackUsed->getSnackType()->getValue();})->reduce(function ($carry, $value) {
            return $carry + $value;
        }, 0);
        return $positive - $negative;
    }


    #[Serializer\VirtualProperty(name: "xp")]
    //#[Serializer\Groups(groups: ["list", "details"])]
    public function getXPScore(): int
    {
        $positive = $this->shifts->count()  + (int) $this->doneExtrawork->map(function (DoneExtraWork $extraWork) {
            return $extraWork->getExtraWorkType()->getValue();
        })->reduce(function ($carry, $value) {
                return $carry + $value;
            }, 0);
        return $positive * 14;
    }


    public function getUsername(): ?string{return $this->username;}

    public function setUsername(string $username): self{$this->username = $username;return $this;}

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string{return (string) $this->username;}
    /**
     * @see UserInterface
     */
    public function getRoles(): array{$roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';
        return array_unique($roles);
    }

    public function setRoles(array $roles): self{$this->roles = $roles;return $this;}

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function setEmail($email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self{$this->firstname = $firstname;return $this;}

    public function getLastname(): ?string{return $this->lastname;}
    public function setLastname(string $lastname): self{$this->lastname = $lastname;return $this;}

    public function getTitel(): ?string
    {
        return $this->titel;
    }

    public function setTitel(string $titel): self{$this->titel = $titel; return $this;}

    public function isHygienepass(): ?bool{return $this->hygienepass;}

    public function setHygienepass(bool $hygienepass): self{$this->hygienepass = $hygienepass;return $this;}

    public function getTelephone(): ?string{return $this->telephone;}

    public function setTelephone(?string $telephone): self{$this->telephone = $telephone;return $this;}

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
        $shift->addUser($this);
    }

    return $this;
}

public function removeShift(Shift $shift): self
{
    if ($this->shifts->removeElement($shift)) {
        $shift->removeUser($this);
    }

    return $this;
}

/**
 * @return Collection<int, DoneExtraWork>
 */
public function getDoneExtrawork(): Collection
{
    return $this->doneExtrawork;
}

public function addDoneExtrawork(DoneExtraWork $doneExtrawork): self
{
    if (!$this->doneExtrawork->contains($doneExtrawork)) {
        $this->doneExtrawork->add($doneExtrawork);
        $doneExtrawork->setUser($this);
    }

    return $this;
}

public function removeDoneExtrawork(DoneExtraWork $doneExtrawork): self
{
    if ($this->doneExtrawork->removeElement($doneExtrawork)) {
        // set the owning side to null (unless already changed)
        if ($doneExtrawork->getUser() === $this) {
            $doneExtrawork->setUser(null);
        }
    }

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
        $snacksUsed->setUser($this);
    }

    return $this;
}

public function removeSnacksUsed(SnackUsed $snacksUsed): self
{
    if ($this->snacksUsed->removeElement($snacksUsed)) {
        // set the owning side to null (unless already changed)
        if ($snacksUsed->getUser() === $this) {
            $snacksUsed->setUser(null);
        }
    }

    return $this;
}

public function isIsApproved(): ?bool
{
    return $this->isApproved;
}

public function setIsApproved(): self
{
    $this->isApproved = true;
    return $this;
}
}
