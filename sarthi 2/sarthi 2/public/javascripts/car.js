var cars = [
    {
        name: "Tata-Nexon", price: "150", model: "ASD", passenger: "2", luggage:"2", data: "Regular",
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        name: "Toyota", price: "220", model: "ASD", passenger: "3", luggage:"2", data: "Regular",
        image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        name: "Bolero", price: "550", model: "ASD", passenger: "6", luggage:"5", data: "Occasion",
        image: "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        name: "BMW", price: "1200", model: "ASD", passenger: "2", luggage:"1", data: "Business",
        image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        name: "Audi", price: "1300", model: "ASD", passenger: "1", luggage:"1", data: "Business",
        image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        name: "Bolero", price: "550", model: "ASD", passenger: "5", luggage:"5", data: "Family",
        image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        name: "Scorpio", price: "620", model: "ASD", passenger: "7", luggage:"7", data: "Family",
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
]

function addCars() {
    var clutter = ""
    cars.forEach(function (car, index) {
        clutter += `<div class="card" data-name=${car.data}>
        <img src="/images/car-5.png" alt="car">
        <h3 class="text-2xl font-semibold">${car.name}</h3>
        <p><b>Model:</b> <span class="right">$${car.model}</span></p>
        <p><b>Per Mile/KM:</b> <span class="right">$${car.price}</span></p>
        <p><b>Passengers:</b> <span class="right">${car.passenger}</span></p><br>
        <a data-index="${index}" href="/cab" class="add px-10 py-4  text-center rounded-3xl text-lg font-semibold bg-amber-400 mt-3 mb-5">Book now</a>
        </div>`
        // <button data-index="${index}" class="add"><a data-index="${index}" href="taxi1.html" class="add">Book now</a></button>
        // <p><b>Per Mile/KM:</b> <input class="right" type="text" value="${car.price}"></p>
    })
    document.querySelector("#filterable-cards").innerHTML = clutter;
}
addCars()

// Select relevant HTML elements
const filterButtons = document.querySelectorAll("#filter-buttons button");
const filterableCards = document.querySelectorAll("#filterable-cards .card");

// Function to filter cards based on filter buttons
const filterCards = (e) => {
    document.querySelector("#filter-buttons .active").classList.remove("active");
    e.target.classList.add("active");

    filterableCards.forEach(card => {
        // show the card if it matches the clicked filter or show all cards if "all" filter is clicked
        if (card.dataset.name === e.target.dataset.filter || e.target.dataset.filter === "all") {
            return card.classList.replace("hide", "show");
        }
        card.classList.add("hide");
    });
}

filterButtons.forEach(button => button.addEventListener("click", filterCards));



var cart = []

function addToCart() {
    document.querySelector("#filterable-cards").addEventListener("click", function (details) {
        if (details.target.classList.contains('add')) {
            // console.log("added complete")
            // console.log(details.target)
            // console.log(details.target.dataset.index)
            cart.push(cars[details.target.dataset.index])
            localStorage.setItem("carts", JSON.stringify(cart))
            console.log(cart)
        }
    })
}
addToCart()