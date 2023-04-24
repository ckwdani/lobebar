<?php

namespace App\Repository;

use App\Entity\SnackTypes;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<SnackTypes>
 *
 * @method SnackTypes|null find($id, $lockMode = null, $lockVersion = null)
 * @method SnackTypes|null findOneBy(array $criteria, array $orderBy = null)
 * @method SnackTypes[]    findAll()
 * @method SnackTypes[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SnackTypesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SnackTypes::class);
    }

    public function save(SnackTypes $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(SnackTypes $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }


    public function countSnacksUsedByDateRange(?int $start = null, ?int $end = null, ?User $user = null): array
    {
        $start += 7200;
        $end += 7200;
        $qb = $this->createQueryBuilder('s');
        if(!empty($user)){
            $qb->andWhere($qb->expr()->eq("e.user", ":userId"))
                ->setParameter("userId", $user->getId()->toBinary());
        }
        $qb
            ->select('s, COUNT(u.id) as usedCount')
            ->leftJoin('s.snacksUsed', 'u');
        if(!empty($start) && !empty($end)){
            $qb->andWhere($qb->expr()->between('u.date', ':start', ':end'))
                ->groupBy('s.id')
                ->setParameter('start', (new \DateTime())->setTimestamp($start))
                ->setParameter('end', (new \DateTime())->setTimestamp($end));
        }
        $result = $qb->getQuery()->getResult();
        $result = array_map(function (array $used) {
            /** @var SnackTypes $type */
            $type = $used[0];
            $type->usedCount = $used["usedCount"];
            return $type;
        }, $result);
        return $result;
    }

//    /**
//     * @return SnackTypes[] Returns an array of SnackTypes objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('s.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?SnackTypes
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
