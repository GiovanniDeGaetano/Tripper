// Constant for OpenStreetMap tile layer URL
const OPENSTREETMAP_TILE_LAYER_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

// Constant for Nominatim API base URL
const NOMINATIM_API_BASE_URL = 'https://nominatim.openstreetmap.org/search?format=json&q=';

// Constant for Overpass API base URL
const OVERPASS_API_BASE_URL = 'https://maps.mail.ru/osm/tools/overpass/api/interpreter?data=';




// Function to retrieve the user's current position using the Geolocation API
function fetchUserPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            // Resolve the promise with the user's coordinates if successfully retrieved
            position => resolve([position.coords.latitude, position.coords.longitude]),
            // Reject the promise with an error if there's an issue retrieving the position
            error => {
                console.log("Unable to get user coordinates");
                reject(error);
            }
        );
    });
}

// Function to create a map using the Leaflet library and center it on the specified coordinates
function loadMap(map, lat,lon) {
    // Create the map and set the initial view to the specified lat,lon

    map.setView({lat,lon}, 15);

    // Add an OpenStreetMap tile layer to the map
    L.tileLayer(OPENSTREETMAP_TILE_LAYER_URL, {
        maxZoom: 19, // Set the maximum zoom level
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>', // Set the attribution
        // Set user-agent for the request
        headers: {
            'User-Agent': 'Tripper'
        }
    }).addTo(map); // Add the tile layer to the map
}

// Function to add a marker to the map at the specified coordinates
function addPlaceMarker(map, place) {
    // Create a marker at the specified coordinates
    let newMarker = L.marker([place.latitude, place.longitude]).addTo(map);

    // Popup information with name and website
    let popupContent = `<b>${place.name}</b>`;
    if (place.website && place.website !== 'N/A') {
        popupContent += `<br/><a href="${place.website}" target="_blank">${place.website}</a>`;
    }

    newMarker.bindPopup(popupContent).openPopup();

    // Bind the popup to open on mouseover
    newMarker.on('mouseover', function () {
        this.openPopup();
    });

    // Close the popup on mouseout (optional)
   /* newMarker.on('mouseout', function () {
        this.closePopup();
    });*/
}




function removeMarkers(map) {
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
}



// Function to fetch the coordinates of a location using Nominatim
function fetchNominatim(placeToSearch) {
    return new Promise((resolve, reject) => {
        // Construct the URL for the request using the given location name
        const url = `${NOMINATIM_API_BASE_URL}${placeToSearch}`;

        // Use the Fetch API to make an HTTP request to the Nominatim API
        fetch(url)
            .then(response => {
                // Check if the response status is OK (status code 200)
                if (!response.ok) {
                    // If not OK, reject the promise with an error message
                    throw new Error(`Request error: ${response.statusText}`);
                }
                // Parse the JSON response
                return response.json();
            })
            .then(data => {
                // Check if there are any results in the response
                if (data.length > 0) {
                    // Extract latitude and longitude from the response and update placeCoordinates array
                    const placeCoordinates = {lat:data[0].lat, lon:data[0].lon};
                    // Resolve the promise with the updated placeCoordinates array
                    resolve(placeCoordinates);
                } else {
                    // If no results found, log a message and reject the promise with an error message
                    console.log(`No results found for ${placeToSearch}`);
                    reject(`No results found for ${placeToSearch}`);
                }
            })
            .catch(error => {
                // If there's an error during the request or parsing the response, log an error message
                console.error(`Error during request: ${error.message}`);
                // Reject the promise with the error message
                reject(new Error(`Error during request: ${error.message}`));
            });
    });
}

// Function to fetch tourist attractions around a specified location
async function fetchTouristPLaces(lat, lon, radius) {
    // Construct the Overpass query
    const overpassQuery = `[out:json];
    (
     node(around:${radius},${lat},${lon})["name"]["tourism"="museum"];
     node(around:${radius},${lat},${lon})["name"]["tourism"="gallery"];
     node(around:${radius},${lat},${lon})["name"]["tourism"="attraction"];
     node(around:${radius},${lat},${lon})["name"]["tourism"="artwork"];
     node(around:${radius},${lat},${lon})["name"]["tourism"="viewpoint"];
     node(around:${radius},${lat},${lon})["name"]["tourism"="zoo"];
     node(around:${radius},${lat},${lon})["name"]["tourism"="aquarium"];
     node(around:${radius},${lat},${lon})["name"]["tourism"="theme_park"];
     node(around:${radius},${lat},${lon})["name"]["amenity"="restaurant"];
     node(around:${radius},${lat},${lon})["name"]["amenity"="fast_food"];
    );
    out body;
    >;
    out center qt;`;

    // Encode the query for the URL
    const encodedQuery = encodeURIComponent(overpassQuery);

    // Construct the URL for the request
    const apiUrl = `${OVERPASS_API_BASE_URL}${encodedQuery}`;

    try {
        // Make the HTTP request using fetch
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Directly return the mapped array with the desired information
        return data.elements.map(element => {

            return {
                name: element.tags && element.tags.name ? element.tags.name : 'N/A',
                latitude: element.lat,
                longitude: element.lon,
                website: element.tags && element.tags.website ? element.tags.website : 'N/A',
                type: element.tags && (element.tags.amenity || element.tags.tourism) ? (element.tags.amenity || element.tags.tourism) : 'N/A'
            };
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        // In case of an error, handle the error or return a default value, e.g., an empty array
        return [];
    }
}
