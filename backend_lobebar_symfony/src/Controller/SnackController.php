<?php

namespace App\Controller;

use App\Entity\SnackTypes;
use App\Entity\User;
use JMS\Serializer\DeserializationContext;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class SnackController extends _Base_Controller
{


    #[Route("/api/snack/addtype", methods: ["POST"])]
    public function addSnackType(Request $request){
        $snackType = $this->serializer->deserialize($request->getContent(), SnackTypes::class, "json");



    }
}