<?php

namespace App\Security;


use Lexik\Bundle\JWTAuthenticationBundle\Security\Authenticator\JWTAuthenticator;
use Symfony\Component\HttpFoundation\Request;

class customJWT_Authenticator extends JWTAuthenticator
{
    private $em;
    private $encoder;

    public function __construct(EntityManagerInterface $em, JWTEncoderInterface $jwtEncoder, UserPasswordEncoderInterface $encoder)
    {
        parent::__construct($jwtEncoder);
        $this->em = $em;
        $this->encoder = $encoder;
    }

    public function supports(Request $request): bool
    {
        return true;
    }

    public function getCredentials(Request $request)
    {
        $data = json_decode($request->getContent(), true);

        return [
            'email' => $data['email'] ?? null,
            'username' => $data['username'] ?? null,
            'password' => $data['password'] ?? null,
        ];
    }

    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        $email = $credentials['email'];
        $username = $credentials['username'];

        if (empty($email) && empty($username)) {
            throw new AuthenticationException('Missing email or username.');
        }

        if (!empty($email)) {
            return $userProvider->loadUserByUsername($email);
        }

        return $userProvider->loadUserByUsername($username);
    }

    public function checkCredentials($credentials, UserInterface $user)
    {
        return $this->encoder->isPasswordValid($user, $credentials['password']);
    }
}