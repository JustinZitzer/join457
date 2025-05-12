const emailInput = document.getElementById('Login-Box-Email-Input');
const passwordInput = document.getElementById('Login-Box-Passwort-Input');
const FireBaseUrl = "https://console.firebase.google.com/u/1/project/join-457/database/join-457-default-rtdb/data/~2F";
const loginBodyDiv = document.getElementById('Login-Body-Div');

function initSummary () {
    getLoginGuest();
    getLogin();
}

window.onload = function () {
    const logo = document.getElementById('loading-screen-logo');
    setTimeout(() => {
      logo.classList.add('loading-screen-logo-small');
    }, 10); // Sofort beim Laden
};

function login() {
    const email = emailInput.value;
    const password = passwordInput.value;
    sessionStorage.setItem('username', email);
    if (email && password) {
        window.location.href='summary.html';
    } else {
        alert('Du dummer Hund gib jetzt ein anständiges Passwort und eine gültige Email ein');
    }
}

function getLogin () {

}

function loginGuest () {
    const guestName = 'Gast';
    sessionStorage.setItem('guestUsername', guestName);
    window.location.href='summary-guest.html'
}

function getLoginGuest () {
    const usernameGuest = sessionStorage.getItem('guestUsername');
    const summaryNameTextDiv = document.getElementById('Summary-Name-Text-Greeting');

    if (usernameGuest) {
        summaryNameTextDiv.classList.add('display-none');
    }
}