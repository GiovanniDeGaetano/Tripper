document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const destination = urlParams.get('destination');

    const map = L.map('map');

    try {
        //load map

        var destCoordinates = await fetchNominatim(destination);
        loadMap(map, destCoordinates.lat, destCoordinates.lon);

        var attractions = await fetchTouristAttractions(destCoordinates.lat, destCoordinates.lon, 60000);

        //load attraction
        for (const attraction of attractions) {
            // Example: Add a marker for each attraction
            addAttractionMarker(map, attraction.name, attraction.latitude, attraction.longitude);
        }

        map.panTo(destCoordinates);



    } catch (error) {
        console.error(error);
    }

    console.log(destCoordinates);
    console.log(attractions);





});
