const emailInput = document.getElementById('Login-Box-Email-Input');
const passwordInput = document.getElementById('Login-Box-Passwort-Input');
const FireBaseUrl = "https://console.firebase.google.com/u/1/project/join-457/database/join-457-default-rtdb/data/~2F";
const bigLogoLogin = document.getElementById('Loading-Screen-Logo-Big');
const smallLogoLogin = document.getElementById('Loading-Screen-Logo-Mini');

function initSummary () {
    getLoginGuest();
    getLogin();
}

window.addEventListener('load', () => {
  // Positionen und Größen abfragen
  const bigRect   = bigLogoLogin.getBoundingClientRect();
  const smallRect = smallLogoLogin.getBoundingClientRect();

  // Deltas für die Verschiebung
  const dx = smallRect.left - bigRect.left;
  const dy = smallRect.top  - bigRect.top;

  // Skalierungsfaktor berechnen
  const scale = smallRect.width / bigRect.width;

  // Animation im nächsten Frame starten
  requestAnimationFrame(() => {
    bigLogoLogin.style.transform = `
      translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))
      scale(${scale})
    `;
  });
});

function login() {
    const email = emailInput.value;
    const password = passwordInput.value;
    sessionStorage.setItem('username', email);
    if (email && password) {
        window.location.href='summary.html';
    } else {
        alert('Please enter a valid email and password.');
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