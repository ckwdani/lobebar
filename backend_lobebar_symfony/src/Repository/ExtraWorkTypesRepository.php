<?php

namespace App\Repository;

use App\Entity\ExtraWorkTypes;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ExtraWorkTypes>
 *
 * @method ExtraWorkTypes|null find($id, $lockMode = null, $lockVersion = null)
 * @method ExtraWorkTypes|null findOneBy(array $criteria, array $orderBy = null)
 * @method ExtraWorkTypes[]    findAll()
 * @method ExtraWorkTypes[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ExtraWorkTypesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ExtraWorkTypes::class);
    }

    public function save(ExtraWorkTypes $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(ExtraWorkTypes $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return ExtraWorkTypes[] Returns an array of ExtraWorkTypes objects
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

//    public function findOneBySomeField($value): ?ExtraWorkTypes
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
