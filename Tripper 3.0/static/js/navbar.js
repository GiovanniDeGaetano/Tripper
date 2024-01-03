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
            success: function () {
                loginButton.text("Logout");
                loginButton.click(function () {
                    $.ajax({
                        type: "GET",
                        url: "/logout",
                        xhrFields: {
                            withCredentials: true
                        },
                        success: function (){
                            window.location.href = "/home";
                        }
                    });
                });
                navbar.append(itineraryButton);
                navbar.append(loginButton);
                $("#itineraryButton").click(function (){
                    window.location.href = "/myItinerary";
                });
            },
            error: function () {
                loginButton.text("Login");
                loginButton.click(function () {
                    window.location.href = "/loginPage";
                });
                navbar.append(loginButton);
            }
    });
}