document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search); //save the URL in urlParams
    const destination = urlParams.get('destination'); //save in destination the value of destination in the URL



    function mainTest() {

        requestNominatim(destination)
            .then((coordinates) => {
                // If the promise is resolved, call loadMap with the obtained coordinates
                loadMap(coordinates);
                addMarker(coordinates);
                // Log the obtained coordinates
                console.log(coordinates);
            })
            .catch(error => {
                // If there's an error in requestNominatim, log the error message
                console.error(error);
            });
    }

mainTest();

});