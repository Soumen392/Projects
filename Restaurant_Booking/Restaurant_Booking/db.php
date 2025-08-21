<?php

$host = "localhost:3307";
$db = "restaurant_booking";
$user = "root";
$pass = "";

try{

    $pdo = new PDO("mysql:host=$host;dbname=$db",$user,$pass);
    $pdo -> setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    // echo "<h3 style='color:green;'>Database Connected Successfully</h3>";
}
catch(PDOException $e){
    echo "<h3 style='color : red;'>Database connection failed, please try again later.</h3>";
}

?>