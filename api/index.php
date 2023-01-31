<html>
<head>
<title>Borrach-api Alpha</title>
<link rel="stylesheet" href="css/bootstrap.min.css">
</head>
<body>
<div style="width:700px; margin:0 auto;">
<h3>Create and Consume Wine &amp; Simple REST API in PHP</h3>   
<form action="" method="POST">
<label>Enter Wine ID:</label><br />
<input type="text" name="id" placeholder="Enter Wine ID" required/>
<br /><br />
<button type="submit" name="submit">Submit</button>
</form>    
<?php
if (isset($_POST['id']) && $_POST['id']!="") {
	$id = $_POST['id'];
	$url = "https://mediaciones.ar/borrach/api/".$id;
	$client = curl_init($url);
	curl_setopt($client,CURLOPT_RETURNTRANSFER,true);
	$response = curl_exec($client);
	$result = json_decode($response);
	echo "<table>";
	echo "<tr><td>ID:</td><td>$result->id</td></tr>";
	echo "<tr><td>Wine:</td><td>$result->wine</td></tr>";
	echo "<tr><td>Winery:</td><td>$result->winery</td></tr>";
	echo "<tr><td>Response Desc:</td><td><img src='$result->image'></td></tr>";
	echo "</table>";
}
    ?>
<br />
</div>
</body>
</html>