document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const destination = urlParams.get('destination');

    const map = L.map('map');

    try {
        //load map
        var destCoordinates = await fetchNominatim(destination);
        loadMap(map, destCoordinates.lat, destCoordinates.lon);

        //get the list of attraction of destination
        var attractions = await fetchTouristAttractions(destCoordinates.lat, destCoordinates.lon, 60000);

        //load attraction
        for (const attraction of attractions) {
            // Example: Add a marker for each attraction
            addAttractionMarker(map, attraction.name, attraction.latitude, attraction.longitude);

            //append suggestAttraction in to suggestionAttractionlist
            $("#suggestAttractionList").append('<div class="suggestAttraction">'+attraction.name+'</div>');
        }

        map.panTo(destCoordinates);

    } catch (error) {
        console.error(error);
    }

    console.log(destCoordinates);
    console.log(attractions);
/*-------------------------------------DRAGGABLE SUGGEST ATTRACTION ---------------------------------------------------*/

    /*the suggestAttraction element are draggable element (see jqueryui). When the element are dragged the start function
     *save the dragged element in draggedElem. DraggedElem are used in the droppable element drop function to extract the
     *element content.*/

    var draggedElem;

    $(".suggestAttraction").draggable({
        revert: "invalid", // The element returns to its original position if dropped on an invalid droppable
        helper: "clone", // Creates a clone during dragging
        appendTo: "body", // Appends the clone to the body, allowing it to surpass container boundaries
        cursorAt: { left: 100, top: 50 }, //cursor position from the clone
        start: function(event, ui) {
            // Stores the dragged element in the variable
            draggedElem = $(this);
        }
    });

/*-----------------------------------------DROPPABLE ELEMENT----------------------------------------------------------*/
    /**/

    // Delega l'evento drop agli elementi con classe ".attractionName"
    $("#itineraryAccordion").on("drop", ".attractionName", function (event, ui) {
        // Ottieni l'elemento trascinato
        var draggedElem = ui.helper;

        // Ottieni il valore del testo dell'elemento trascinato
        var attractionName = draggedElem.text();

        // Trova il form genitore dell'elemento droppato
        var attractionForm = draggedElem.closest('.attractionForm');

        // Imposta il valore dell'elemento ".attractionName" nel form corrente
        attractionForm.find('.attractionName').val(attractionName);
    });

// Inizializza il droppable per gli elementi ".attractionName" all'interno di "#itineraryAccordion"
    $("#itineraryAccordion").on("mouseover", ".attractionName", function () {
        $(this).droppable({
            tolerance: "touch",
            drop: function (event, ui) {
                var draggedElem = ui.helper;
                var attractionName = draggedElem.text();
                var attractionForm = draggedElem.closest('.attractionForm');
                $(this).val(attractionName);
            }
        });
    });



});
