<?php
require "db.php";
$stmt = $pdo->query("SELECT * FROM bookings");
$bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>All Bookings - Flavour Junction</title>
</head>
<body>
    <h2 style="text-align: center; margin: 20px;">All Bookings</h2>
    <table border="1" cellspacing="0" cellpadding="10" style="margin: 0 auto; width: 80%; text-align: center;">
    <thead>
        <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Time</th>
            <th>People</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($bookings as $booking): ?>
            <tr>
                <td><?= htmlspecialchars($booking['id']) ?></td>
                <td><?= htmlspecialchars($booking['name']) ?></td>
                <td><?= htmlspecialchars($booking['email']) ?></td>
                <td><?= htmlspecialchars($booking['phone']) ?></td>
                <td><?= htmlspecialchars($booking['booking_date']) ?></td>
                <td><?= htmlspecialchars($booking['booking_time']) ?></td>
                <td><?= htmlspecialchars($booking['people']) ?></td>
                <td>
                    <a href="edit.php?id=<?= $booking['id'] ?>">Edit</a> | 
                    <a href="delete.php?id=<?= $booking['id'] ?>" onclick="return confirm('Are you sure?')">Delete</a>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>
</body>
</html>