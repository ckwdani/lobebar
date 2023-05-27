<?php

namespace App\Controller;

use App\Entity\DoneExtraWork;
use App\Entity\ExtraWorkTypes;
use App\Entity\SnackUsed;
use App\Entity\User;
use App\Security\Voters\SnackVoter;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Uid\Uuid;
use const App\Entity\WITH_USER_GROUP;
use const App\Entity\WITH_USER_GROUP_EW;

class DoneExtraWorkController extends _Base_Controller
{

    #[Route("/api/doneEW/own/{start?}/{end?}", methods: ["GET"])]
    public function getOwnEW(?int $start, ?int $end):JsonResponse{
        return $this->getDoneEW($start, $end, $this->getUser()->convertOwnUuid());
    }


    #[Route("/admin_api/doneEW/{start?}/{end?}/{userId?}", methods: ["GET"])]
    public function getDoneEW(?int $start, ?int $end, ?string $userId):JsonResponse{

        $doneEWREpo = $this->doctrine->getManager()->getRepository(DoneExtraWork::class);
        $userLoggedIn = $this->getUser();
        /** @var User $snackingUser */
        $snackingUser = $userLoggedIn;


        if(!empty($userId)){ // this branch is used if the user is set in the request
            $snackingUser = $this->doctrine->getManager()->getRepository(User::class)->find(Uuid::fromString($userId));
            if(empty($snackingUser)){
                throw new NotFoundHttpException("User Not Found");
            }
            $this->denyAccessUnlessGranted(SnackVoter::SEE_USED, $snackingUser);
            $snacks = $doneEWREpo->findInTimeOrFull($start, $end, $snackingUser->getId());
            return JsonResponse::fromJsonString($this->serializer->serialize($snacks, "json"));

        }
        else {
            if($this->isGranted("ROLE_MOD")){
                $snacks = $doneEWREpo->findInTimeOrFull($start, $end);

                return JsonResponse::fromJsonString($this->serializer->serialize($snacks, "json", self::createSerializationContextWithGroups(["Default"/*, WITH_USER_GROUP_EW*/])));
            }else{
                $snacks = $doneEWREpo->findInTimeOrFull($start, $end, $userLoggedIn->getId());

                return JsonResponse::fromJsonString($this->serializer->serialize($snacks, "json", self::createSerializationContextWithGroups(["Default"/*, WITH_USER_GROUP_EW*/])));
            }
        }
    }


    #[Route("/api/ew_done/used/{snackId}/{amount}/{userId?}", methods: ["POST"])]
    public function ewDone(string $snackId, int $amount, ?string $userId){
        $userLoggedIn = $this->getUser();
        /** @var User $snackingUser */
        $snackingUser = $userLoggedIn;
        if(!empty($userId)){
            $snackingUser = $this->doctrine->getManager()->getRepository(User::class)->find(Uuid::fromString($userId));
            if(empty($snackingUser)){
                throw new NotFoundHttpException("User Not Found");
            }
        }
        $this->denyAccessUnlessGranted(SnackVoter::ADD_SNACK_USE, $snackingUser);
        $ewType = $this->doctrine->getManager()->getRepository(ExtraWorkTypes::class)->find(Uuid::fromString($snackId));
        if(empty($ewType)){
            throw new NotFoundHttpException("Snack Not Found");
        }

        for($i = 0; $i < $amount; $i++){
            $ewD = (new DoneExtraWork())->setExtraWorkType($ewType);
            $ewD->setValueAtInit($ewType->getValue());
            $this->doctrine->getManager()->persist($ewD);
            $snackingUser->addDoneExtrawork($ewD);
        }

//        $usedSnack = ->setUser($snackingUser);
        $this->persistFlushConflict($snackingUser);

        return JsonResponse::fromJsonString($this->serializer->serialize($snackingUser->getDoneExtrawork(), 'json'));
    }

}