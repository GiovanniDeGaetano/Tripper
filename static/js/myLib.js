/**
 * @function
 * @name getDataFromLocalStorage
 * @description This function is designed to retrieve data from
 *              the browser's localStorage based on a specified key.
 *
 * @param {String} key - key value of stored data
 * @returns {Object} A JSON that contain the stored data
 * @returns {null} if the data was not found
 *
 */
function getDataFromLocalStorage(key) {
    // Retrieve data from localStorage
    let  storedData = localStorage.getItem(key);

    // Check if the data is not null
    if (storedData !== null) {
        // Parse the data (assuming it's stored as JSON)
        return JSON.parse(storedData);

    } else {
        // If the data is not found, you can return null or handle it as needed
        return null;
    }

}

/**
 * @function
 * @name betweenDates
 * @description take in input the first and the last day of
 *              itinerary to calculate the between dates from them.
 *
 * @param {Date} startDate - first itinerary's day
 * @param {Date} endDate - last itinerary's day
 * @returns {Array<Date>} a sorted array with all days from the first to the last
 * @example
 * // Example usage of betweenDates function
 * const startDate = new Date('2023-01-01'); // January 1, 2023,
 * const endDate = new Date('2023-01-05');   // January 5, 2023
 *
 * const itineraryDates = betweenDates(startDate, endDate);
 * console.log(itineraryDates);
 * // Output: [
 * //   2023-01-01T00:00:00.000Z,
 * //   2023-01-02T00:00:00.000Z,
 * //   2023-01-03T00:00:00.000Z,
 * //   2023-01-04T00:00:00.000Z,
 * //   2023-01-05T00:00:00.000Z
 * // ]
 */
function betweenDates(startDate, endDate){

    //declare the array that contain the itinerary's dates
    let dates = [];
    while (startDate <= endDate) {
        let temp = new Date(startDate);
        //store the date value in dates
        dates.push(temp);
        // scroll to next day
        startDate.setDate(startDate.getDate() + 1);
    }
    return dates;
}

/**
 * @function
 * @name initilizeAccordion
 * @description this function transform a html's element in
 *              to a [jquery-ui accordion]{@link https://jqueryui.com/accordion/}.
 *
 * @param {String} accordionId - the element's id that be initialized as an accordion
 * @throws {Error} If the accordionId parameter is an empty string.
 * @throws {Error} If the accordion element with the specified ID is not found on the page.
 */
function initializeAccordion(accordionId) {
    try {
        //It checks whether the accordionId parameter is a non-empty string.
        if (!accordionId || typeof accordionId !== 'string') {
            throw new Error('Invalid accordionId. Please provide a valid string.');
        }

        //wait the dom was loaded
        $(document).ready(function () {
            // if the accordion element with the specified ID doesn't exists on the page
            if ($(accordionId).length === 0) {
                throw new Error('Accordion element not found. Please check the accordionId.');
            }

            //accordion's initializing with jqueryui
            $(accordionId).accordion({
                //accordion property
                heightStyle: 'content'// dynamically adapt the accordion's content
            });
        });
    } catch (error) {
        // Accordion standard error
        console.error('Accordion initialization error:', error.message);
    }
}

/**
 *  @name dateOptions
 *  @description represents the date's formatting options applied at
 *              js function toLocaleString. All the option must be
 *              compatible with toLocaleString's param.
 *
 *
 * @typedef {Object} DateOptions
 * @property {string} year - The formatting option for the year.
 * @property {String} month - The formatting option for the month.
 * @property {String} day - The formatting option for the day.
 */

/**
 * @function
 * @name createAccordion
 * @description this function create an accordion header and content for each day
 *              on the itinerary. The header contain a string ( dateOptions formatted )
 *              of the corresponding day ( taken by dates[] ). Since the accordion can have
 *              only one content for each header, for contain more than one element, this
 *              function create an accordionContent div as dom's element and append inside
 *              this a formsList element that contain the appended forms ( attractionForm param )
 *              that contain information about the itinerary stops.
 *              In each content is appended a button to add an empty attraction.
 *
 * @param {String} accordionId - this param is the id of the initialized accordion
 * @param {Array<Date>} dates - sorted array that contain the itinerary's day
 * @param {dateOptions} dateOptions - object that describe the date format to use
 */
function createAccordion(accordionId, dates, dateOptions) {

    //assign the accordionId value of the accordion to create.
    let accordion = $(accordionId);

    // Iterate over the provided dates array
    for (let i = 0; i < dates.length; i++) {
        // Format the current date using the specified dateOptions
        let day = dates[i].toLocaleString('it-IT', dateOptions);

        // This section creates an empty accordion section with the header and the empty accordion-content (see jqueryui accordion)
        accordion.append('<h1 class="headerDate">' + day + '</h1>');

        // Remove spaces from the date string and use that as an id
        day = day.replace(/\s/g, '_');

        // Create an accordionContent div with the formatted date as id
        let accordionContent = '<div id="' + day +'" class="accordionContent"></div>';

        // Append the content of the accordion's header
        accordion.append(accordionContent);

    }
    $(".accordionContent").append('<button class = "personalizedPlaceButton">Personalized Place</button>');

    setupPersonalizedStopButton(".personalizedPlaceButton");

    initializeDroppable(".accordionContent");
}

/**
 * @function
 * @name initializeDraggableElement
 * @description Initializes the draggable behavior for the specified elements
 *              using [jQuery-ui draggable]{@link https://jqueryui.com/draggable/ }.
 *
 * @param {String} selector - The selector of the elements to be initialized
 * @throws {Error} Throws an error if the selector does not match any elements.
 *
 */
