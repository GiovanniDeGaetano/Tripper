
//------------------------------------VARIABLE-------------------------------------------------------------------
let map;
var userCoordinates = []; // This array will store the user's latitude and longitude coordinates of the user
var placeCoordinates = []; // This array will store the user's latitude and longitude coordinates



//------------------------------------FUNCTION------------------------------------------------------------------



// This function retrieves the user's current position using the Geolocation API
function getUserPosition(successCallback, errorCallback) {
    navigator.geolocation.getCurrentPosition(function (position) {
        // If the user's position is successfully retrieved, call the successCallback function
        userCoordinates = [position.coords.latitude, position.coords.longitude];
        successCallback(userCoordinates);
    }, function (error) {
        // If there is an error retrieving the user's position, call the errorCallback function
        console.log("cant have the user coordinate");
        errorCallback(error);
    });
}



// This function creates a map using the Leaflet library and centers it on the user's coordinates
function loadMap(Coordinates) {
    map = L.map('map').setView(Coordinates, 13); // Create the map and set the initial view to the user's coordinates

    // Add an OpenStreetMap tile layer to the map
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19, // Set the maximum zoom level
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>', // Set the attribution
        //set user-agent
        headers: {
            'User-Agent': 'Tripper'
        }
    }).addTo(map); // Add the tile layer to the map

}



// This function adds a marker to the map at the user's coordinates
function addMarker(coordinate) {
    // Create a marker at the user's coordinates
    let newMarker = L.marker(coordinate).addTo(map);
}



// Funzione per ottenere le coordinate di una città da Nominatim
function requestNominatim(placeToSearch) {
    return new Promise((resolve, reject) => {
        // Construct the URL for the request using the given city name
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${placeToSearch}`;

        // Use the Fetch API to make an HTTP request to the Nominatim API
        fetch(url)
            .then(response => {
                // Check if the response status is OK (status code 200)
                if (!response.ok) {
                    // If not OK, reject the promise with an error message
                    throw new Error(`Errore nella richiesta: ${response.statusText}`);
                }
                // Parse the JSON response
                return response.json();
            })
            .then(data => {
                // Check if there are any results in the response
                if (data.length > 0) {
                    // Extract latitude and longitude from the response and update userCoordinates array
                    placeCoordinates[0] = data[0].lat;
                    placeCoordinates[1] = data[0].lon;
                    // Resolve the promise with the updated userCoordinates array
                    resolve(placeCoordinates);
                } else {
                    // If no results found, log a message and reject the promise with an error message
                    console.log(`Nessun risultato trovato per ${placeToSearch}`);
                    reject(`Nessun risultato trovato per ${placeToSearch}`);
                }
            })
            .catch(error => {
                // If there's an error during the request or parsing the response, log an error message
                console.error(`Errore durante la richiesta: ${error.message}`);
                // Reject the promise with the error message
                reject(error.message);
            });
    });
}



