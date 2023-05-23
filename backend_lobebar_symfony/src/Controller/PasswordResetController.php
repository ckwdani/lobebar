<?php

namespace App\Controller;

use App\Entity\ResetCode;
use App\Entity\User;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Uid\Uuid;

class PasswordResetController extends _Base_Controller
{

    // reset password with given resetCodeId
    #[Route("/user/reset/confirm/{resetCodeId}", methods: ["PUT"])]
    public function resetPasswordWithCode(string $resetCodeId, Request $request, UserPasswordHasherInterface $encoder){
        $this->checkAndDeleteOldResetCodes();
        $em = $this->doctrine->getManager();
        /** @var ResetCode $resetCode */
        $resetCode = $em->getRepository(ResetCode::class)->find(Uuid::fromString($resetCodeId));
        if($resetCode == null){
            throw new NotFoundHttpException();
        }

        $user = $resetCode->getUser();
        $jsonData = json_decode($request->getContent(), true);
        $user->setPassword($encoder->hashPassword($user, $jsonData["password"]));
        $em->persist($user);
        $em->remove($resetCode);
        $em->flush();
        return JsonResponse::fromJsonString($this->serializer->serialize($user, 'json'));
    }

    // checkResetCode
    #[Route("/user/reset/check/{resetCodeId}", methods: ["GET"])]
    public function checkResetCode(string $resetCodeId){
        $this->checkAndDeleteOldResetCodes();
        $em = $this->doctrine->getManager();
        /** @var ResetCode $resetCode */
        $resetCode = $em->getRepository(ResetCode::class)->find(Uuid::fromString($resetCodeId));
        if($resetCode == null){
            throw new NotFoundHttpException();
        }
        return new Response($resetCode->getId()->toRfc4122());
    }


    // check for old resetCodes and delete them
    function checkAndDeleteOldResetCodes(){
        $em = $this->doctrine->getManager();
        $resetCodes = $em->getRepository(ResetCode::class)->findAll();
        foreach ($resetCodes as /** @var ResetCode $resetCode */ $resetCode){
            if($resetCode->getCreationDate()->getTimestamp() + $resetCode->getTtl() < (time())){
                $em->remove($resetCode);
            }
        }
        $em->flush();
    }

    #[Route("/user/reset/{email}", methods: ["PUT"])]
    public function resetPasswordLink(string $email, UserPasswordHasherInterface $encoder, MailerInterface $mailer){
        $em = $this->doctrine->getManager();
        /** @var User $userFromDB */
        $userFromDB = $em->getRepository(User::class)->findBy(["email" => $email])[0];
        if($userFromDB == null){
            throw new NotFoundHttpException();
        }
        // if the user already has an associated resetCode, delete it
        $resetCodes = $userFromDB->getResetCodes();
        foreach ($resetCodes as $code){
            $em->remove($code);
        }

        $resetCode = new ResetCode();
//        $resetCode->setCode($this->randomCode(12));
        $resetCode->setUser($userFromDB);

        $em->persist($resetCode);
        $em->flush();

        $this->newAccess($userFromDB, $resetCode->getId()->toRfc4122(), $resetCode->getTtl(), $mailer);

        return JsonResponse::fromJsonString($this->serializer->serialize($userFromDB, 'json'));
    }


    function randomCode(int $length = 8) {
        $alphabet = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789!@#$%^&*()-_=+";
        $pass = array(); //remember to declare $pass as an array
        $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
        for ($i = 0; $i < $length; $i++) {
            $n = rand(0, $alphaLength);
            $pass[] = $alphabet[$n];
        }
        return implode($pass); //turn the array into a string
    }

    private function newAccess($user, $resetCode, $ttl, MailerInterface $mailer){
        // get current url from env
        $url = $_ENV["APP_URL"];
        $email = (new TemplatedEmail())
            //->from(self::standardSenderEmail)
            ->to($user->getEmail())
            ->subject('Neue Zugangsdaten')
            ->htmlTemplate("Emails/user_newAccess.html.twig")
            ->context(["username" => $user->getUserName(), "resetCode" => $resetCode, "ttl"=>$ttl, "url" => $url]);
        $mailer->send($email);
    }
}