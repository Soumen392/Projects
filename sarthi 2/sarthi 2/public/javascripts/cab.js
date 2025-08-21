function showCart() {

    let carts = localStorage.getItem("carts");
    if (carts == null) {
        cart = [];
    } else {
        cart = JSON.parse(carts);
    }

    var clutter = "";
    cart.forEach(function (cab, index) {
        clutter = `<div class="container-1">

        <div class="left-section fade">

            <div class="mySlides">
                <img src="${cab.image}" alt="">
            </div>
            <div class="mySlides">
                <img src="/images/car-2.png" alt="">
            </div>
            <div class="mySlides">
                <img src="/images/car-3.png" alt="">
            </div>
        </div>

        <div class="right-section">
            <h3>Sarthi Taxi Service</h3><br>
            <h1 style="font-family: Romany Serif;">${cab.name}</h1><br>
            <p>Offering a variety of cars for your corporate needs.</p>
            <p>There are many variations of passages of lorem ipsum available<br> but the majority have suffered
                alteration in some.</p><br>
            <hr><br>
            <ul>
                <li><i class="fa-solid fa-truck-fast"></i><b>Model:</b> ${cab.model}</li>
                <li><i class="fa-solid fa-car"></i><b>Car-no.:</b> WB-H-1234</li>
                <li><i class="fa-solid fa-truck-fast"></i><b>Driver:</b> QWER</li>
                <li><i class="fa-solid fa-truck-fast"></i><b>Price:</b> ${cab.price} per K.M</li>
                <li><i class="fa-solid fa-person"></i><b>Passengers:</b> ${cab.passenger}</li>
                <li><i class="fa-solid fa-cart-flatbed-suitcase"></i><b>Luggage:</b> ${cab.luggage}</li>
                <li><i class="fa-solid fa-globe"></i><b>GPS Navigation:</b> Yes</li>
                <li><i class="fa-solid fa-truck-fast"></i><b>AC:</b> Yes</li>
            </ul><br><br>
            <a href="/booking-form" class="book-button">Book the Cab</a>
        </div>

        <a class="prev" onclick="plusSlides(-1)"><i class="fa-solid fa-arrow-left"></i></a>
        <a class="next" onclick="plusSlides(1)"><i class="fa-solid fa-arrow-right"></i></a>

    </div>`
    })
    // <button class="book-button"><a href="abc.html">Book the Cab</a></button>

    document.querySelector("#container").innerHTML = clutter;
}
showCart()

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}