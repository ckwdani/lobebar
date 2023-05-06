<?php
//
//namespace App\utils\Handlers;
//
//
//use App\Entity\Shift;
//use App\Entity\Shiftype;
//use Doctrine\ORM\EntityManagerInterface;
//use Doctrine\Persistence\ManagerRegistry;
//use JMS\Serializer\Context;
//use JMS\Serializer\GraphNavigator;
//use JMS\Serializer\Handler\SubscribingHandlerInterface;
//use JMS\Serializer\JsonDeserializationVisitor;
//use Symfony\Component\Uid\Uuid;
//
//class UserDeserilizerHandler implements SubscribingHandlerInterface
//{
//
//
//    public function __construct(protected ManagerRegistry $doctrine)
//    {
//
//    }
//
//    public static function getSubscribingMethods()
//    {
//        return [
//            [
//                'direction' => GraphNavigator::DIRECTION_DESERIALIZATION,
//                'format' => 'json',
//                'type' => User::class,
//                'method' => 'deserializeUser',
//            ],
//        ];
//    }
//
//
//    public function deserializeUser(JsonDeserializationVisitor $visitor, $userArray, array $type, Context $context)
//    {
//
//        $tets = $this->doctrine->getManager()->getReference(Shiftype::class, Uuid::fromString($userArray["type"]["id"]));
//        return $tets;
//    }
//}