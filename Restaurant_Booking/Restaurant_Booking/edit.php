<?php
$conn = new mysqli("localhost:3307","root","","restaurant_booking");

$id = $_GET['id'];

$result = $conn->query("SELECT * FROM bookings WHERE id = $id");
$row = $result->fetch_assoc()
?>

<form action="update.php?id=<?=$row['id']?>" method="post">
    <input type="text" name="customer_name" value="<?= $row['name'] ?>">
    <input type="email" name="email" value="<?= $row['email'] ?>">
    <input type="text" name="phone" value="<?= $row['phone'] ?>">
    <input type="date" name="booking_date" value="<?= $row['booking_date'] ?>">
    <input type="time" name="booking_time" value="<?= $row['booking_time'] ?>">
    <input type="number" name="people" value="<?= $row['people'] ?>">
    <input type="submit" value="Update">
</form>