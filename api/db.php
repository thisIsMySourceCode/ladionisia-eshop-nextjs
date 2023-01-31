<?php
$con = mysqli_connect("localhost","user","pwd","db");
	if ( mysqli_connect_errno() ) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
		die();
	}
?>