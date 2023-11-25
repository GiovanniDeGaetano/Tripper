$(function() {
    $("#itinerary").click(function (){
       $(this).hide();
        document.createElement('input');
       //newButton();
    });
    const storedDates = localStorage.getItem('selectedDates');
    if (storedDates) {
        const {startDate, endDate} = JSON.parse(storedDates);
        //alert("ciao " + startDate + " " + endDate);
    }
});

function newButton(){
    let newButton =[];
    newButton[0] = document.createElement('button');
    newButton[0].textContent = 'Eventi';
    newButton[1] = document.createElement('button');
    newButton[1].textContent = 'Monumenti';
    newButton[2] = document.createElement('button');
    newButton[2].textContent = 'Ristoranti';
    let br = document.createElement('br');
    const div = document.getElementsByClassName('button-container')[0];
    div.appendChild(newButton[0]);
    div.appendChild(newButton[1]);
    div.appendChild(br);
    div.appendChild(newButton[2]);
}