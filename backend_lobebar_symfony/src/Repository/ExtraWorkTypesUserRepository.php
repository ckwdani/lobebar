<?php

namespace App\Repository;

use App\Entity\DoneExtraWork;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<DoneExtraWork>
 *
 * @method DoneExtraWork|null find($id, $lockMode = null, $lockVersion = null)
 * @method DoneExtraWork|null findOneBy(array $criteria, array $orderBy = null)
 * @method DoneExtraWork[]    findAll()
 * @method DoneExtraWork[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ExtraWorkTypesUserRepository extends ServiceEntityRepository
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
