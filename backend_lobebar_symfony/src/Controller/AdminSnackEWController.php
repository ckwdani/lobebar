<?php

namespace App\Controller;

use App\Entity\SnackTypes;
use App\Entity\SnackUsed;
use Doctrine\Common\Collections\Criteria;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Uid\Uuid;

/** This is for the admin functions like adding a snack to a user or an extrawork, furthermore to book used snacks for finances */
class AdminSnackEWController extends  _Base_Controller
{

    // book a snack for finances
    #[Route('/admin_api/snack/book/{snackUsedId}', name: 'api_admin_snack_book', methods: ['POST'])]
    public function bookSnackUsed(string $snackUsedId)
    {
        $snackUsed = $this->doctrine->getManager()->getRepository(SnackUsed::class)->find(Uuid::fromString($snackUsedId));
        $snackUsed->setBooked(true);
        $this->persistFlushConflict($snackUsed);
        return JsonResponse::fromJsonString($this->serializer->serialize($snackUsed, 'json'));
    }

    // book all snackUsed from a certain day

    /**
     * @throws \Exception
     */
    #[Route('/admin_api/snack/book/day/{date}/{unbook}', name: 'api_admin_snack_book_day', methods: ['POST'])]
    public function bookSnackUsedDay(string $date, bool $unbook = false)
    {
        $em = $this->doctrine->getManager();

        $dtNext = new \DateTime($date);
        $dtNext = new \DateTime($dtNext->format('Y-m-d'));
        $dt = new \DateTime($dtNext->format('Y-m-d'));
        $dtNext->modify('+1 day');

        // criteria to find all snackUsed between two dates
        $criteria = Criteria::create()
            ->where(Criteria::expr()->gte('date', $dt))
            ->andWhere(Criteria::expr()->lt('date', $dtNext));


        $snackUsed = $em->getRepository(SnackUsed::class)->matching($criteria)->toArray();
        foreach($snackUsed as $snack){
            $snack->setBooked(!$unbook);
            $em->persist($snack);
        }
        $em->flush();
        return JsonResponse::fromJsonString($this->serializer->serialize($snackUsed, 'json'));
    }


    // set all snacks to booked
    #[Route('/admin_api/snack/book_all', name: 'api_admin_snack_book_all', methods: ['POST'])]
    public function bookAllSnackUsed()
    {
        $em = $this->doctrine->getManager();
        $snackUsed = $em->getRepository(SnackUsed::class)->findAll();
        foreach($snackUsed as $snack){
            $snack->setBooked(true);
            $em->persist($snack);
        }
        $em->flush();
        return JsonResponse::fromJsonString($this->serializer->serialize($snackUsed, 'json'));
    }

    // get booking view of used snacks
    #[Route('/admin_api/snack/booked', name: 'api_admin_snack_booked', methods: ['GET'])]
    public function getBookedSnacks()
    {
        $snackUsed = $this->doctrine->getManager()->getRepository(SnackTypes::class)->getGroupedbookingView();
        return JsonResponse::fromJsonString($this->serializer->serialize($snackUsed, 'json'));
    }


}