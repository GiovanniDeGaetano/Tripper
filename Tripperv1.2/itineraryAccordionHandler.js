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
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    }


    let dates = getDatesBetween(startDate,endDate); //array with all itinerary dates
    let dateOptions ={ year: 'numeric', month: 'long', day: 'numeric' }; //option for the date format

    //This for add an accordion header and content for each date in dates
    for(let i = 0; i < dates.length; i++)
    {
        //define the itinerary div as accordion (see jqueryui doc)
        $(function () {
            $("#itineraryAccordion").accordion();
        })

        //add header and content accordion
        let accordion = $("#itineraryAccordion");
        accordion.append('<h1 class="headerDate">' + dates[i].toLocaleString('it-IT', dateOptions) + '</h1>'); //usage of dateOptions
        accordion.append('<div class="contentDate">viaggia</div>');

    }


});


