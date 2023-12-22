// noinspection JSVoidFunctionReturnValueUsed

$(function () {
    createCalendar();

    const accordion = $("#myItinerary");
    $.post({
        url: "/api/getMyItinerary",
        contentType: "application/json",
        xhrFields: {
            withCredentials: true
        },
        success: function (myItinerary) {
            //Ho aggiunto myItinerary[0].itinerary.length, perchè nel caso una persona ha degli itinerari ma vengono cancellati tutti
            //myItinerary.length era uguale a 1 e quindi entrava nell'if mentre doveva mostrate la scritta = "Inizia a creare i tuoi itinerari!"
            if (myItinerary.length  && myItinerary[0].itinerary.length) {
                myItinerary[0].itinerary.forEach(function (destination){
                    accordion.append('<h1 class="headerDate">'+ destination.destination+'<button class="remove-accordion"> X </button></h1>');
                    let randomString = generateRandomString(14);
                    accordion.append('<div id = "'+ randomString +'" class="accordionContent"></div>');

                    const dates = Object.keys(destination).filter(date => date !== "destination");
                    let startDate = dates[0];
                    let endDate = dates[dates.length - 1];
                    for(const date in destination){
                        if(date !== "destination"){
                            $("#"+randomString).append('<strong>'+ date.replace(/_/g, ' ') +' : </strong><br>');

                            destination[date].forEach(function (event) {
                                if(typeof event.event === 'object'){
                                    let htmlString = `
                                        <h2 class="info">${event.event.title}</h2>
                                        <strong>Hour:</strong>${event.hour}`;
                                        if (event.event.website !== undefined){
                                        htmlString += `<a class="info" href="${event.event.website}" target="_blank" data-website="${event.event.website}">Website</a>`;
                                        }
                                        htmlString += `<a class="info where" data-lat="${event.event.coordinates.lat}" data-lon="${event.event.coordinates.lon}">where I am ?</a><br>`;

                                    $("#" + randomString).append(htmlString);
                                }else {
                                    $("#" + randomString).append("<strong>Hour:</strong>" + event.hour + "<strong>Event:</strong> " + event.event + "<br>");
                                }
                            });
                        }
                    }
                    startDate = new Date(parseDate(startDate)+ 'T00:00:00');
                    endDate = new Date(parseDate(endDate)+ 'T00:00:00');
                    endDate.setDate(endDate.getDate() + 1);
                    calendar.addEvent({//Aggiunge un evento da "dateStart" fino a dateEnd - 1
                        id: randomString,
                        title: 'Viaggio a ' + destination.destination,
                        start: startDate,
                        end: endDate,
                        allDay: true,
                        display: 'background',
                        backgroundColor: 'red',
                        //color: '#000000',
                        borderColor:'#000000'
                    });
                });
                 $(".remove-accordion").on("click", function () {
      // Find the index of the section to be removed
        let parent = $(this).parent();
        console.log(parent)
      // Remove the header and content of the section
      accordion.accordion("option", "active", false).find(parent).next().remove();
      $(this).parent().remove();

      // Refresh the accordion
      accordion.accordion("refresh");
    });
                $("#myItinerary").accordion({
                    heightStyle: "content" // dynamically adapt the height of the content
                });
            }
            else {
                accordion.append('<p> Inizia a creare i tuoi itinerari!</p>');
            }
        },
        error: function (error) {
            console.error(error);
        }
    });
});
let calendar;

function createCalendar(){
    let calendarEl =  document.getElementById('eventCalendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
        //navLinks: true,
        initialView: 'dayGridMonth',
        //timeZone: 'UTC',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: ''
        },
        /*  RENDE SELEZIONABILI I GIORNI DEL CALENDARIO
        selectable: true,
        dateClick: function(info) {
            alert('clicked ' + info.dateStr);
        },
        select: function(info) {
            alert('selected ' + info.startStr + ' to ' + info.endStr);
        }*/
    });
    //calendar.setOption('aspectRatio', 2);
    calendar.render();
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

function parseDate(date) {
    // Mapping dei mesi in italiano a numeri di mese
    const monthMap = {
        gennaio: 1,
        febbraio: 2,
        marzo: 3,
        aprile: 4,
        maggio: 5,
        giugno: 6,
        luglio: 7,
        agosto: 8,
        settembre: 9,
        ottobre: 10,
        novembre: 11,
        dicembre: 12
    };

    // Separare giorno, mese e anno dalla stringa italiana
    const [day, monthStr, year] = date.split('_');

    // Ottenere il numero del mese dalla mappa
    const month = monthMap[monthStr.toLowerCase()];

    // Formattare la data in formato "YYYY-MM-DD"
    return `${year}-${month.toString().padStart(2, '0')}-${day.padStart(2, '0')}`;
}