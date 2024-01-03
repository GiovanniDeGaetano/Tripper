$(function () {
    $("#accedi-home").click(function (event){
        event.preventDefault();
        let form = document.getElementById('loginForm');
        if (!form.checkValidity()) {
            return null;
        }else{
            sendLogin();
        }
    });

    $("#registrati-home").click(function (event){
        event.preventDefault();
        let form = document.getElementById('registerForm');
        if (!form.checkValidity()) {
            return null;
        }else{
            sendRegister();
        }
    });
});

function sendLogin(){
    let email = $("#emailIn").val();
    let password=$("#passwordIn").val();
    let userLogin = {
        email:email,
        password:password
    }
    $.post({
        url: "/login",
        contentType: "application/json",
        data: JSON.stringify(userLogin),
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            let isModalLogin = window.location !== window.parent.location;
            if (isModalLogin) {
                // Chiudi la finestra modale
                window.parent.postMessage('closeModal', '*');
            } else {
                 // Reindirizza all'index solo se non è una finestra modale
                 window.location.href = "/home";
             }
        },
        error: function (error) {
            $("#loginError").text(error.responseJSON.error);
        }
    });
}
function sendRegister(){
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
        url: "/register",
        contentType: "application/json",
        data: JSON.stringify(regUser),
        success: function (data) {
            window.location.href = '/loginPage'
        },
        error: function (error) {
            $("#registerError").text(error.responseJSON.error);
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