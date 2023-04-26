<?php

namespace App\Controller;

use App\Entity\Orgevent;
use App\Entity\Shiftype;
use App\Entity\SnackTypes;
use JMS\Serializer\EventDispatcher\Event;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\PropertyAccess\PropertyAccess;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Uid\Uuid;
use const App\Entity\WITH_DETAILED_SHIFTS;

class EventController extends _Base_Controller
{
//    #[Route("/mod_api/event/add", methods: ["POST"])]
    #[Route("/orgevent/", methods: ["POST"])]
    public function addEvent(Request $request){
        $event = $this->serializer->deserialize($request->getContent(), Orgevent::class, "json");
        if(empty($event)){
            throw new NotFoundHttpException();
        }
        $this->persistFlushConflict($event);
        return JsonResponse::fromJsonString($this->serializer->serialize($event, 'json'));
    }

    #[Route("/mod_api/event/deleteEvent/{eventId}", methods: ["DELETE"])]
    public function deleteEvent(string $eventId){

        $event = $this->doctrine->getManager()->getRepository(Orgevent::class)->find(Uuid::fromString($eventId));
        if(empty($event)){
            throw new NotFoundHttpException();
        }
        $this->doctrine->getManager()->remove($event);

        return JsonResponse::fromJsonString($this->serializer->serialize($event, 'json'));
    }

    #[Route("/mod_api/event/updateEvent/{eventId}", methods: ["PUT"])]
    public function updateEvent(Request $request, string $eventId){
        $eventChanges = $this->serializer->deserialize($request->getContent(), Orgevent::class, "json");
        /** @var Orgevent $event */
        $event = $this->doctrine->getManager()->getRepository(Orgevent::class)->find(Uuid::fromString($eventId));
        if(empty($event)){
            throw new NotFoundHttpException();
        }

        if ($eventChanges->getName()) {
            $event->setName($eventChanges->getName());
        }
        if ($eventChanges->getStart()) {
            $event->setStart($eventChanges->getStart());
        }
        if ($eventChanges->getEnd()) {
            $event->setEnd($eventChanges->getEnd());
        }
        // missing implementation of copying new properties to the persistent OrgEvent object

        $this->doctrine->getManager()->flush();
        return JsonResponse::fromJsonString($this->serializer->serialize($event, 'json'));
    }


    #[Route("/mod_api/event/getSingle/{eventId}", methods: ["GET"])]
    public function getSingleEvent(Request $request, string $eventId): JsonResponse
    {
        /** @var Orgevent $event */
        $event = $this->doctrine->getManager()->getRepository(Orgevent::class)->find(Uuid::fromString($eventId));
        if(empty($event)){
            throw new NotFoundHttpException();
        }
        return JsonResponse::fromJsonString($this->serializer->serialize($event, 'json', self::createSerializationContextWithGroups(["Default", WITH_DETAILED_SHIFTS])));
    }

    #[Route("/mod_api/event/getTimed/{start?}/{end?}", methods: ["GET"])]
    public function getEventsInTime(?int $start, ?int $end){
        $events = $this->doctrine->getManager()->getRepository(Orgevent::class)->getEventsTimed($start, $end);
        return JsonResponse::fromJsonString($this->serializer->serialize($events, 'json'));
    }



}