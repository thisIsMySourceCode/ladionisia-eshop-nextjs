<?php
$link = mysqli_connect("localhost", "user", "pwd", "base");
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}
$query = "SELECT * FROM `wines2`";
if ($result = mysqli_query($link, $query)) {
    $newArr = array();
    while ($db_field = mysqli_fetch_assoc($result)) {
        $newArr[] = $db_field;
    }
    echo json_encode($newArr);
}
?>