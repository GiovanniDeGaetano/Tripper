document.addEventListener("DOMContentLoaded", async function () {
    $("#suggestedPlacesContainer").hide();
    // stored filterPlacesButton
    var buttons = document.getElementsByClassName("filterButtons");

    //hide the loading div when the page is loaded
    $(".loading-container").toggle();

    //take the destination value loaded from index.html user input
    const destination = JSON.stringify(getDataFromLocalStorage("destination"));

    //declare and initializing the map of leaflet , 'map' is the id of map canvas
    var map = L.map('map');

    try {
        //fetch the openstreetmap data through the http request to nominatim for store the coordinates of user destination
        var destCoordinates = await fetchNominatim(destination);

        //load map and adjust the view with pan
        loadMap(map, destCoordinates.lat, destCoordinates.lon, 15);

    } catch (error) {
        console.error(error);
    }



    /*---------------------------------------FILTER BUTTON-------------------------------------------------------------*/

    //create the place card elem in the dom in the suggested places elem, take in input the previous stored

    function filterAttraction(places, map) {
        $("#suggestedPlacesContainer").show();
        // Scroll through the array of places
        for (let place of places) {

            // Append suggestedPlace into suggestedPlacesContainer
            let suggestedPlacesContainer = $("#suggestedPlacesContainer");
            suggestedPlacesContainer.show();

            let placeCard = document.createElement('div');
            placeCard.classList.add('suggestedPlace');
        
        switch (place.type) {
                case "restaurant":
                    placeCard.classList.add('restaurant_place');
                  break;
                case "fast_food":
                    placeCard.classList.add('fast_place');
                    break;
                case "museum":
                    placeCard.classList.add('museum_place');
                  break;
                case "gallery":
                    placeCard.classList.add('gallery_place');
                    break; 
                case "viewpoint":
                    placeCard.classList.add('viewpoint_place');
                    break;
                case "artwork":
                    placeCard.classList.add('artwork_place');
                  break;
                case "attraction":
                    placeCard.classList.add('attraction_place');
                  break;
                case "zoo":
                    placeCard.classList.add('zoo_place');
                  break;
                case "aquarium":
                    placeCard.classList.add('aquarium_place');
                    break;
                case "theme_park":
                    placeCard.classList.add('theme_park_place');
                        break;
              }

            $(placeCard).attr('data-date', '');

            // Modify the code that creates the placeCard to include the coordinates
            placeCard.innerHTML = `<h2 class="info" data-name="${place.name}">${place.name}
                            <input class="info hour" type="time" required> </h2>`;

            if (place.website !== 'N/A') {
                placeCard.innerHTML += `<a class="info website" href="${place.website}" target="_blank" data-website="${place.website}">Website</a>`;
            }

            placeCard.innerHTML += `<a class="info where" data-lat="${place.latitude}" data-lon="${place.longitude}">where am I?</a>`;


            suggestedPlacesContainer.append(placeCard);

            // Add a marker's place
            addPlaceMarker(map, place);

        }
        map.setView(destCoordinates, 15);
        // Make the newly added element draggable
        initializeDraggableElement(".suggestedPlace");
        $(".hour").hide();


    }


// Function to move and zoom the map
    function moveAndZoomMap(element,map) {
        // Retrieve the coordinates from the data attributes
        let latitude = $(element).data('lat');
        let longitude = $(element).data('lon');

        // Convert the coordinates to a Leaflet LatLng object
        let targetLatLng = L.latLng(latitude, longitude);
        console.log('Target LatLng:', targetLatLng);

        // Move and zoom the map to the target coordinates
        map.setView(targetLatLng, 19);
    }

// Add an event handler to the document to handle clicks on the "where I am?" text
    $(document).on('click', '.suggestedPlace a', function () {
        // Call the function to move and zoom the map, passing the clicked element
        moveAndZoomMap(this,map);
    });

// Add an event handler to the document to handle clicks on the "where I am?" text
    $(document).on('click', '.itinerary-item a', function () {
        // Call the function to move and zoom the map, passing the clicked element
        moveAndZoomMap(this,map);
    });


/*---------------------------------------------FILTER BUTTON----------------------------------------------------------*/

let radius = 10000; //radius of research od the query
let lat = destCoordinates.lat; //latitude of the searched city
let lon = destCoordinates.lon; //longitude of the searched city

// Define common parameters
const commonParameters = `around:${radius},${lat},${lon}`; //geographical dates of research

// Query for museums
    const museumQuery = `node(${commonParameters})["name"]["tourism"="museum"];`;

// Query for galleries
    const galleryQuery = `node(${commonParameters})["name"]["tourism"="gallery"];`;

// Query for attractions
    const attractionQuery = `node(${commonParameters})["name"]["tourism"="attraction"];`;

// Query for artworks
    const artworkQuery = `node(${commonParameters})["name"]["tourism"="artwork"];`;

// Query for viewpoints
    const viewpointQuery = `node(${commonParameters})["name"]["tourism"="viewpoint"];`;

// Query for zoos
    const zooQuery = `node(${commonParameters})["name"]["tourism"="zoo"];`;

// Query for aquariums
    const aquariumQuery = `node(${commonParameters})["name"]["tourism"="aquarium"];`;

// Query for theme parks
    const themeParkQuery = `node(${commonParameters})["name"]["tourism"="theme_park"];`;

// Query for restaurants
    const restaurantQuery = `node(${commonParameters})["name"]["website"]["amenity"="restaurant"];`;

// Query for fast food
    const fastFoodQuery = `node(${commonParameters})["name"]["website"]["amenity"="fast_food"];`;
/*--------------------------------------------------------------------------------------------------------------------*/
    //query results
    var viewpointAndArtworkPlaces = [];
    var museumAndGalleryPlaces = [];
    var restaurantAndFastFoodPlaces = [];
    var attractionAndThemeParkPlaces = [];
    var zooAndAquariumPlaces = [];

    function isMobileDevice() {
        return /Mobi|Android|iPhone/i.test(navigator.userAgent);
    }


    //when
    $("#museumAndGalleryButton").on("click", async function () {
        if (isMobileDevice()) {
       $("#button_accordion").accordion("option", "active", false);
        }
        //disable all filter buttons during the fetching
        for(button of buttons){
            button.disabled = true;
        }

        //remove all the listed place under the map
        $(".suggestedPlace").remove();
        //remove all the marker on the map
        removeMarkers(map);

        //query's group
        const museumAndGalleryQueries = [museumQuery, galleryQuery];

        //if no data has stored of the type of place
        if (museumAndGalleryPlaces.length === 0) {
            $("#suggestedPlacesContainer").toggle();
            $(".loading-container").toggle();
            //do a fetch with the query's group
            museumAndGalleryPlaces= await fetchSuggestedPLaces(museumAndGalleryQueries);
            $(".loading-container").toggle();
            $("#suggestedPlacesContainer").toggle();
        }

        //put the query's result in the dom and in the map
        filterAttraction(museumAndGalleryPlaces, map);

        //enable all filter buttons during the fetching
        for(button of buttons){
            button.disabled = false;
        }

    });

    $("#viewPointAndArtworkButton").on("click", async function (){
        
        if (isMobileDevice()) {
        $("#button_accordion").accordion("option", "active", false);
        }

        //disable all filter buttons during the fetching
        for(button of buttons){
            button.disabled = true;
        }
        //remove all the listed place under the map
        $(".suggestedPlace").remove();
        //remove all the marker on the map
        removeMarkers(map);

        const viewpointAndArtworkQuery = [viewpointQuery, artworkQuery];

        if (viewpointAndArtworkPlaces.length === 0){
            $("#suggestedPlacesContainer").toggle();
            $(".loading-container").toggle();
            viewpointAndArtworkPlaces = await fetchSuggestedPLaces(viewpointAndArtworkQuery);
            $(".loading-container").toggle();
            $("#suggestedPlacesContainer").toggle();
        }

        filterAttraction( viewpointAndArtworkPlaces,map);

        //enable all filter buttons during the fetching
        for(button of buttons){
            button.disabled = false;
        }
    });

    $("#restaurantAndFastFoodButton").on("click", async function (){
        if (isMobileDevice()) {
        $("#button_accordion").accordion("option", "active", false);
        }
        //disable all filter buttons during the fetching
        for(button of buttons){
            button.disabled = true;
        }

        //remove all the listed place under the map
        $(".suggestedPlace").remove();
        //remove all the marker on the map
        removeMarkers(map);

        const restaurantAndFastFoodQuery = [restaurantQuery, fastFoodQuery];

        if (restaurantAndFastFoodPlaces.length === 0){
            $("#suggestedPlacesContainer").toggle();
            $(".loading-container").toggle();
            restaurantAndFastFoodPlaces = await fetchSuggestedPLaces(restaurantAndFastFoodQuery);
            $(".loading-container").toggle();
            $("#suggestedPlacesContainer").toggle();
        }

        filterAttraction(restaurantAndFastFoodPlaces,map);

        //enable all filter buttons during the fetching
        for(button of buttons){
            button.disabled = false;
        }

    });

    $('#attractionAndThemeParkButton').on("click", async function (){
        if (isMobileDevice()) {
        $("#button_accordion").accordion("option", "active", false);
        }
        //disable all filter buttons during the fetching
        for(button of buttons){
            button.disabled = true;
        }

        //remove all the listed place under the map
        $(".suggestedPlace").remove();
        //remove all the marker on the map
        removeMarkers(map);

        const attractionAndThemeParkQuery =[attractionQuery, themeParkQuery];

        if(attractionAndThemeParkPlaces.length === 0){

            $("#suggestedPlacesContainer").toggle();
            $(".loading-container").toggle();
             attractionAndThemeParkPlaces = await fetchSuggestedPLaces(attractionAndThemeParkQuery);
            $(".loading-container").toggle();
            $("#suggestedPlacesContainer").toggle();
        }

        filterAttraction(attractionAndThemeParkPlaces,map);

        //enable all filter buttons during the fetching
        for(button of buttons){
            button.disabled = false;
        }
    })

    $('#zooAndAquariumButton').on("click",  async function (){
        if (isMobileDevice()) {
        $("#button_accordion").accordion("option", "active", false);
        }
        //disable all filter buttons during the fetching
        for(button of buttons){
            button.disabled = true;
        }

        //remove all the listed place under the map
        $(".suggestedPlace").remove();
        //remove all the marker on the map
        removeMarkers(map);

        const  zooAndAquariumQuery = [zooQuery, aquariumQuery];

        if (zooAndAquariumPlaces.length === 0 ){
            $("#suggestedPlacesContainer").toggle();
            $(".loading-container").toggle();
            zooAndAquariumPlaces = await fetchSuggestedPLaces(zooAndAquariumQuery)
            $(".loading-container").toggle();
            $("#suggestedPlacesContainer").toggle();
        }

        filterAttraction(zooAndAquariumPlaces,map);

        //enable all filter buttons during the fetching
        for(button of buttons){
            button.disabled = false;
        }


    })

});

