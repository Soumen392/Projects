function showCart() {

    let carts = localStorage.getItem("carts");
    let distances = localStorage.getItem("distance");
    if (carts == null) {
      cart = [];
    } else {
      cart = JSON.parse(carts);
    }

    var clutter = "";
    cart.forEach(function (cab, index) {
      clutter = `<div class="w-[200px] h-full rounded-xl bg-red-400 mr-4 overflow-hidden">
          <img class="object-cover w-full h-full" src="${cab.image}" />
      </div>
      <div class="w-[500px] h-full p-2">
          <ul>
              <li><i class="fa-solid fa-truck-fast"></i><strong>Name:</strong> ${cab.name}</li>
              <li><i class="fa-solid fa-truck-fast"></i><strong>Model:</strong> ${cab.model}</li>
              <li><i class="fa-solid fa-car"></i><strong>Car-no.:</strong> WB-H-1234</li>
              <li><i class="fa-solid fa-truck-fast"></i><strong>Driver:</strong> QWER</li>
              <li><i class="fa-solid fa-person"></i><strong>Passengers:</strong> ${cab.passenger}</li>
              <li><i class="fa-solid fa-cart-flatbed-suitcase"></i><strong>Luggage:</strong> ${cab.luggage}</li>
              <li><i class="fa-solid fa-globe"></i><strong>GPS Navigation:</strong> Yes</li>
          </ul>
      </div>`
    })
  
    document.querySelector(".bill").innerHTML = clutter;
  
  
    var clutter1 = "";
    let total = 0;
    let platform = 9;
    let gst = 200
    cart.forEach(function (elm) {
      total = total + (distances*(Number(elm.price))) + platform + gst;
      clutter1 = `<table class="table-auto border-collapse border border-slate-500 w-full h-16 text-center item-center">
      <thead class="bg-zinc-300">
          <tr>
              <th class="border border-slate-800 w-36 h-16">Car</th>
              <th class="border border-slate-800 w-36 h-16">Model Name</th>
              <th class="border border-slate-800 w-36 h-16">Quantity</th>
              <th class="border border-slate-800 w-36 h-16">Price</th>
              <th class="border border-slate-800 w-36 h-16">GST</th>
              <th class="border border-slate-800 w-36 h-16">Platform fees</th>
              <th class="border border-slate-800 w-36 h-16">Total</th>
  
          </tr>
      </thead>
      <tbody class="table-auto">
          <tr>
              <td class="border border-slate-600 h-14">${elm.name}</td>
              <td class="border border-slate-600 h-14">${elm.name}</td>
              <td class="border border-slate-600 h-14">1</td>
              <td class="border border-slate-600 h-14">$${elm.price}/K.M</td>
              <td class="border border-slate-600 h-14">$${gst}</td>
              <td class="border border-slate-600 h-14">$${platform}</td>
              <td class="border border-slate-600 h-14">$${total}</td>
          </tr>
      </tbody>
  </table>`
    })
  
    console.log(total)
    console.log(distances)
    document.querySelector(".bill1").innerHTML = clutter1;
    document.querySelector("#bill2").innerHTML = `<input type="number" placeholder="total-price" name="tprice" value="${total}">`;
  
  }
  showCart()