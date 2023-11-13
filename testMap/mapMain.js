document.addEventListener("DOMContentLoaded", function () {
    // This function is called when the DOM has been loaded


    let map; // This variable will hold the reference to the map object
    let userCoordinate = []; // This array will store the user's latitude and longitude coordinates

    


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
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' // Set the attribution
        }).addTo(map); // Add the tile layer to the map

    }

    // This function adds a marker to the map at the user's coordinates
    function addMarker(userCoordinate) {
        // Create a marker at the user's coordinates
        let newMarker = L.marker(userCoordinate).addTo(map);
    }


    // This function is the main entry point for the application
   function mainTest(successCallback, errorCallback) {
        // Call the getUserPosition function to retrieve the user's coordinates
        getUserPosition(function (coordinate) {
            // If the user's coordinates are successfully retrieved, call the loadMap and addMarker functions
            loadMap(coordinate);
            addMarker(coordinate);


        }, function (error) {
            // If there is an error retrieving the user's coordinates, log an error message
            console.log("map not loaded");
            errorCallback(error);
        });
    }

    // Call the mainTest function to start the application
    mainTest();





});




