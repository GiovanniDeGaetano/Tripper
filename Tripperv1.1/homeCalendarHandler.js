
//check the date value before to pas them in the url and load the itinerary page
document.getElementById('myForm').addEventListener('submit', function(event) {
    var startDate = new Date(document.getElementById('startDate').value);
    var endDate = new Date(document.getElementById('endDate').value);

    if (startDate >= endDate) {
        alert('La data di fine deve essere successiva alla data di inizio.');
        event.preventDefault();
    }
});