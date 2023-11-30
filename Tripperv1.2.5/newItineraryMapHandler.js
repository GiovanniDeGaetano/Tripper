document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const destination = urlParams.get('destination');

    try {
        var coordinates = await fetchNominatim(destination);
        loadMap(coordinates);
        addMarker(coordinates);


        var attractions = await fetchTouristAttractions(coordinates[0], coordinates[1], 60000);

    } catch (error) {
        console.error(error);
    }

    console.log(coordinates);
    console.log(attractions);





});
