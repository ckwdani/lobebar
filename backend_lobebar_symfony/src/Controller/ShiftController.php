<?php

namespace App\Controller;

use App\Entity\DoneExtraWork;
use App\Entity\ExtraWorkTypes;
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
    #[Route("/mod_api/ew_types/addtype", methods: ["POST"])]
    public function addDoneEWTypes(Request $request){
        $shiftType = $this->serializer->deserialize($request->getContent(), ExtraWorkTypes::class, "json");
        $this->persistFlushConflict($shiftType);
        return JsonResponse::fromJsonString($this->serializer->serialize($shiftType, 'json'));
    }

    #[Route("/mod_api/ew_types/deletetype/{ew_type_id}", methods: ["DELETE"])]
    public function deleteDoneEWTypes(string $ew_type_id){
        $shiftType = $this->doctrine->getManager()->getRepository(ExtraWorkTypes::class)->find(Uuid::fromString($ew_type_id));
        if(empty($shiftType)){
            throw new NotFoundHttpException();
        }
        $this->doctrine->getManager()->remove($shiftType);
        $this->doctrine->getManager()->flush();
        return JsonResponse::fromJsonString($this->serializer->serialize($shiftType, 'json'));
    }



    // update ew type name
    #[Route("/mod_api/ew_types/updatetype/{ew_type_id}", methods: ["PUT"])]
    public function updateDoneEWTypes(Request $request, string $ew_type_id){
        $shiftTypeChanges = $this->serializer->deserialize($request->getContent(), ExtraWorkTypes::class, "json");
        /** @var ExtraWorkTypes $shiftType */
        $shiftType = $this->doctrine->getManager()->getRepository(ExtraWorkTypes::class)->find(Uuid::fromString($ew_type_id));
        if(empty($shiftType)){
            throw new NotFoundHttpException();
        }

        if ($shiftTypeChanges->getName()) {
            $shiftType->setName($shiftTypeChanges->getName());
        }
        $this->persistFlushConflict($shiftType);
        return JsonResponse::fromJsonString($this->serializer->serialize($shiftType, 'json'));
    }


    // get shift types
    #[Route("/api/getewtypes", methods: ["GET"])]
    public function getDoneEWTypes(){
        $shiftTypes = $this->doctrine->getManager()->getRepository(ExtraWorkTypes::class)->findAll();
//        if(empty($shiftTypes)){
//            throw new NotFoundHttpException();
//        }
        return JsonResponse::fromJsonString($this->serializer->serialize($shiftTypes, 'json'));
    }

    // update shifttypes name
    #[Route("/mod_api/shift/updatetype/{shiftTypeId}", methods: ["PUT"])]
    public function updateShiftType(Request $request, string $shiftTypeId){
        $shiftTypeChanges = $this->serializer->deserialize($request->getContent(), Shiftype::class, "json");
        /** @var Shiftype $shiftType */
        $shiftType = $this->doctrine->getManager()->getRepository(Shiftype::class)->find(Uuid::fromString($shiftTypeId));
        if(empty($shiftType)){
            throw new NotFoundHttpException();
        }

        if ($shiftTypeChanges->getName()) {
            $shiftType->setName($shiftTypeChanges->getName());
        }
        $this->persistFlushConflict($shiftType);
        return JsonResponse::fromJsonString($this->serializer->serialize($shiftType, 'json'));
    }
    // assign logged in user to shift given by the shiftid
    #[Route("/api/assignShift/{shiftId}", methods: ["POST"])]
    public function assignShift(string $shiftId){
        /** @var Shift $shift */
        $shift = $this->doctrine->getManager()->getRepository(Shift::class)->find(Uuid::fromString($shiftId));
        if(empty($shift)){
            throw new NotFoundHttpException();
        }
        $shift->addUser($this->getUser());
        $this->persistFlushConflict($shift);
        return JsonResponse::fromJsonString($this->serializer->serialize($shift, 'json'));
    }


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
    #[Route("/api/getUserShifts/{start}/{end}/{userId}", methods: ["GET"])]
    public function getUserShifts( int $start, int $end, ?string $userId){

        $shifts = $this->doctrine->getManager()->getRepository(Shift::class)->getUserShiftsTimed($start, $end, Uuid::fromString($userId));
        return JsonResponse::fromJsonString($this->serializer->serialize($shifts, 'json'));

    }

    // get outstanding shifts where the headcount is not met by the number of users related to the shift via the shift_user table
    #[Route("/api/getOutstandingShifts/{start}/{end}/{user_id?}", methods: ["GET"])]
    public function getOutstandingShifts(int $start, int $end, ?string $user_id){
        $shifts = $this->doctrine->getManager()->getRepository(Shift::class)->getOutstandingShifts($start, $end, Uuid::fromString($user_id));
        return JsonResponse::fromJsonString($this->serializer->serialize($shifts, 'json'));
    }


//
//    // function for adding an array of shifts to an event
//    #[Route("/mod_api/shift/addarray/{eventId}", methods: ["POST"])]
//    public function addShiftArray(Request $request, string $eventId){
//        $encoders = [new XmlEncoder(), new JsonEncoder()];
//        $normalizers = [new ObjectNormalizer()];
//
//        $serializer = new Serializer($normalizers, $encoders);
//
//        /** @var Shift[] $event */
//        $shifts = $serializer->deserialize($request->getContent(), Shift::class."[]", "json", ["DEEP_OBJECT_TO_POPULATE" => "type"]);
//
////        $shifts = $this->serializer->deserialize($request->getContent(), Shift::class.'[]', "json");
//        /** @var Orgevent $event */
//        $event = $this->doctrine->getManager()->getRepository(Orgevent::class)->find(Uuid::fromString($eventId));
//        foreach($shifts as $shift){
//            $event->addShift($shift);
//            $this->doctrine->getManager()->persist($shift);
//        }
//        $this->doctrine->getManager()->flush();
//        return JsonResponse::fromJsonString($this->serializer->serialize($shifts, 'json'));
//    }


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