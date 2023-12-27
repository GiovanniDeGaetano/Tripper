$(function () {
    checkSession();
    $("#itineraryButton").click(function (){
       window.location.href = "/myItinerary";
    });
});

function checkSession(){
    let button = $("#loginButton");
    $.ajax({
            type: "GET",
            url: "/protected",
            xhrFields: {
                withCredentials: true
            },
            success: function (response) {
                button.text("Logout");
                button.click(function () {
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

                console.log(response.message); //email
            },
            error: function (error) {
                button.text("Login");
                button.click(function () {
                    window.location.href = "/loginPage";
                });
                console.error(error);
            }
        });
}