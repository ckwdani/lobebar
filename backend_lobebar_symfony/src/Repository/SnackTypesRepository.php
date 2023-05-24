<?php

namespace App\Repository;

use App\Entity\SnackTypes;
use App\Entity\SnackUsed;
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

    public function getGroupedbookingView(){
//        $countExpressions = '';
//        $arraySTNames = [];
//        $a = 0;
//        foreach ($snackTypes as $snackType) {
//            $qn = "s_{$a}";
//            $arraySTNames = array_merge($arraySTNames, [$qn => $snackType->getName()]);
//            $countExpressions .= "COUNT(CASE WHEN st.id = '{$snackType->getId()}' THEN 1 ELSE 0 END) AS {$qn},";
//            $a += 1;
//        }
//        $countExpressions = rtrim($countExpressions, ',');

        $qb = $this->createQueryBuilder('s');

        $qb->select("DATE(su.date) AS date, COUNT(su.id) as count, s.name AS name, s.id AS id, su.booked")
            ->addSelect()
            ->join(SnackUsed::class, 'su', 'WITH', 'su.snackType = s')
            ->groupBy('date', 'id')
            ->andWhere($qb->expr()->eq("s.showInBooking", ":showInBooking"))
//            ->andWhere($qb->expr()->orX($qb->expr()->neq("su.booked", ":booked"), $qb->expr()->isNull("su.booked")))
            ->setParameter("showInBooking", true)
//            ->setParameter("booked", true)
            ->orderBy('date', 'DESC');

        $res =  $qb->getQuery()->getResult();

        $newRes = [];
        // map all entities to one date
        foreach ($res as $key => $value) {

            $date = $value["date"];
            // remove the date from the array
            unset($value["date"]);
            $newRes[$date][] = $value;
        }
        $newNewRes = [];
        foreach ($newRes as $key => $value) {
            $newNewRes[] = [
                "date" => $key,
                "snacks" => $value
            ];
        }

        return $newNewRes;
        // map the corect names to the generated names

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