function initializeDraggableElement(selector) {
    $(selector).draggable({
        revert: "invalid",
        helper: "clone",
        appendTo: "body",
        cursorAt: { top: 0, left: 0 },
        start: function(event, ui) {
            // Aggiungi una classe al momento dell'inizio del trascinamento
            ui.helper.removeClass(selector);
            ui.helper.addClass("dragging");
        },
        stop: function(event, ui) {
            // Rimuovi la classe al termine del trascinamento
            ui.helper.removeClass("dragging");

        }
    });
}

function initializeDroppable(selector) {
    // Make the specified selector droppable
    $(selector).droppable({
        accept: ".suggestedPlace",
        precision: "touch",
        tolerance: "pointer",
        drop: function (event, ui) {
            // Clone the dragged item
            const draggedItem = $(ui.helper).clone();

            // Modify the cloned item's classes and styles
            draggedItem.removeClass("suggestedPlace").addClass("itinerary-item");
            draggedItem.css({
                position: "static",
                width: "auto",
                height: "auto"
            });
            // Add a delete button inside the cloned itinerary-item
            draggedItem.append('<button class="delete-button">Delete</button>');

            // Add a click event to the delete button
            $(selector).on('click', '.delete-button', function () {
                // Remove the parent element (itinerary-item)
                $(this).closest(".itinerary-item").remove();
            });

            // Append the modified cloned item to the droppable container
            $(this).append(draggedItem);
            draggedItem.find("h2").append(`<input class="info tempo" type="time" required> </h2>`);

        }
    });
}

function setupPersonalizedStopButton(buttonSelector) {
    $(document).on('click', buttonSelector, function() {
        // Find the closest container with the class accordionContent
        var accordionContent = $(this).closest(".accordionContent");

        // Add a div container to the found container
        var container = $('<div class="textAreaContainer"></div>').appendTo(accordionContent);

        var innerContainer = $('<div class="textInnerContainer"></div>'); // Create innerContainer separately
        // Add a textarea to the div container

        $('<textarea class="textArea"></textarea>').appendTo(innerContainer);
        $('<input class="tempo" type="time" required>').appendTo(innerContainer);

        innerContainer.appendTo(container);

        // Add a button to the div container
        $('<button class="deletePersonalizedStop">Delete</button>').appendTo(container);

        // Event to delete the textAreaContainer
        $(document).on('click', '.deletePersonalizedStop', function() {
            // Find the parent container of the button and remove it
            $(this).closest(".textAreaContainer").remove();
        });
    });
}

$('#saveButton').click(function (event){
    event.preventDefault();
    $.ajax({
            type: "GET",
            url: "/protected",
            xhrFields: {
                withCredentials: true
            },
            success: function (response) {
                submitForm();
            },
            error: function (error) {
                let iframe = $('<iframe>', {
                src: '/loginPage',
                frameborder: 0,
                width: 400,
                height: 500
                });
                $('#loginContent').html(iframe);
                $('#loginModal').dialog({
                    modal: true,
                    width: 450,
                    height: 550
                });
            }
    });

});
function showSavedMessage() {
    // Mostra il messaggio "Saved" nel contenitore
    $('#saveMessageContainer').fadeIn();

    // Nascondi il messaggio dopo un secondo
    setTimeout(function () {
        $('#saveMessageContainer').fadeOut();
    }, 1000);
}

function submitForm() {
    let form = document.getElementById('myForm');
    if (form.checkValidity()) {
        saveItinerary();
        showSavedMessage();
    }
}
function saveItinerary(){
    let itinerary = {};
    let dest = JSON.parse(localStorage.getItem('destination'));
    itinerary = {
        id: generateRandomString(32),
        destination: dest.city
    };
    for(let i = 0;i < dates.length; i++) {
        let array = [];
        let day = dates[i].toLocaleString('it-IT', dateOptions).replace(/\s/g, '_');
        itinerary[day] = [];
        let div = $('#' + day);
        let textArea = div.find('.textInnerContainer');
        let itineraryItem = div.find('.itinerary-item');
        if (textArea.length) {
            textArea.each(function (index, element) {
                let text = $(element).children().val();
                let hour = $(element).children().eq(1).val();
                let temp = {hour: hour, event: text};
                array.push(temp);
            });
        }
        if (itineraryItem.length) {
            itineraryItem.each(function (index, element) {
                let info = $(element).find('.info');
                let name = $(info[0]).data('name');
                let hour = $(info[1]).val();
                let website = $(info[2]).data('website');
                console.log(website)
                let coordinates = {lat: $(info[3]).data('lat'), lon: $(info[3]).data('lon')};
                let temp = {hour: hour, event: {title: name, website: website, coordinates: coordinates}}
                array.push(temp);
            });
        }
        array.sort(function (a, b) {
            // Converto le stringhe "hour" in oggetti Date
            let dateA = new Date('1970-01-01T' + a.hour + ':00');
            let dateB = new Date('1970-01-01T' + b.hour + ':00');
            // Confronta i timestamp delle date
            return dateA - dateB;
        });
        array.forEach(function(element){
            itinerary[day].push(element);
        });
    }
    $.ajax({
        url: "/api/saveItinerary",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(itinerary),
        xhrFields: {
            withCredentials: true
        },
        success: function (risposta) {
            console.log("Risposta dal server:", risposta);
        },
        error: function (errore) {
            console.error('Errore durante la richiesta al server:', errore);
        }
    });
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
}