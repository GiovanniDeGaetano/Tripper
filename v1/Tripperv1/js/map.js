document.addEventListener("DOMContentLoaded", function () {
        let map; // This variable will hold the reference to the map object
        let userCoordinate = []; // This array will store the user's latitude and longitude coordinates
        const urlParams = new URLSearchParams(window.location.search);
        const city = urlParams.get('place');

        // This function retrieves the user's current position using the Geolocation API
        function getUserPosition(successCallback, errorCallback) {
            navigator.geolocation.getCurrentPosition(function (position) {
                // If the user's position is successfully retrieved, call the successCallback function
                userCoordinate = [position.coords.latitude, position.coords.longitude];
                successCallback(userCoordinate);
            }, function (error) {
                // If there is an error retrieving the user's position, call the errorCallback function
                console.log("cant have the user coordinate");
                errorCallback(error);
            });
        }

        // This function creates a map using the Leaflet library and centers it on the user's coordinates
        function loadMap(userCoordinate) {
            map = L.map('map').setView(userCoordinate, 13); // Create the map and set the initial view to the user's coordinates
            map.addControl(L.control.search({ position: 'bottomright' }));

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
        function addMarker(userCoordinate) {
            // Create a marker at the user's coordinates
            let newMarker = L.marker(userCoordinate).addTo(map);
        }

        // Funzione per ottenere le coordinate di una città da Nominatim
        // NON TOCCARE NULLA (NON SO COME FUNZIONA IN REALTÀ)
        function requestNominatim(place) {
            return new Promise((resolve, reject) => {
                // Construct the URL for the request using the given city name
                const url = `https://nominatim.openstreetmap.org/search?format=json&q=${place}`;

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
                            // Extract latitude and longitude from the response and update userCoordinate array
                            userCoordinate[0] = data[0].lat;
                            userCoordinate[1] = data[0].lon;
                            // Resolve the promise with the updated userCoordinate array
                            resolve(userCoordinate);
                        } else {
                            // If no results found, log a message and reject the promise with an error message
                            console.log(`Nessun risultato trovato per ${place}`);
                            reject(`Nessun risultato trovato per ${place}`);
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

        function mainTest() {
            requestNominatim(city)
                .then((coordinates) => {
                    // If the promise is resolved, call loadMap with the obtained coordinates
                    loadMap(coordinates);
                    addMarker(coordinates);
                    // Log the obtained coordinates
                    console.log(coordinates);
                })
                .catch(error => {
                    // If there's an error in requestNominatim, log the error message
                    console.error(error);
                });
        }
        mainTest();
});
