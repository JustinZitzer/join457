const emailInput = document.getElementById('Login-Box-Email-Input');
const passwordInput = document.getElementById('Login-Box-Passwort-Input');

function initSummary () {
    getLoginGuest();
    getLogin();
}

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
    let summaryNameTextDiv = document.getElementById('Summary-Name-Text-Greeting');
    const username = sessionStorage.getItem('username');
    const name = username.split('@')[0];
    const dotIndex = name.indexOf('.');
    const first = name.substring(0, dotIndex);
    const last  = name.substring(dotIndex + 1);
    const lastNameFirstLetter = dotIndex + 1;
    const firstName = first.charAt(0).toUpperCase() + first.slice(1);
    const lastName = last.charAt(0).toUpperCase() + last.slice(1);
    const fullName = lastName;
    if (username) {
        summaryNameTextDiv.innerHTML = `${fullName}`;
    }
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