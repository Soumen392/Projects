{/* <script> */ }
var map = L.map('map').setView([20.5937, 78.9629], 5); // Centered on India

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

var fromMarker, toMarker;
var routeControl;

function addMarker(lat, lon, type) {
  var marker = L.marker([lat, lon]).addTo(map);
  if (type === 'from') {
    if (fromMarker) map.removeLayer(fromMarker);
    fromMarker = marker;
  } else {
    if (toMarker) map.removeLayer(toMarker);
    toMarker = marker;
  }
}

function showSuggestions(inputId, suggestionBoxId, results) {
  var suggestionBox = document.getElementById(suggestionBoxId);
  suggestionBox.innerHTML = '';

  results.forEach(result => {
    var suggestionItem = document.createElement('div');
    suggestionItem.textContent = result.display_name;
    suggestionItem.classList.add('suggestion-item');
    suggestionItem.addEventListener('click', function () {
      document.getElementById(inputId).value = result.display_name;
      suggestionBox.innerHTML = '';
    });
    suggestionBox.appendChild(suggestionItem);
  });
}

function fetchSuggestions(query, suggestionBoxId) {
  axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1`)
    .then(response => {
      showSuggestions(query === document.getElementById('from').value ? 'from' : 'to', suggestionBoxId, response.data);
    });
}

document.getElementById('from').addEventListener('input', function () {
  var query = this.value;
  if (query.length > 2) {
    fetchSuggestions(query, 'fromSuggestions');
  } else {
    document.getElementById('fromSuggestions').innerHTML = '';
  }
});

document.getElementById('to').addEventListener('input', function () {
  var query = this.value;
  if (query.length > 2) {
    fetchSuggestions(query, 'toSuggestions');
  } else {
    document.getElementById('toSuggestions').innerHTML = '';
  }
});

document.getElementById('calculateDistance').addEventListener('click', function () {
  var fromQuery = document.getElementById('from').value;
  var toQuery = document.getElementById('to').value;

  Promise.all([
    axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${fromQuery}&addressdetails=1`),
    axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${toQuery}&addressdetails=1`)
  ]).then(responses => {
    var fromData = responses[0].data[0];
    var toData = responses[1].data[0];

    var fromLat = fromData.lat;
    var fromLon = fromData.lon;
    var toLat = toData.lat;
    var toLon = toData.lon;

    addMarker(fromLat, fromLon, 'from');
    addMarker(toLat, toLon, 'to');

    if (routeControl) {
      map.removeControl(routeControl);
    }

    routeControl = L.Routing.control({
      waypoints: [
        L.latLng(fromLat, fromLon),
        L.latLng(toLat, toLon)
      ],
      createMarker: function (i, waypoint, n) {
        return L.marker(waypoint.latLng, {
          draggable: true
        });
      },
      routeWhileDragging: true,
      showAlternatives: true,
      altLineOptions: {
        styles: [
          { color: 'black', opacity: 0.15, weight: 9 },
          { color: 'white', opacity: 0.8, weight: 6 },
          { color: 'blue', opacity: 0.5, weight: 2 }
        ]
      }
    }).addTo(map);

    routeControl.on('routesfound', function (e) {
      var routes = e.routes;
      var summary = routes[0].summary;
      // alert('Distance: ' + (summary.totalDistance / 1000).toFixed(2) + ' km, Time: ' + (summary.totalTime / 3600).toFixed(2) + ' minutes');

      // document.getElementById('show').innerHTML = `Distance: ${distance.toFixed(2)} km, Duration: ${duration.toFixed(2)} min`;
      document.getElementById('abcd').innerHTML = `<label style="margin-right: 100px;">Total Distance:</label>
                                                   <input type="text" placeholder="distance" id="calculateDistance" value="${(summary.totalDistance / 1000).toFixed(2)} km" name="distance">`;

      document.getElementById('abc').innerHTML = `<h4>Distance: ${(summary.totalDistance / 1000).toFixed(2)} km </h4>
                                                     <h4>Duration: ${(summary.totalTime / 3600).toFixed(2)} hours </h4>
                                                     <h4>Duration: ${(summary.totalTime / 60).toFixed(2)} minutes </h4>`;
      localStorage.setItem("distance",((summary.totalDistance / 1000).toFixed(2)))

    });
  });
});
// </script>
