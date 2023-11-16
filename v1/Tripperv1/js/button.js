$(function() {
    $("#itinerary").click(function (){
       $(this).hide();
       newButton();
    });
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