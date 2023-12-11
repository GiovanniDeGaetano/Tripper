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
                heightStyle: 'content' // dynamically adapt the accordion's content
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
 * @param {String} attractionForm - this parameter is a string that represents a html form, used to contain information about the stops
 * @param {Array<Date>} dates - sorted array that contain the itinerary's day
 * @param {dateOptions} dateOptions - object that describe the date format to use
 */
function createAccordion(accordionId, attractionForm, dates, dateOptions) {

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
        let accordionContent = $('<div id="' + day +'" class="accordionContent"></div>');

        // Append the content of the accordion's header
        accordion.append(accordionContent);

        // Append the formsList that contains the forms for attractions
        let formsList = $('<div class="formsList"></div>');
        accordionContent.append(formsList);


        // Append the attractionForm to the formsList
        formsList.append(attractionForm);

        // Append the "ADD ATTRACTION" button to the accordion content
        accordionContent.append('<button class="addAttractionButton">ADD ATTRACTION</button>');


    }
}

/**
 * @function
 * @name handleAddAttractionButtonClick
 * @description this function dynamically add an empty attractionForm
 *              ( form that represent the itinerary's stop ) inside the
 *              formsList element when ADD ATTRACTION button is clicked.
 *
 * @param {String} buttonId - id of the ADD ATTRACTION button's element
 * @param {String} attractionForm  this parameter is a string that represents a html form, used to contain information about the stops
 */
function handleAddAttractionButtonClick(buttonId, attractionForm) {
    // Set up a click event handler for the button
    $(buttonId).button().on('click', function() {
        // Get the parent element of the clicked button
        let addAttractionFather = $(this).parent();

        // Find the formsList within the parent element
        let formsList = $(addAttractionFather).find(".formsList");

        // Append the attractionForm at the end of formsList
        formsList.append(attractionForm);
    });
}

/**
 * @function
 * @name handleCancAttractionClick
 * @description the CANC button is placed in the attractionForm
 *              (form that represents the itinerary's stop ). This
 *              function delete the form of belonging of the button.
 *              Since the most of the form are added after the dom
 *              is loaded the new canc button don't have the property
 *              to delete the father form so delegate this event to the
 *              accordion that are loaded with the dom.
 *
 * @param {String} containerId - represents the id's element to delegate the deletion.
 * @param {String} targetClass - represents the class's element to delete.
 */
function handleCancAttractionClick(containerId, targetClass) {
    // Set up a click event handler for the button
    $(containerId).on('click', targetClass, function () {
        // Get the parent element of the clicked button and delete it
        $(this).parent().remove();
    });
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
    //initialize the selector element as draggable
    $(selector).draggable({
        //property of the draggable element when was dragged
        revert: "invalid",
        helper: "clone",
        appendTo: "body",
        cursorAt: { left: 100, top: 50 },
    });
}

/**
 * @function
 * @name initializeDroppableForm
 * @description Activate the "mouseover" event on elements with the specified selector.
 *              Make the elements droppable and update their value on drop. When a
 *              suggested place was dragged and mouseover on the attractionForm
 *              attractionName input, the drop event extract the text from the draggable
 *              elem and set that as value of attractionName input.
 *              Use the accordion selector to delegate this event to element dynamically
 *              added after the dom loading. See [jquery-ui droppable]{@link https://jqueryui.com/droppable/}
 *              for more.
 *
 *
 * @param {String} accordionSelector - The ID selector for the accordion element
 * @param {String} formSelector - The class selector for elements to be made droppable
 * @param {String} draggableSelector - the draggable element's selector we want to interact with the formSelector element
 *
 */
function initializeDroppableForm(accordionSelector, formSelector) {
    // Activate droppable behavior when the mouse is over the specified form element
    $(accordionSelector).on("mouseover", formSelector, function () {
        $(this).droppable({
            tolerance: "touch",
            // Handle the drop event of the form element
            drop: function (event, ui) {
                // Get the dragged element
                let draggedElem = ui.helper;
                //check if the dragged elem has the right selector
                // Get the text of the dragged element
                let placeName = draggedElem.text();
                // Set the value of the form element to the name of the dragged attraction
                $(this).val(placeName);

        }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
    $('#saveButton').click(function (){
        let itinerary = {};
        let url = "http://127.0.0.1:5000/api/saveItinerary";
        itinerary = {
            destination: localStorage.getItem('destination')
        };

        let events = [],hours=[],count= new Array(dates.length).fill(0);
        let prevDay = dates[0].toLocaleString('it-IT', dateOptions).replace(/\s/g, '_');
        let i= 0;
        $('.attractionName').each(function(index, element) {
            const day = $(element).parent().parent().parent().parent().attr('id');
            if(day !== prevDay){
                i++;
                count[i]++;
                prevDay = day;
            }
            else{
                count[i]++;
            }
            itinerary[day] = [];
            events[index] = $(element).val();
        });
        $('.hour').each(function(index, element) {
            hours[index] = $(element).val();
            console.log($(element).val());
        });

        let j = 0,k = 0;
        for(let index= 0; index < events.length; index++) {
            let temp ={hour : hours[index],event : events[index]};
            if(k < count[j]) {
                itinerary[dates[j].toLocaleString('it-IT', dateOptions).replace(/\s/g, '_')].push(temp);
                k++;
            }
            else{
                j++;
                itinerary[dates[j].toLocaleString('it-IT', dateOptions).replace(/\s/g, '_')].push(temp);
                k = 1;
            }
        }
        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(itinerary),
            success: function (risposta) {
                console.log("Risposta dal server:", risposta);
            },
            error: function (errore) {
                console.error('Errore durante la richiesta al server:', errore);
            }
        });

    });