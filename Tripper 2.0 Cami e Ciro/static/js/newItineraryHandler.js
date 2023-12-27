window.addEventListener('beforeunload', function() {
    localStorage.clear();
});

// Aggiungi eventuali script JavaScript qui
function showAlert(buttonNumber) {
    alert('Hai premuto il pulsante ' + buttonNumber);
}

function isMobileDevice() {
    return /Mobi|Android|iPhone/i.test(navigator.userAgent);
}


if (isMobileDevice()) {
        console.log('Telefono');
				
        $("#button_accordion").accordion({ active: false, collapsible: true });
        $("#header_accordion").text("ciao");
			
    } else {
        console.log('Il dispositivo non è un cellulare.');
    }

// Define options for formatting dates
let dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

// Retrieve stored dates from local storage
let storedDates = getDataFromLocalStorage("selectedDates");
let startDate, endDate;
if(storedDates === null){
    startDate = new Date();
    endDate = new Date();
}
else{
    // Convert start and end date strings to Date objects
    startDate = new Date(storedDates.startDate);
    endDate = new Date(storedDates.endDate);
}

// Get an array of dates between the start and end dates
let dates = betweenDates(startDate, endDate);

// Initialize the accordion with the specified ID
initializeAccordion("#itineraryAccordion");

// Create the accordion with the provided form, dates, and date options
createAccordion("#itineraryAccordion", dates, dateOptions);


