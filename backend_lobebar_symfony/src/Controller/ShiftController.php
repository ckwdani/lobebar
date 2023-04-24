<?php

namespace App\Controller;

use App\Entity\Shiftype;
use App\Entity\SnackTypes;
use JMS\Serializer\EventDispatcher\Event;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Uid\Uuid;

class ShiftController
{
    #[Route("/mod_api/shift/addtype", methods: ["POST"])]
    public function addShiftType(Request $request){
        $shiftType = $this->serializer->deserialize($request->getContent(), Shiftype::class, "json");
        $this->persistFlushConflict($shiftType);
        return JsonResponse::fromJsonString($this->serializer->serialize($shiftType, 'json'));
    }



}