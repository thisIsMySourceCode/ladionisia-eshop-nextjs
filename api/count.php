<?php header("Content-Type:application/json");
if (isset($_GET['id']) && $_GET['id']!="") {
    include('db.php');
   $id = $_GET['id'];
 switch ($id) {
      case "vintage":
         $query = "select 
  case 
    when year between 2010 and 2023 then '2010-present'
    when year between 2000 and 2009 then '2000-2009'
    when year between 1990 and 1999 then '1990-1999'
    when year between 1980 and 1989 then '1980-1989'
    when year between 1970 and 1979 then '1970-1979'
    when year between 1960 and 1969 then '1960-1969'
    else '1959 and Older'
  end as `period`,
  count(1) as `wines`
from `wines2`  
group by `period`
ORDER BY period DESC
;";
        break;
      case "type":
         $query = "SELECT type, COUNT(*) AS wines FROM `wines2` GROUP BY type ORDER BY type";
        break;
      case "region":
         $query = "SELECT country,region, COUNT(*) as wines FROM `wines2` GROUP BY region ORDER BY country,region";
        break;
      case "rating":
         $query = "select 
  case 
    when rating between 10 and 10 then '100'
    when rating between 9 and 9 then '99-97'
    when rating between 8 and 8 then '96-94'
    when rating between 7 and 7 then '93-91'
    when rating between 1 and 6 then '90-under'
  end as `score`,
  count(1) as `wines`
from `wines2`  
group by `score`
ORDER BY score DESC
;";
        break;
      default:
         $query = "SELECT country, COUNT(*) AS wines FROM `wines2` GROUP BY country ORDER BY country";
        break;
}
       $result = mysqli_query($con,$query);
       if(mysqli_num_rows($result)>0) {
        while($row = $result->fetch_assoc()) {
            $myArray[] = $row;
        }
    echo json_encode($myArray);
	       mysqli_close($con);
	}
else{
        echo json_encode(array(id=>NULL, error=>200,type=>"No Record Found"), JSON_FORCE_OBJECT);
}
} else{
  echo json_encode(array(id=>NULL, error=>400,type=>"Invalid Request"), JSON_FORCE_OBJECT);
}
exit();
?>
