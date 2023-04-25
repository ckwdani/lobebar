<?php

namespace App\Controller;

use App\Entity\Orgevent;
use App\Entity\Shift;
use App\Entity\Shiftype;
use App\Entity\SnackTypes;
use JMS\Serializer\EventDispatcher\Event;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Uid\Uuid;

class ShiftController extends _Base_Controller
{
    #[Route("/mod_api/shift/addtype", methods: ["POST"])]
    public function addShiftType(Request $request){
        $shiftType = $this->serializer->deserialize($request->getContent(), Shiftype::class, "json");
        $this->persistFlushConflict($shiftType);
        return JsonResponse::fromJsonString($this->serializer->serialize($shiftType, 'json'));
    }

    #[Route("/mod_api/shift/deletetype/{shiftTypeId}", methods: ["DELETE"])]
    public function deleteShiftType(string $shiftTypeId){
        $shiftType = $this->doctrine->getManager()->getRepository(Shiftype::class)->find(Uuid::fromString($shiftTypeId));
        if(empty($shiftType)){
            throw new NotFoundHttpException();
        }
        $this->doctrine->getManager()->remove($shiftType);
        $this->doctrine->getManager()->flush();
        return JsonResponse::fromJsonString($this->serializer->serialize($shiftType, 'json'));
    }

    // get shift types
    #[Route("/api/getShiftTypes", methods: ["GET"])]
    public function getShiftTypes(){
        $shiftTypes = $this->doctrine->getManager()->getRepository(Shiftype::class)->findAll();
        if(empty($shiftTypes)){
            throw new NotFoundHttpException();
        }
        return JsonResponse::fromJsonString($this->serializer->serialize($shiftTypes, 'json'));
    }



    #[Route("/api/getEventShifts/{eventId}", methods: ["GET"])]
    public function getShiftsFromEvent(string $eventId){

        $shifts = $this->doctrine->getManager()->getRepository(Shift::class)->findBy(['event' => Uuid::fromString($eventId)]);
        if(empty($shifts)){
            throw new NotFoundHttpException();
        }
        return JsonResponse::fromJsonString($this->serializer->serialize($shifts, 'json'));

    }


    // get shifts from user ordered by event start date with pagination based on start and end unix timestamps
    #[Route("/api/getUserShifts/{userId}/{start}/{end}", methods: ["GET"])]
    public function getUserShifts(string $userId, int $start, int $end){

        $shifts = $this->doctrine->getManager()->getRepository(Shift::class)->getUserShiftsTimed($start, $end, Uuid::fromString($userId));
        return JsonResponse::fromJsonString($this->serializer->serialize($shifts, 'json'));

    }

    // get outstanding shifts where the headcount is not met by the number of users related to the shift via the shift_user table
    #[Route("/api/getOutstandingShifts/{start}/{end}/{user_id}", methods: ["GET"])]
    public function getOutstandingShifts(int $start, int $end, string $user_id){
        $shifts = $this->doctrine->getManager()->getRepository(Shift::class)->getOutstandingShifts($start, $end, Uuid::fromString($user_id));
        return JsonResponse::fromJsonString($this->serializer->serialize($shifts, 'json'));
    }





    // function for adding a shift to an event
    #[Route("/mod_api/shift/add/{eventId}", methods: ["POST"])]
    public function addShift(Request $request, string $eventId){
        $shift = $this->serializer->deserialize($request->getContent(), Shift::class, "json");
        /** @var Orgevent $event */
        $event = $this->doctrine->getManager()->getRepository(Orgevent::class)->find(Uuid::fromString($eventId));
        $event->addShift($shift);
        $this->doctrine->getManager()->persist($shift);
        $this->doctrine->getManager()->flush();
        return JsonResponse::fromJsonString($this->serializer->serialize($shift, 'json'));
    }

    // function for deleting a shift from an event
    #[Route("/mod_api/shift/delete/{shiftId}", methods: ["DELETE"])]
    public function deleteShift(string $shiftId){
        $shift = $this->doctrine->getManager()->getRepository(Shift::class)->find(Uuid::fromString($shiftId));
        if(empty($shift)){
            throw new NotFoundHttpException();
        }
        $this->doctrine->getManager()->remove($shift);
        $this->doctrine->getManager()->flush();
        return JsonResponse::fromJsonString($this->serializer->serialize($shift, 'json'));
    }




}