<?php
include 'db.php';

if($_SERVER["REQUEST_METHOD"] == "POST"){
    $customer_name = $_POST["customer_name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $date = $_POST["booking_date"];
    $time = $_POST["booking_time"];
    $people = $_POST["people"];

    try {
        $sql = "INSERT INTO bookings (name, email, phone, booking_date, booking_time, people)
        VALUES (:name, :email, :phone, :booking_date, :booking_time, :people)";

        $stmt = $pdo -> prepare($sql);

        $stmt->execute([
            ":name" => $customer_name,
            ":email"=> $email,
            ":phone" => $phone,
            ":booking_date" => $date,
            "booking_time" => $time,
            "people" => $people

        ]);

        echo "<h3 style='color:green; text-align:center;'>Booking Successful!</h3>";

    } catch (PDOException $e) {
        echo "<h3 style='color:red; text-align:center;'>Failed: " . $e->getMessage() . "</h3>";
    }


}
?>