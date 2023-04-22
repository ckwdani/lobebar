<?php

namespace App\Controller;

use App\Entity\SnackTypes;
use App\Entity\SnackUsed;
use App\Entity\User;
use App\Security\Voters\SnackVoter;
use JMS\Serializer\DeserializationContext;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Uid\Uuid;

class SnackController extends _Base_Controller
{


    #[Route("/mod_api/snack/addtype", methods: ["POST"])]
    public function addSnackType(Request $request){
        $snackType = $this->serializer->deserialize($request->getContent(), SnackTypes::class, "json");
        $this->persistFlushConflict($snackType);
        return JsonResponse::fromJsonString($this->serializer->serialize($snackType, 'json'));
    }

    #[Route("/api/snack/used/{snackId}/{userId?}", methods: ["POST"])]
    public function snackUsed(string $snackId, ?string $userId){
        $userLoggedIn = $this->getUser();
        $snackingUser = $userLoggedIn;
        if(!empty($userId)){
            $snackingUser = $this->doctrine->getManager()->getRepository(User::class)->find(Uuid::fromString($userId));
        }
        $this->denyAccessUnlessGranted(SnackVoter::ADD_SNACK_USE, $snackingUser);
        $snackType = $this->doctrine->getManager()->getRepository(SnackTypes::class)->find(Uuid::fromString($snackId));
        if(empty($snackType)){
            throw new NotFoundHttpException();
        }

        $usedSnack = (new SnackUsed())->setSnackType($snackType)->setUser($snackingUser);
        $this->persistFlushConflict($usedSnack);

        return JsonResponse::fromJsonString($this->serializer->serialize($usedSnack, 'json'));
    }
}