function showCart() {
    let carts = localStorage.getItem("carts");
    if (carts == null) {
        cart = [];
    } else {
        cart = JSON.parse(carts);
    }

    var clutter = "";
    cart.forEach(function (cab, index) {
        clutter=`<div class="formdesign" id="name">
        <input type="text" placeholder="Name" name="cname" value="${cab.name}">
    </div><br>
    <div class="formdesign" id="name">
        <input type="text" placeholder="Name" name="cmodel" value="${cab.model}">
    </div><br>
    <div class="formdesign" id="name">
        <input type="text" placeholder="Name" name="cprice" value="${cab.price}">
    </div><br>
    <div class="formdesign" id="name">
        <input type="text" placeholder="Name" name="cpassenger" value="${cab.passenger}">
    </div><br>
    <div class="formdesign" id="name">
        <input type="text" placeholder="Name" name="cluggage" value="${cab.luggage}">
    </div><br>`
    })
    document.querySelector("#booking-data-1").innerHTML = clutter;
}
showCart()


$(function(){
    var dtToday = new Date();
 
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
     day = '0' + day.toString();
    var maxDate = year + '-' + month + '-' + day;
    $('#inputdate').attr('min', maxDate);
});

function seterror(id, error) {
    elelment = document.getElementById(id)
    elelment.getElementsByClassName("formerror")[0].innerHTML = error
}

function bookingForm() {
    // let returnval = true

    let correct = /^[A-Za-z]+$/

    //perform validation and if validation fails, set the value of returnval to false
    let name = document.forms["bookForm"]["bname"].value
    if (name.length == 0) {
        seterror("name", "  *name must have alphabate")
        return false
    }
    if (name.length < 4) {
        seterror("name", "  *Length of name is too short")
        return false
    }
    if (name.match(correct))
        true
    else {
        seterror("name", "  *name must have alphabate not number")
        return false
    }

    const emaiPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    let email = document.forms["bookForm"]["bemail"].value
    if (!email.match(emaiPattern)) {
        seterror("email", " *check your email")
        return false
    }

    let phone = document.forms["bookForm"]["bphone"].value
    if (phone.length != 10) {
        seterror("phone", " *check your mobile number")
        return false
    }
}