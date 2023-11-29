document.addEventListener("DOMContentLoaded", function () {


/*-----------------------------------------PRE INITIALIZATION---------------------------------------------------------*/

    /*the goal of pre initialization part is store and prepare all the variable and element that be used in the itinerary's.
    * The itinerary are implemented by the jqueryui accordion API. The pre initialization section take from the URL (put
    * from home.html) the strings startDateS and endDateS, these represent the start and the end date of the user's itinerary,
    * these variable are converted in dates format and stored in startDate and endDate. Both variable are used for obtain
    * all dates between them, that dates stored in dates in date format. After declare the form that dynamically added from
    * click the button addAttractionButton*/



    const urlParams = new URLSearchParams(window.location.search); //save the URL in urlParams

    //get the dates from URL
    const startDateS = urlParams.get('startDate');
    const endDateS = urlParams.get('endDate');

    //in the URL dates are in string format, so we must convert them in date
    const startDate = new Date(startDateS);
    const endDate = new Date(endDateS);



    let dates = [];
    /*this loop create dates between startDate and endDate and store them in dates*/
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
            dates.push(new Date(currentDate)); //store the date value in dates
            currentDate.setDate(currentDate.getDate() + 1); // +1 for scale at next day
    }



    /*define the attraction form*/
    let attractionForm =
        '<div  class="attractionForm">'+
                '<form>' +
                    '<label for="hour">hour :</label>' +
                    '<input type="time" class="hour" name="hour">' +
                    '<label for="attraction"></label>'+
                    '<input type="text" class="attractionName" name="attraction" placeholder="drag an attraction and drop here!">'+
                    '<button class="cancAttractionButton">canc</button>'+
                '</form>' +
        '</div>';



    //option for the date format
    let dateOptions ={ year: 'numeric', month: 'long', day: 'numeric' };

/*-----------------------------------------ACCORDION INITIALIZATION---------------------------------------------------*/

    /*the accordion initialization use the jqueryui API to create an empty accordion. The accordion's element are write in
    * newItinerary.html. The jquery accordion let to define only a header and only a content for each accordion , so for
    * contain more than element we define the element accordionContent, that element contain the list of all attraction form
    *(formsList) and the addAttractionButton, the header instead contain the date of the corresponding day (calculated in the pre
    * initialization). This structure are made for each accordion's element (the days on the itinerary). After create the
    * empty accordion , we set up each accordion append in the formsList and the addAttractionButton, and append the
    * first form in all formsList.*/



    //define the itinerary div as accordion (see jqueryui doc)
    $(function () {
        $("#itineraryAccordion").accordion({
            heightStyle: "content" // dynamically adapt the height of the content
        });
    })

    //save the element
    let accordion = $("#itineraryAccordion");


    //This for add an accordion header and content for each date in dates
    for(let i = 0; i < dates.length; i++)
    {

        /*this section create an empty accordion section with the header and the empty accordion-content (see jqueryui accordion)*/
        accordion.append('<h1 class="headerDate">' + dates[i].toLocaleString('it-IT', dateOptions) + '</h1>'); //usage of dateOptions
        accordion.append('<div class="accordionContent"></div>');

    }

    /*set up the accordion-content section in all accordionContent*/
    let accordionContent = $(".accordionContent");
    accordionContent.append('<div class = "formsList"></div>');
    /*add the addAttractionButton*/
    accordionContent.append('<button class ="addAttractionButton">ADD ATTRACTION</button>');


    /*make the formsList in a sortable element*/
    $( function() {
        $( ".formsList" ).sortable();
    } );

    /*add the first form in alla formsList element*/
    let formList = $(".formsList");
    formList.append(attractionForm);

/*-----------------------------------------ADD ATTRACTION BUTTON------------------------------------------------------*/

    /*addAttractionButton represent the "ADD ATTRACTION" button in each accordion. The button's event find his accordion
    * parent and the corresponding formsList and add in the found element the attractionForm element (defined in the pre
    * initialization).*/

    // Attach a click event handler to elements with the class "addAttractionButton"
    $(".addAttractionButton").button().on('click', function() {

        // Get the parent element of the clicked button
        let addAttractionFather = $(this).parent();

        // Find an element with the class "formsList" within the parent and append the content of "attractionForm"
            $(addAttractionFather).find(".formsList").append(attractionForm);

    });

    /*-----------------------------------------CANC ATTRACTION BUTTON-------------------------------------------------*/

    /* Dynamically adding elements (e.g., attraction forms) to the DOM after the initial page load raise a problem.
    *In the original code, the click event handler was attached directly to elements with class "cancAttractionButton"
    * using $(".cancAttractionButton").button().on('click', function () { }); However, this approach only attaches the
    * event handler to elements that exist at the time of code execution. Dynamic elements added later won't have the event
    * handler attached. Solution:  To handle events for dynamically added elements, event delegation is used.
    * The original event handler is replaced with the following: */

    //delegation
    $("#itineraryAccordion").on('click', '.cancAttractionButton', function () {
        // Get the parent element of the clicked button
        let cancAttractionFather = $(this).parent().parent().remove();
    });





});



