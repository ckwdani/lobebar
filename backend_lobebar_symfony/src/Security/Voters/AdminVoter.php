<?php

use App\Entity\User;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class AdminVoter extends Voter
{

    public function __construct(private Security $security) {}
    const ADMIN_VOTER = "admin_voter";

    const ATTR_ARR = [self::ADMIN_VOTER];

    protected function supports(string $attribute, $subject): bool
    {
        return in_array($attribute, self::ATTR_ARR) && ($subject instanceof User) ;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();
        if ($this->security->isGranted("ROLE_ADMIN")) {
            return true;
        }
        return false;
    }
}