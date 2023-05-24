<?php

namespace App\Repository;

use App\Entity\SnackUsed;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use JMS\Serializer\Expression\Expression;
use Proxies\__CG__\App\Entity\SnackTypes;
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
                ->setParameter('end', $endDateTime)
                ->orderBy('e.date', 'DESC');
            return $qb->getQuery()->getResult();
        }else{
            return $qb->getQuery()->getResult();
        }

    }


    public function getGroupedbookingView(){
        $snackTypes = $this->getEntityManager()->getRepository(SnackTypes::class)->findBy(["showInBooking" => true]);
        $countExpressions = '';
        $arraySTNames = [];
        $a = 0;
        foreach ($snackTypes as $snackType) {
            $qn = "s_{$a}";
            $arraySTNames = array_merge($arraySTNames, [$qn => $snackType->getName()]);
            $countExpressions .= "COUNT(CASE WHEN st.id = '{$snackType->getId()}' THEN 1 ELSE 0 END) AS {$qn},";
            $a += 1;
        }
        $countExpressions = rtrim($countExpressions, ',');

        $qb = $this->createQueryBuilder('s');

        $qb->select("DATE(s.date) AS date, $countExpressions")
            ->addSelect()
            ->join('s.snackType', 'st')
            ->groupBy('date')
            ->orderBy('date', 'DESC');

        $res =  $qb->getQuery()->getResult();
        // map the corect names to the generated names
        return array_map(function($item) use ($arraySTNames){
            foreach ($item as $key => $value) {
                if($key !== "date"){
                    $item[$arraySTNames[$key]] = $value;
                    unset($item[$key]);
                }
            }
            return $item;
        }, $res);

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
