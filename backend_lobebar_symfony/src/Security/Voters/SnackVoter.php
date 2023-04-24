<?php

namespace App\Security\Voters;

use App\Entity\SnackUsed;
use App\Entity\User;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class SnackVoter extends Voter
{

    const ADD_SNACK_USE = "add_snack_use";
    const SEE_USED = "see_all_used";

    const ATTR_ARR = [self::ADD_SNACK_USE, self::SEE_USED];

    public function __construct(private Security $security) {}


    protected function supports(string $attribute, $subject): bool
    {
        // Only support the "VIEW" attribute and the subject is an instance of the Entry class
        return in_array($attribute, self::ATTR_ARR) && ($subject instanceof User || $subject instanceof SnackUsed) ;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {
        // Get the current user from the token
        $user = $token->getUser();



        // Default to denying access
        switch ($attribute){
            case self::ADD_SNACK_USE: return $this->canAddUsedSnack($user, $subject);
            case self::SEE_USED: return $this->canAddUsedSnack($user, $subject);
        }
        return false;

    }


    protected function canAddUsedSnack(User $loggedInUser, User $snackingUser){
        assert($snackingUser instanceof User);

        if ($this->security->isGranted("ROLE_MOD")) {
            return true;
        }

        // Check if the user is the same as the user that is getting the entry
        if ($snackingUser === $loggedInUser) {
            return true;
        }
        return false;
    }
}