<?php
$conn = new mysqli("localhost:3307", "root", "", "restaurant_booking");

$id = $_GET["id"];

// Yeh correct hai form ke according
$customer_name = $_POST["customer_name"];
$email = $_POST["email"];
$phone = $_POST['phone'];
$date = $_POST['booking_date'];
$time = $_POST['booking_time'];
$people = $_POST['people'];

$conn->query("UPDATE bookings SET
    name = '$customer_name',
    email = '$email',
    phone = '$phone',
    booking_date = '$date',
    booking_time = '$time',
    people = '$people'
    WHERE id = $id"
);

header("Location: booking.php");
?>
