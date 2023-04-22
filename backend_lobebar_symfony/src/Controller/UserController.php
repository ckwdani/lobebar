<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\Persistence\ManagerRegistry;
use JMS\Serializer\DeserializationContext;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Uid\Uuid;

class UserController extends _Base_Controller
{

    private UserRepository $userRepo;

    public function __construct(ManagerRegistry $doctrine)
    {
        parent::__construct($doctrine);
        $this->userRepo = $doctrine->getRepository(User::class);
    }

    #[Route("/register", methods: ["POST"])]
    public function register(Request $request, UserPasswordHasherInterface $encoder): JsonResponse{
        /**
         * @var $user User
         */
        $user = $this->serializer->deserialize($request->getContent(), User::class, "json", DeserializationContext::create()->setGroups(["DeSer", "Default"]));
        $user->setPassword($encoder->hashPassword($user, $user->getPassword()));
        $em = $this->doctrine->getManager();
        $em->persist($user);

        try {
            $em->flush();
        }catch (UniqueConstraintViolationException $e){


            // if an UniqueConstraintVialotion is thrown, this finds wheter its because email or user
            $otherusersName = $this->userRepo->findBy(["username" => $user->getUsername()]);
            $otherusersMail = $this->userRepo->findBy(['email' => $user->getEmail()]);
            return $this->json(["email" => !empty($otherusersMail), "username" => !empty($otherusersName)], status: 409);
        }
        $user->initCollsIfNull();

        return JsonResponse::fromJsonString($this->serializer->serialize($user, 'json'));
    }



    #[Route("/approve/{id}", methods: ["PUT"])]
    public function approveUser($id){
        $this->denyAccessUnlessGranted("ROLE_MOD");


        $user = $this->userRepo->find(Uuid::fromString($id));
        $user->setIsApproved();
        $this->doctrine->getManager()->persist($user);
        $this->doctrine->getManager()->flush();
    }

    #[Route("/users", methods: ["GET"])]
    public function getAllUsers(){

        $this->denyAccessUnlessGranted('ROLE_ADMIN', null, "User tried to access a page without having ROLE_ADMIN");

        $users = $this->userRepo->findAll();
        return JsonResponse::fromJsonString($this->serializer->serialize($users, 'json'));
    }
}