<?php

namespace App\Repository;

use App\Entity\Shift;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Uid\Uuid;

/**
 * @extends ServiceEntityRepository<Shift>
 *
 * @method Shift|null find($id, $lockMode = null, $lockVersion = null)
 * @method Shift|null findOneBy(array $criteria, array $orderBy = null)
 * @method Shift[]    findAll()
 * @method Shift[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ShiftRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Shift::class);
    }

    public function save(Shift $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Shift $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    // get shifts from user ordered by event start date with pagination based on start and end unix timestamps which are related to the event start
    public function getUserShiftsTimed(?int $start = null, ?int $end = null, ?Uuid $user_id = null){
        $start += 7200;
        $end += 7200;
        $qb = $this->createQueryBuilder('s');
        // join with event to get event start date
        $qb->join('s.orgevent', 'e');
        if(!empty($start) && !empty($end)){
            $qb->andWhere($qb->expr()->between('e.start', ':start', ':end'))
                ->setParameter('start', (new \DateTime())->setTimestamp($start))
                ->setParameter('end', (new \DateTime())->setTimestamp($end));
        }
        if(!empty($user_id)){
            // join the users table (the shift_user table is a join table between shifts and users) and get shifts where the user id is the logged in user
            $qb->join('s.users', 'su');
            $qb->andWhere($qb->expr()->in('su', ':user_id'))
                ->setParameter('user_id', $user_id->toBinary());
        }
        return $qb->getQuery()->getResult();
    }

    // get outstanding shifts where the headcount is not met by the number of users related to the shift via the shift_user table and where the logged in user is not signed up for
    // with pagination based on start and end unix timestamps which are related to the event start and in an ascending event start date order
    public function getOutstandingShifts(?int $start = null, ?int $end = null, ?Uuid $user_id = null){
        $start += 7200;
        $end += 7200;
        $qb = $this->createQueryBuilder('s');
        // join with event to get event start date
        $qb->join('s.orgevent', 'e');
        // join with shift_user to get the number of users signed up for the shift
        $qb->join('s.users', 'su');
        // get the number of users signed up for the shift
        $qb->select('s, e, COUNT(su) as HIDDEN user_count');
        // group by shift id
        $qb->groupBy('s.id');
        // where the headcount is not met by the number of users signed up for the shift
        $qb->having('s.headcount > user_count');
        if(!empty($start) && !empty($end)){
            $qb->andWhere($qb->expr()->between('e.start', ':start', ':end'))
                ->setParameter('start', (new \DateTime())->setTimestamp($start))
                ->setParameter('end', (new \DateTime())->setTimestamp($end));
        }
        if(!empty($user_id)){
            // where the logged in user is not signed up for the shift
            $qb->andWhere($qb->expr()->notIn('su', ':user_id'))
                ->setParameter('user_id', $user_id->toBinary());
//            $qb->andWhere($qb->expr()->notIn('s.id', ':user_id'))
//                ->setParameter('user_id', $user_id->toBinary());
        }
        // order by event start date
        $qb->orderBy('e.start', 'ASC');
        return $qb->getQuery()->getResult();
    }



//    /**
//     * @return Shift[] Returns an array of Shift objects
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

//    public function findOneBySomeField($value): ?Shift
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
