document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search); //save the URL in urlParams

    //get the dates from URL
    const startDateS = urlParams.get('startDate');
    const endDateS = urlParams.get('endDate');

    //in the URL dates are in string format, so we must convert them in date
    const startDate = new Date(startDateS);
    const endDate = new Date(endDateS);


    //function for fill an array with all date between startDate and endDate
    function getDatesBetween(startDate, endDate) {
        const dates = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1); // +1 for scale the next day
        }

        return dates;
    }


    let dates = getDatesBetween(startDate,endDate); //array with all itinerary dates



    /*the purpose of code above is to store the value of start and end dates that user select from the calendar in the
     home page. The values are taken by te code in the URL and stored in startDateS and endDateS (ln 1-6) in string format,
     after are converted in date format and stored  startDate and endDate (ln 8-10). So the two date values are used as
     input in getDatesBetween method that return a sorted array with that store all the dates between startDate and endDate.
     (ln 14-24) defined an initialized in dates (ln 27). */



    let attractionForm =

                '<form id = "$(dateId)"  class="attractionForm">' +
                    '<label for="hour">hour :</label>' +
                    '<input type="time" class="hour" name="hour">' +
                    '<label for="attraction"></label>'+
                    '<input type="text" class="attractionName" name="attraction" placeholder="drag an attraction and drop here!">'+
                '</form>' ;





    /*attractionForm value is a html format string used to add an empty attractionForm when the button addAttractionButton
    (ADD ATTRACTION for the user) are pressed. this form represent attraction and activity that user choose to do.*/



    let dateOptions ={ year: 'numeric', month: 'long', day: 'numeric' }; //option for the date format

    //define the itinerary div as accordion (see jqueryui doc)
    $(function () {
        $("#itineraryAccordion").accordion({
            heightStyle: "content" // dynamically adapt the height of the content
        });
    })

    let accordion = $("#itineraryAccordion");

//This for add an accordion header and content for each date in dates
    for(let i = 0; i < dates.length; i++)
    {
        let dateId =dates[i].toLocaleString('it-IT', dateOptions)

        accordion.append('<h1 class="headerDate">' + dates[i].toLocaleString('it-IT', dateOptions) + '</h1>'); //usage of dateOptions
        accordion.append('<div class="accordionContent"></div>');
    }

    let accordionContent = $(".accordionContent");
    accordionContent.append('<div class = "formsList"></div>');
    accordionContent.append('<button class ="addAttractionButton">ADD ATTRACTION</button>');



    /*this for cycle implement the creation of accordion. In jqueryUI the accordion are a div element defined with the
    method .accordion() (line 58-63) stored in the accordion value. In the accordion element we must add a header (ln 70)
    and a content (ln 71) with .append() method, we do this for each date stored in dates (initialed at ln 27 ) so we can
    add an accordion for each day that user select in the home page. After the empty accordion is created we store the
    accordion content class in accordionContent that contain the list of all attraction and activity that user can do (ln 75),
    with the class formsList, and contain the button "ADD ATTRACTION" to add attraction and activity to formsList (ln 76).*/



    let formList = $(".formsList");
    formList.append(attractionForm);




    /*append the first attraction form in to formsList*/



    // Attach a click event handler to elements with the class "addAttractionButton"
    $(".addAttractionButton").button().on('click', function() {


        // Get the parent element of the clicked button
        let addAttractionFather = $(this).parent();

        // Find an element with the class "formsList" within the parent and append the content of "attractionForm"
            $(addAttractionFather).find(".formsList").append(attractionForm);
    });



    /*this code is a handler for the "ADD ATTRACTION" button, the click event of the button search the accordion content
    father of the clicked button, find the associated formList and append the new attractionForm element */


});


