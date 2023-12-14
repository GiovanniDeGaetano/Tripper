document.addEventListener("DOMContentLoaded", async function () {

    //take the destination value loaded from index.html user input
    const destination = JSON.stringify(getDataFromLocalStorage("destination"));
    console.log(destination);

    //declare and initializing the map of leaflet , 'map' is the id of map canvas
    var map = L.map('map');

    try {
        //fetch the openstreetmap data through the http request to nominatim for store the coordinates of user destination
        var destCoordinates = await fetchNominatim(destination);
        //load map and adjust the view with pan
        loadMap(map, destCoordinates.lat, destCoordinates.lon, 15);

        /*----------------------------------------pre fetch operation-------------------------------------------------*/

        /*disable the user interaction to prevent error in fetch and loading phase*/

        //store the filter buttons
        let filterButtons = document.getElementsByClassName("filterButtons") ;

        //disable the buttons before the places are fetched
        for(button of filterButtons){
            button.disabled = true;
        }

        //disable the list of suggested place for show the loading screen
        document.getElementById('suggestedPlacesContainer').style.display = 'none';
        // enable the loading screen while the places are fetched
        document.getElementById('loadingSuggestedPlaces').style.display = 'inline-block';

        /*------------------------------------------------------------------------------------------------------------*/

        //fetch the list of suggested place of the user destination from the query of overpass in a range ok 10km and store them in an array
        var fetchPlaces = await fetchSuggestedPLaces(destCoordinates.lat, destCoordinates.lon, 10000); //IMPORTANT!
        /*each fetched data represent a physical location  on the map, the structure of the location is in mapLibrary.js */

        //limit the number of restaurant to 100 to prevent a crash IMPORTANT!!!
        // slice all non restaurant element and merge them with the first 100 restaurant
        var  places = fetchPlaces.filter(place => place.type !== "restaurant").concat(fetchPlaces.filter(place => place.type === "restaurant").slice(0, 100));

        /*----------------------------------------post fetch operation-------------------------------------------------*/

        /*enable user interaction when the places are fetched and loaded*/

        //disable and hide the loading screen for enable the  suggestedPlace container
        document.getElementById('loadingSuggestedPlaces').style.display = 'none';

        //enable the suggestedPlaces Container
        document.getElementById('suggestedPlacesContainer').style.display = 'inline-block';

        //enable the filter buttons after the fetch
        for(button of filterButtons){
            button.disabled = false;
        }
        /*------------------------------------------------------------------------------------------------------------*/

    } catch (error) {
        console.error(error);
    }

    console.log(places);



    /*---------------------------------------FILTER BUTTON-------------------------------------------------------------*/
    /*this function is used by the buttons for filter the place that are listed and showed on the map. The function take
    * in input the types (type and secondType) of place that must be showed on the map and listed, and the map. The function
    * take in input two type on place because each button can display two types of place, if a button load only one type of
    * place assign to secondType the value " ". the behavior of the function is spliced in 3 step : 1) remove all listed
    * place element, 2) remove all marked place on the map, 3) append al the place of the right types and load new marker*/


    function filterAttraction(type,secondType, places,map){

        //remove all the listed place under the map
        $(".suggestedPlace").remove();
        //remove all the marker on the map
        removeMarkers(map);

        //scroll the array of places
        for (let place of places) {

            //for all the scrolled place check the types
            if(place.type === type || place.type === secondType) {

                //append suggestedPlace in to suggestedPlacesContainer
                let suggestedPlacesContainer = $("#suggestedPlacesContainer");

                let placeCard = document.createElement('div');

                placeCard.classList.add('suggestedPlace');

                // Modifica il codice che crea il placeCard per includere le coordinate
                placeCard.innerHTML = `<h2 data-name="${place.name}">${place.name}</h2>
                                         <a href="${place.website}" target="_blank" data-website="${place.website}">Website</a>
                                        <a data-lat="${place.latitude}" data-lon="${place.longitude}">where I am ?</a>`;


                suggestedPlacesContainer.append(placeCard);

               // Add a marker's place
                addPlaceMarker(map, place);

                //make the new added element draggable
                initializeDraggableElement(".suggestedPlace");


            }

        }
        map.setView(destCoordinates,15);
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


    /*-----------------------------------------FILTER BUTTON LIST---------------------------------------------------------*/


    $("#museumAndGalleryButton").on("click", function (){
        filterAttraction("museum","gallery",places,map);
    });

    $("#viewPointAndArtworkButton").on("click", function (){
        filterAttraction("viewpoint","artwork", places,map);
    });

    $("#restaurantAndFastFoodButton").on("click", function (){
        filterAttraction("restaurant","fast_food", places,map);

    });

    $('#attractionAndThemeParkButton').on("click", function (){
        filterAttraction("attraction", "theme_park", places,map);
    })

    $('#zooAndAquariumButton').on("click", function (){
        filterAttraction("zoo", "aquarium", places,map);
    })

});

