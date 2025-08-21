<?php
$conn = new mysqli("localhost:3307", "root", "", "restaurant_booking");

if(!$conn){
    echo "<h3 style='color : red;'>Database connection failed, please try again later.</h3>";
}

$id = $_GET["id"];

$sql = "DELETE FROM bookings WHERE id = $id";
$result = $conn->query($sql);

header('Location: booking.php');
exit();
?>