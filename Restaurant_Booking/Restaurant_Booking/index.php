<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flavour Junction</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="header">
        <div class="restName">
            Flavour Junction
        </div>
        <div class="nav">
            <a href="#">Home</a>
            <a href="#">Menu</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
        </div>
        <div class="icons">
            <a href="https://www.facebook.com/soumen.goswami.92317"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-x"></i></a>
            <a href="https://www.instagram.com/soumengoswami36/"><i class="fab fa-instagram"></i></a>
        </div>
    </div>
    
    <div class="main">
        <div class="hero">
            <h1>Flavour Junction</h1>
            <p>Book Your Table. Enjoy Your Food.</p>
        </div>
        <div class="container">
            <h2>Book a Table</h2>
            <form action="insert.php" method="post">
                <label>Customer Name:</label>
                <input type="text" name="customer_name" required>
                
                <label>Email:</label>
                <input type="email" name="email" required>
                
                <label>Phone:</label>
                <input type="text" name="phone" required>
                
                <label>Date:</label>
                <input type="date" name="booking_date" required>
                
                <label>Time:</label>
                <input type="time" name="booking_time" required>
                
                <label>Number Of People:</label>
                <input type="number" name="people" required>
                
                <input type="submit">
            </form>
        </div>    
    </div>
    <footer class="footer">
        <div class="footer-content">
            <h3>Flavour Junction</h3>
            <p>Why scroll Zomato? Just stroll to us. Real food, no filters. </p>
            <div class="foot-icons">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-x"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 Flavour Junction | Designed by Soumen</p>
        </div>
    </footer>
    </body>
    </html>