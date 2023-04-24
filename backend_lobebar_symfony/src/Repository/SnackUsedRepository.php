<?php

namespace App\Repository;

use App\Entity\SnackUsed;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use JMS\Serializer\Expression\Expression;
use Symfony\Component\Uid\Uuid;

/**
 * @extends ServiceEntityRepository<SnackUsed>
 *
 * @method SnackUsed|null find($id, $lockMode = null, $lockVersion = null)
 * @method SnackUsed|null findOneBy(array $criteria, array $orderBy = null)
 * @method SnackUsed[]    findAll()
 * @method SnackUsed[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SnackUsedRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SnackUsed::class);
    }

    public function save(SnackUsed $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(SnackUsed $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @return SnackUsed[] Returns an array of SnackUsed objects
     */
    public function findInTimeOrFull(?int $start=null, ?int $end=null, ?Uuid $userId = null): array
    {
        $start += 7200;
        $end += 7200;
        $qb = $this->createQueryBuilder('e');
        if(!empty($userId)){
            $qb->andWhere($qb->expr()->eq("e.user", ":userId"))
                ->setParameter("userId", $userId->toBinary());
        }
        if(!empty($start) && !empty($end)) {
            $startDateTime = DateTime::createFromFormat('U', $start);
            $endDateTime = DateTime::createFromFormat('U', $end);
            $qb
                ->andWhere('e.date >= :start')
                ->andWhere('e.date <= :end')
                ->setParameter('start', $startDateTime)
                ->setParameter('end', $endDateTime);
            return $qb->getQuery()->getResult();
        }else{
            return $qb->getQuery()->getResult();
        }

    }

//    public function findOneBySomeField($value): ?SnackUsed
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
