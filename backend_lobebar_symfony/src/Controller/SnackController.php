<?php

namespace App\Controller;

use App\Entity\SnackTypes;
use App\Entity\SnackUsed;
use App\Entity\User;
use App\Security\Voters\SnackVoter;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Criteria;
use JMS\Serializer\DeserializationContext;
use JMS\Serializer\SerializationContext;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Uid\Uuid;
use const App\Entity\WITH_USED_COUNT;
use const App\Entity\WITH_USER_GROUP;

class SnackController extends _Base_Controller
{


    #[Route("/mod_api/snack/addtype", methods: ["POST"])]
    public function addSnackType(Request $request){
        $snackType = $this->serializer->deserialize($request->getContent(), SnackTypes::class, "json");
        $this->persistFlushConflict($snackType);
        return JsonResponse::fromJsonString($this->serializer->serialize($snackType, 'json'));
    }

    #[Route("/mod_api/snack/deleteType/{snackTypeId}", methods: ["DELETE"])]
    public function deleteSnackType(string $snackTypeId){

        $snackType = $this->doctrine->getManager()->getRepository(SnackTypes::class)->find(Uuid::fromString($snackTypeId));
        $this->doctrine->getManager()->remove($snackType);

        return JsonResponse::fromJsonString($this->serializer->serialize($snackType, 'json'));
    }

    #[Route("/mod_api/snack/updateSnackTypeName/{snackTypeId}/{newName}", methods: ["PUT"])]
    public function updateSnackTypeName(string $snackTypeId, string $newName){
        /** @var SnackTypes $snackType */
        $snackType = $this->doctrine->getManager()->getRepository(SnackTypes::class)->find(Uuid::fromString($snackTypeId));
        $snackType->setName($newName);
        $this->doctrine->getManager()->flush();
        return JsonResponse::fromJsonString($this->serializer->serialize($snackType, 'json'));
    }

    #[Route("/api/snack/used/{snackId}/{userId?}", methods: ["POST"])]
    public function snackUsed(string $snackId, ?string $userId){
        $userLoggedIn = $this->getUser();
        $snackingUser = $userLoggedIn;
        if(!empty($userId)){
            $snackingUser = $this->doctrine->getManager()->getRepository(User::class)->find(Uuid::fromString($userId));
            if(empty($snackingUser)){
                throw new NotFoundHttpException("User Not Found");
            }
        }
        $this->denyAccessUnlessGranted(SnackVoter::ADD_SNACK_USE, $snackingUser);
        $snackType = $this->doctrine->getManager()->getRepository(SnackTypes::class)->find(Uuid::fromString($snackId));
        if(empty($snackType)){
            throw new NotFoundHttpException("Snack Not Found");
        }

        $usedSnack = (new SnackUsed())->setSnackType($snackType)->setUser($snackingUser);
        $this->persistFlushConflict($usedSnack);

        return JsonResponse::fromJsonString($this->serializer->serialize($usedSnack, 'json'));
    }

    #[Route("/api/snacks/own/{start?}/{end?}", methods: ["GET"])]
    public function getOwnSnacks(?int $start, ?int $end):JsonResponse{
        return $this->getUsedSnacks($start, $end, $this->getUser()->convertOwnUuid());
    }


    #[Route("/api/snacks/{start?}/{end?}/{userId?}", methods: ["GET"])]
    public function getUsedSnacks(?int $start, ?int $end, ?string $userId):JsonResponse{

        $snackUsedRepo = $this->doctrine->getManager()->getRepository(SnackUsed::class);
        $userLoggedIn = $this->getUser();
        /** @var User $snackingUser */
        $snackingUser = $userLoggedIn;


        if(!empty($userId)){ // this branch is used if the user is set in the request
            $snackingUser = $this->doctrine->getManager()->getRepository(User::class)->find(Uuid::fromString($userId));
            if(empty($snackingUser)){
                throw new NotFoundHttpException("User Not Found");
            }
            $this->denyAccessUnlessGranted(SnackVoter::SEE_USED, $snackingUser);
            $snacks = $snackUsedRepo->findInTimeOrFull($start, $end, $snackingUser->getId());
            return JsonResponse::fromJsonString($this->serializer->serialize($snacks, "json"));

        }
        else {
            if($this->isGranted("ROLE_MOD")){
                $snacks = $snackUsedRepo->findInTimeOrFull($start, $end);

                return JsonResponse::fromJsonString($this->serializer->serialize($snacks, "json", self::createSerializationContextWithGroups(["Default", WITH_USER_GROUP])));
            }else{
                $snacks = $snackUsedRepo->findInTimeOrFull($start, $end, $userLoggedIn->getId());

                return JsonResponse::fromJsonString($this->serializer->serialize($snacks, "json", self::createSerializationContextWithGroups(["Default", WITH_USER_GROUP])));
            }
        }
    }

    // getAllSnacktypes
    #[Route("/mod_api/snack/types", methods: ["GET"])]
    public function getAllSnackTypes():JsonResponse{
        $snackTypesRepo = $this->doctrine->getManager()->getRepository(SnackTypes::class);
        $snackTypes = $snackTypesRepo->findAll();
        return JsonResponse::fromJsonString($this->serializer->serialize($snackTypes, "json"));
    }

    #[Route("/mod_api/snacks/count/{start?}/{end?}/{userId?}")]
    public function countUsedSnacks(?int $start, ?int $end, ?string $userId){
        $snackTypesRepo = $this->doctrine->getManager()->getRepository(SnackTypes::class);
        $userLoggedIn = $this->getUser();


        $startDateTime = DateTime::createFromFormat('U', $start);
        $endDateTime = DateTime::createFromFormat('U', $end);
        $criteria = Criteria::create()
            ->where(Criteria::expr()->gte('date', $startDateTime))
            ->andWhere(Criteria::expr()->lte('date', $endDateTime));

        /** @var ArrayCollection<SnackTypes> $snackTypes */
        $snackTypes = $snackTypesRepo->findAll();


        /** @var User $snackingUser */
        if(!empty($userId)) { // this branch is used if the user is set in the request
            $snackingUser = $this->doctrine->getManager()->getRepository(User::class)->find(Uuid::fromString($userId));
            if (empty($snackingUser)) {
                throw new NotFoundHttpException("User Not Found");
            }
            $snacks = $snackTypesRepo->countSnacksUsedByDateRange($start, $end, $snackingUser->getId());
        }else{
            $snacks = $snackTypesRepo->countSnacksUsedByDateRange($start, $end);
        }
        return JsonResponse::fromJsonString($this->serializer->serialize($snacks, "json", self::createSerializationContextWithGroups(["Default", WITH_USED_COUNT])));

    }

}
