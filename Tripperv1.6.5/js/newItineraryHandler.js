
window.addEventListener('beforeunload', function() {
    localStorage.clear();
});

// Define options for formatting dates
let dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

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
createAccordion("#itineraryAccordion", dates, dateOptions);







