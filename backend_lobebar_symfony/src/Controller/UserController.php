<?php

namespace App\Controller;

use App\Entity\ResetCode;
use App\Entity\User;
use App\Repository\UserRepository;
use App\Security\Voters\AdminOrOwnerVoter;
use App\Security\Voters\AdminVoter;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\Persistence\ManagerRegistry;
use JMS\Serializer\DeserializationContext;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
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
        $jsonData = json_decode($request->getContent(), true);
        $user->setPassword($encoder->hashPassword($user, $jsonData["password"]));
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
        return JsonResponse::fromJsonString($this->serializer->serialize($user, 'json'));
    }

    #[Route("/users", methods: ["GET"])]
    public function getAllUsers(){

        $this->denyAccessUnlessGranted('ROLE_ADMIN', null, "User tried to access a page without having ROLE_ADMIN");

        $users = $this->userRepo->findAll();
        return JsonResponse::fromJsonString($this->serializer->serialize($users, 'json'));
    }

    // get user by id, if no id is given return the logged in user
    #[Route("/user/{id?}", methods: ["GET"])]
    public function loadUser(?string $id): JsonResponse{
        $user = $this->getUser();
        if(!empty($id)){
            $user = $this->userRepo->find(Uuid::fromString($id));
        }
        return JsonResponse::fromJsonString($this->serializer->serialize($user, 'json'));
    }

    // update own user
    #[Route("/user/update", methods: ["PUT"])]
    public function updateUser(Request $request): JsonResponse{
        $id = Uuid::fromString(json_decode($request->getContent(), true)["id"]);
        $userFromDB = $this->userRepo->find($id);

        $this->denyAccessUnlessGranted(AdminOrOwnerVoter::CAN_EDIT_ADMIN_OR_VOTER, $userFromDB);
        //get request body from user
        /** @var User $user */
        $user = $this->serializer->deserialize($request->getContent(), User::class, "json", DeserializationContext::create()->setGroups(["DeSer", "Default"]));



        // update user
        $userFromDB->setUsername($user->getUsername());
        $userFromDB->setEmail($user->getEmail());
        $userFromDB->setFirstName($user->getFirstName());
        $userFromDB->setLastName($user->getLastName());
        $userFromDB->setTitel($user->getTitel());
        $userFromDB->setTelephone($user->getTelephone());
        $userFromDB->setHygienepass($user->isHygienepass());

        // save user to db and return it as json
        $em = $this->doctrine->getManager();
        $em->persist($userFromDB);
        $em->flush();
        return JsonResponse::fromJsonString($this->serializer->serialize($userFromDB, 'json'));
    }

    #[Route("/user/updateRole", methods: ["PUT"])]
    public function updateUserRole(Request $request): JsonResponse{
        $id = Uuid::fromString(json_decode($request->getContent(), true)["id"]);
        $userFromDB = $this->userRepo->find($id);

        $this->denyAccessUnlessGranted(AdminVoter::ADMIN_VOTER, $userFromDB);
        //get request body from user
        /** @var User $user */
        $user = $this->serializer->deserialize($request->getContent(), User::class, "json", DeserializationContext::create()->setGroups(["DeSer", "Default"]));

        // update userrole
        $userFromDB->setRoles($user->getRoles());

        // save user to db and return it as json
        $em = $this->doctrine->getManager();
        $em->persist($userFromDB);
        $em->flush();
        return JsonResponse::fromJsonString($this->serializer->serialize($userFromDB, 'json'));
    }


    // delete user by id, if no id is given delete the logged in user
    // only the admin is allowed to do so
    #[Route("/admin_api/user/{id?}", methods: ["DELETE"])]
    public function deleteUser(?string $id): JsonResponse{
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        $user = $this->getUser();
        if(!empty($id)){
            $user = $this->userRepo->find(Uuid::fromString($id));
        }
        $em = $this->doctrine->getManager();
        $em->remove($user);
        $em->flush();
        return JsonResponse::fromJsonString($this->serializer->serialize($user, 'json'));
    }





    #[Route("/achievement", methods: ["PUT"])]
    public function putAchievement(Request $request){
        $user = $this->getUser();

        $data = json_decode($request->getContent(), true);
        $achievementCode = $data["achievementCode"];
        $extraString = $data["extraString"];

        $user->setSelectedAchievement((int)$extraString *1000+$achievementCode);

        $em = $this->doctrine->getManager();
        $em->persist($user);
        $em->flush();
        return JsonResponse::fromJsonString($this->serializer->serialize($user, 'json'));
    }
}