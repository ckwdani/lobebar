<?php

namespace App\Repository;

use App\Entity\DoneExtraWork;
use App\Entity\SnackUsed;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Uid\Uuid;

/**
 * @extends ServiceEntityRepository<DoneExtraWork>
 *
 * @method DoneExtraWork|null find($id, $lockMode = null, $lockVersion = null)
 * @method DoneExtraWork|null findOneBy(array $criteria, array $orderBy = null)
 * @method DoneExtraWork[]    findAll()
 * @method DoneExtraWork[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DoneExtraWorkRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, DoneExtraWork::class);
    }

    public function save(DoneExtraWork $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(DoneExtraWork $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @return DoneExtraWork[] Returns an array of SnackUsed objects
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
                ->setParameter('end', $endDateTime)
                ->orderBy('e.date', 'DESC');
            return $qb->getQuery()->getResult();
        }else{
            return $qb->getQuery()->getResult();
        }

    }

//    /**
//     * @return DoneExtraWork[] Returns an array of DoneExtraWork objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('e.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?DoneExtraWork
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
