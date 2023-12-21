$(function () {
    /*$("#accedi-home").click(function (){
        let form = document.getElementById('loginForm');
        if (!form.checkValidity()) {
            return null;
        }else{
            sendLogin();
        }
    });*/

    $("#registrati-home").click(function (){
        let form = document.getElementById('loginForm');
        if (!form.checkValidity()) {
            return null;
        }else{
            sendRegister();
        }
    });
});

function sendLogin(){
    let url = "/login";
    let email = $("#emailIn").val();
    let password=$("#passwordIn").val();
    let userLogin = {
        email:email,
        password:password
    }
    $.post({
        url: url,
        contentType: "application/json",
        data: JSON.stringify(userLogin),
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            console.log(data);
        },
        error: function (error) {
            $("#error").text(error.responseJSON.error);
        }
    });
}
function sendRegister(){
    let url = "http://127.0.0.1:5000/register";
    let email = $("#emailReg").val();
    let password=$("#passwordReg").val();
    let name = $("#nameReg").val();
    let surname = $("#surnameReg").val();
    let regUser = {
        email:email,
        password:password,
        name:name,
        surname:surname
    }
    $.post({
        url: url,
        contentType: "application/json",
        data: JSON.stringify(regUser),
        success: function (data) {
            console.log(data);
        },
        error: function (error) {
            console.error(error);
        }
    });
}
function showRegistrationForm(id) {
    let loginContainer = document.getElementById('login-container');
    let registrationContainer = document.getElementById('registration-container');

    // Nascondi il modulo di accesso e mostra il modulo di registrazione
    if(id === 1){
        loginContainer.style.display = 'none';
        registrationContainer.style.display = 'block';
    }else{
        loginContainer.style.display = 'block';
        registrationContainer.style.display = 'none';
    }
}