<?php
header("Content-Type:application/json");
if (isset($_GET['id']) && $_GET['id']!="") {
	include('db.php');
	$id = $_GET['id'];
	$result = mysqli_query($con,"SELECT * FROM `wines2` WHERE id=$id");
	if(mysqli_num_rows($result)>0){
	$row    = mysqli_fetch_array($result);
	$type    = $row['type'];
	$wine    = $row['wine'];
	$winery  = $row['winery'];
	$image   = $row['image'];
	$year    = $row['year'];
	$country = $row['country'];
	$region  = $row['region'];
	$rating  = $row['rating'];
	response($id, $type, $wine, $winery, $year, $country, $region, $rating, $image);
	mysqli_close($con);
	}else{
		response(NULL, NULL, 200,"No Record Found");
		}
}else{
	response(NULL, NULL, 400,"Invalid Request");
	}
function response($id,$type,$wine,$winery,$year,$country, $region, $rating, $image){
	$response['id'] = $id;
	$response['type'] = $type;
	$response['winery'] = $winery;
	$response['wine'] = $wine;
	$response['year'] = $year;
	$response['country'] = $country;
	$response['region'] = $region;
	$response['rating'] = $rating;
	$response['image'] = $image;
	$json_response = json_encode($response);
	echo $json_response;
}
?>