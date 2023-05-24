<?php

namespace App\Controller;

use App\Entity\SnackUsed;
use Symfony\Component\HttpFoundation\JsonResponse;
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

    // get
}