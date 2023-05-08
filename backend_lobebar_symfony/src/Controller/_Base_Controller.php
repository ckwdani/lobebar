<?php

namespace App\Controller;

use App\Entity\_Base_Entity;
use App\Entity\SerializationListeners\EventSerializationListener;
use App\Entity\SerializationListeners\ProfileSerializationListener;
use App\Entity\User;
use App\utils\Handlers\EntityHandler;
use App\utils\Handlers\ShiftDeserilizerHandler;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\Persistence\ManagerRegistry;
use JMS\Serializer\EventDispatcher\EventDispatcher;
use JMS\Serializer\Handler\HandlerRegistry;
use JMS\Serializer\Naming\IdenticalPropertyNamingStrategy;
use JMS\Serializer\Naming\SerializedNameAnnotationStrategy;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\Serializer;
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;

class _Base_Controller extends AbstractController
{
    protected SerializerInterface $BaseSerializer;

    public function __construct(protected ManagerRegistry $doctrine)
    {
        $this->serializer = SerializerBuilder::create()
            ->configureHandlers(function(HandlerRegistry $registry) {
                $registry->registerSubscribingHandler(new ShiftDeserilizerHandler($this->doctrine));
            })
            // here we configure our listeners (especially our event (entity) serialization listener
//            ->configureListeners(function(EventDispatcher $dispatcher) use ($profileUtils, $likeUtils) {
//                $dispatcher->addSubscriber(new EventSerializationListener($profileUtils, $likeUtils));
//                $dispatcher->addSubscriber(new ProfileSerializationListener($profileUtils));
//            })
            // --- This sets the namingstrategy to identical (so we don't serialize in snake case!)
            ->setPropertyNamingStrategy(
                new SerializedNameAnnotationStrategy(
                    new IdenticalPropertyNamingStrategy()
                )
            )
            ->addDefaultListeners()
            ->addDefaultSerializationVisitors()
            ->addDefaultHandlers()
            // this funny thing adds context before creating any serializer
            ->setSerializationContextFactory(function () {
                return self::createSerializationContextWithGroups();
            })
            ->build();
    }

    static function createSerializationContextWithGroups(array $groups = ["Default"]){
        return SerializationContext::create()
            ->setSerializeNull(true)
            ->setGroups($groups)
            ->enableMaxDepthChecks();
    }


    public function persistFlushConflict(_Base_Entity $entity){
        $em = $this->doctrine->getManager();
        $em->persist($entity);
        try {
            $em->flush();
        }catch (UniqueConstraintViolationException $exception){
            throw new ConflictHttpException("There was an unique constraint violation", $exception);
        }
    }

}