// Define the HTML template for the attraction form
let attractionForm =
    '<div  class="attractionForm">'+
    '<form>' +
    '<label for="hourName">hour :</label>' +
    '<input type="time" class="hour" name="hourName">' +
    '<label for="attraction"></label>'+
    '<input type="text" class="attractionName" name="attraction" placeholder="drag an attraction and drop here!">'+
    '<button class="cancAttractionButton">canc</button>'+
    '</form>' +
    '</div>';

// Define options for formatting dates
let dateOptions ={ year: 'numeric', month: 'long', day: 'numeric' };

// Retrieve stored dates from local storage
let storedDates = getDataFromLocalStorage("selectedDates");

// Convert start and end date strings to Date objects
let  startDate = new Date(storedDates.startDate);
let endDate = new Date(storedDates.endDate);

// Get an array of dates between the start and end dates
let dates = betweenDates(startDate, endDate);

// Initialize the accordion with the specified ID
initializeAccordion("#itineraryAccordion");

// Create the accordion with the provided form, dates, and date options
createAccordion("#itineraryAccordion", attractionForm, dates, dateOptions);

// Attach a click event handler for adding attractions
handleAddAttractionButtonClick(".addAttractionButton", attractionForm);

// Attach a click event handler for cancelling attractions
handleCancAttractionClick("#itineraryAccordion", ".cancAttractionButton");

// Initialize draggable elements with the specified class
initializeDraggableElement(".suggestedPlace");

// Initialize the droppable area within the accordion for attraction names
initializeDroppableForm("#itineraryAccordion", ".attractionName");

