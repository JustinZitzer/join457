window.onload = function () {
    const logo = document.getElementById('loading-screen-logo');
    setTimeout(() => {
      logo.classList.add('loading-screen-logo-small');
    }, 100); // Sofort beim Laden
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
  };