/**
 * @name TILE_LAYER_URL
 * @description store the URL template of the tile layer of the map
 * @type {string}
 *
 */
// Constant for OpenStreetMap tile layer URL
const TILE_LAYER_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

/**
 * @name NOMINATIM_API_URL
 * @description store the URL to nominatim's API , used to get the coordinates of searched city
 * @type {string}
 */
// Constant for Nominatim API base URL
const NOMINATIM_API_URL = 'https://nominatim.openstreetmap.org/search?format=json&q=';

/**
 * @name OVERPASS_API_URL
 * @description URL used to query the places to visit
 * @type {string}
 */
// Constant for Overpass API base URL
const OVERPASS_API_URL = 'https://maps.mail.ru/osm/tools/overpass/api/interpreter?data=';


/* Function to retrieve the user's current position using the Geolocation API
  ------ never used but always useful

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
*/


/**
 * @function
 * @name loadMap
 * @description load the map using TILE_LAYER_URL and center the map
 *              at choose latitude and longitude and zoom value
 *
 * @param {Object} map - see [leafleatjs doc]{@link https://leafletjs.com/reference.html#map}
 * @param lat - latitude value
 * @param lon - longitude value
 * @param zoom - zoom value
 */
function loadMap(map, lat, lon, zoom) {

    // Create the map and set the initial zoom to the specified lat,lon
    map.setView({lat,lon}, zoom);

    // Add an OpenStreetMap tile layer to the map
    L.tileLayer(TILE_LAYER_URL, {
        maxZoom: 19, // Set the maximum zoom level
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>', // Set the attribution
        // Set user-agent for the request
        headers: {
            'User-Agent': 'Tripper'
        }
    }).addTo(map); // Add the tile layer to the map
}

/**
 * @typedef {Object} place
 * @property {string} name - place's name
 * @property {number} latitude - place's latitude
 * @property {number} longitude - place's longitude
 * @property {string} website - URL of the website's place
 * @property {string} type - describe the type of the place (museum, restaurant etc...)
 * @property {string} [cuisine] - if the  place is a restaurant or a fast food describe the cuisine type
 */

/**
 * @function
 * @name addPlaceMaker
 * @description this function add a mark on the target map.
 *              This marker represent the place information
 *              put in input. The added marker has a popup
 *              element bound that contain the place's
 *              information. That popup open with the
 *              mouseover.
 *
 * @param {Object} map - map target , where add the marker see [leafleatjs doc]{@link https://leafletjs.com/reference.html#map}
 * @param place - the place to put on the target map
 */



function addPlaceMarker(map, place) {
    let newMarker

    newMarker = L.marker([place.latitude, place.longitude]).addTo(map);

    // Popup information with name and website
    let popupContent = `<b>${place.name}</b>`;

    //check if the place have a website
    if (place.website !== 'N/A') {
        //if place have website add the website in the popup of the marker
        popupContent += `<br/><a href="${place.website}" target="_blank">${place.website}</a>`;

    }
    //all the restaurant and fast food fetched have a website (see fetchTouristPlaces) for business logic
    if (place.type === "restaurant" || place.type === "fast_food") {
        //add the type of cuisine in the popup of the marker
        popupContent += `<br/><a>Cuisine type: ${place.cuisine}</a>`;
    }


    //bind marker to popup
    newMarker.bindPopup(popupContent).openPopup();

    // Bind the popup to open on mouseover
    newMarker.on('mouseover', function () {
        this.openPopup();
    });
}

/**
 * @function
 * @name removeMarkers
 * @description this function remove all
 *              markers on the target map.
 *
 * @param {Object} map - the target map where remove the markers,  see [leafleatjs doc]{@link https://leafletjs.com/reference.html#map}
 */
function removeMarkers(map) {
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
}

/**
 * @typedef {Object} PlaceCoordinates
 * @property {string} lat - The latitude of the location
 * @property {string} lon - The longitude of the location
 */

/**
 * @function
 * @name fetchNominatim
 * @description this function use NOMINATIM_API_URL to do a http request
 *              to nominatim server, the request if succeeded return a
 *              promise with the coordinates of searched place.
 *
 * @param {String} placeToSearch - the name of the place to search
 * @returns {Promise<PlaceCoordinates>} coordinates of the searched place
 * @throws {Error} If the request to the Nominatim API fails or if there's an error parsing the response.
 * @throws {string} If no results are found for the specified place.
 */
function fetchNominatim(placeToSearch) {
    return new Promise((resolve, reject) => {
        // Construct the URL for the request using the given location name
        const url = `${NOMINATIM_API_URL}${placeToSearch}`;

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

/*--------------------------------------------------------------------------------------------------------------------*/



async function fetchSuggestedPLaces(queries) {
    // Construct the Overpass query using overpass_QL
    const overpassQuery = `[out:json];
    (
        ${queries.join('\n')}
    );
    out body;
    >;
    out center qt;`;

    // Encode the query for the URL
    const encodedQuery = encodeURIComponent(overpassQuery);

    // Construct the URL for the request
    const apiUrl = `${OVERPASS_API_URL}${encodedQuery}`;

    try {
        // Make the HTTP request using fetch
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Directly return the mapped array with the desired information
        return data.elements.map(element => {
            //restaurant and fast food have a different object structure from other place type to add the type of cuisine
            // Check if the amenity is a restaurant and extract cuisine type if available
            if(element.tags && (element.tags.amenity === 'restaurant' || element.tags.amenity === 'fast_food') && element.tags.cuisine){
                return {
                    //structure of the place's object (restaurant and fast food)
                    name: element.tags && element.tags.name ? element.tags.name : 'N/A', // if the value not found put 'N/A'
                    latitude: element.lat,
                    longitude: element.lon,
                    website: element.tags && element.tags.website ? element.tags.website : 'N/A',
                    type: element.tags && (element.tags.amenity || element.tags.tourism) ? (element.tags.amenity || element.tags.tourism) : 'N/A',
                    cuisine :  element.tags && element.tags.cuisine ? element.tags.cuisine : 'N/A'
                };

            }
            else {
                return {
                    //structure of the place's object
                    name: element.tags && element.tags.name ? element.tags.name : 'N/A',
                    latitude: element.lat,
                    longitude: element.lon,
                    website: element.tags && element.tags.website ? element.tags.website : 'N/A',
                    type: element.tags && (element.tags.amenity || element.tags.tourism) ? (element.tags.amenity || element.tags.tourism) : 'N/A'
                };

            }
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        // In case of an error return null
        return null ;
    }
}

