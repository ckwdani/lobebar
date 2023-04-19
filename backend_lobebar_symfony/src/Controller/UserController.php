<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
use JMS\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{

    public function __construct(private ManagerRegistry $doctrine, private SerializerInterface $serializer)
    {
    }

    #[Route("/register", methods: ["POST"])]
    public function register(Request $request, UserPasswordHasherInterface $encoder): JsonResponse{
        $user = $this->serializer->deserialize($request->getContent(), User::class, "json");
        return $this->json($this->serializer->serialize($user, 'json'));
    }
}