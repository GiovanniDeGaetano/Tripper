document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const destination = urlParams.get('destination');

    const map = L.map('map');

    try {
        //load map
        var destCoordinates = await fetchNominatim(destination);
        loadMap(map, destCoordinates.lat, destCoordinates.lon);
        map.panTo(destCoordinates);

        //get the list of tourism places of destination
        var fetchPlaces = await fetchTouristPLaces(destCoordinates.lat, destCoordinates.lon, 10000); //IMPORTANT! this store all the place fetched by overpasss

        //limit the number of restaurant to 100 to prevent a crash IMPORTANT!!!
        // slice all non restaurant element and merge them with the first 100 restaurant
        var  places = fetchPlaces.filter(place => place.type !== "restaurant").concat(fetchPlaces.filter(place => place.type === "restaurant").slice(0, 100));



    } catch (error) {
        console.error(error);
    }

    console.log(places);


    /*---------------------------------------FILTER BUTTON-----------------------------------------------------------------*/
    function filterAttraction(type,secondType, places,map){


        $(".suggestedPlace").remove();

        removeMarkers(map);

        for (let place of places) {
            //append suggestedPlace in to suggestionAttractionlist
            if(place.type === type || place.type === secondType) {

                $("#suggestedPlacesContainer").append('<div class="suggestedPlace">' + place.name + '</div>');

               // Add a marker for each place
                addPlaceMarker(map, place);

            }
            //make the new filtered element draggable
            $(".suggestedPlace").draggable({
                revert: "invalid", // The element returns to its original position if dropped on an invalid droppable
                helper: "clone", // Creates a clone during dragging
                appendTo: "body", // Appends the clone to the body, allowing it to surpass container boundaries
                cursorAt: { left: 100, top: 50 }, //cursor position from the clone
                start: function(event, ui) {
                    // Stores the dragged element in the variable
                    draggedElem = $(this);
                }
            });
        }
    }
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

