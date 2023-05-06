<?php

namespace App\Security\Voters;

use App\Entity\User;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class AdminOrOwnerVoter extends Voter
{

    public function __construct(private Security $security) {}
    const CAN_EDIT_ADMIN_OR_VOTER = "can_edit_admin_or_voter";

    const ATTR_ARR = [self::CAN_EDIT_ADMIN_OR_VOTER];

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

        // Check if the user is the same as the user that is getting the entry
        if ($subject === $user) {
            return true;
        }
        return false;
    }
}