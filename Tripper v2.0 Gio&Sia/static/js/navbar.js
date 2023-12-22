$(function () {
    checkSession();
});

function checkSession(){
    let navbar = $(".navbar");
    let loginButton = $('<button class="action-button" id="loginButton"></button>');
    let itineraryButton = $('<button class="action-button" id="itineraryButton">My Itineraries</button>');
    $.ajax({
            type: "GET",
            url: "/protected",
            xhrFields: {
                withCredentials: true
            },
            success: function (response) {
                loginButton.text("Logout");
                loginButton.click(function () {
                    $.ajax({
                        type: "GET",
                        url: "/logout",
                        xhrFields: {
                            withCredentials: true
                        },
                        success: function (response){
                            window.location.href = "/home";
                        },
                        error: function (error) {
                            console.error(error);
                        }
                    });
                });
                navbar.append(itineraryButton);
                $("#itineraryButton").click(function (){
                    window.location.href = "/myItinerary";
                });
            },
            error: function (error) {
                loginButton.text("Login");
                loginButton.click(function () {
                    window.location.href = "/loginPage";
                });
            }
    });
    navbar.append(loginButton);
}