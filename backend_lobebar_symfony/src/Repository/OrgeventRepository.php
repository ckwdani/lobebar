<?php

namespace App\Repository;

use App\Entity\Orgevent;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Orgevent>
 *
 * @method Orgevent|null find($id, $lockMode = null, $lockVersion = null)
 * @method Orgevent|null findOneBy(array $criteria, array $orderBy = null)
 * @method Orgevent[]    findAll()
 * @method Orgevent[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class OrgeventRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Orgevent::class);
    }

    public function save(Orgevent $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Orgevent $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }


    public function getEventsTimed(?int $start = null, ?int $end = null){
        $start += 7200;
        $end += 7200;
        $qb = $this->createQueryBuilder('s');
        if(!empty($start) && !empty($end)){
            $qb->andWhere($qb->expr()->between('s.start', ':start', ':end'))
                ->setParameter('start', (new \DateTime())->setTimestamp($start))
                ->setParameter('end', (new \DateTime())->setTimestamp($end));
        }
        $qb->orderBy('s.start', 'ASC');
        return $qb->getQuery()->getResult();
    }

//    /**
//     * @return Orgevent[] Returns an array of Orgevent objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('o')
//            ->andWhere('o.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('o.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Orgevent
//    {
//        return $this->createQueryBuilder('o')
//            ->andWhere('o.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
