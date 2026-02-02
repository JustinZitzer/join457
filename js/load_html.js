async function loadHTML() {
  await loadIndexHTML();
}

async function loadAlternativeHTML() {
  await loadInfoIndexHTML();
}

async function loadIndexHTML() {
    try {
      const response = await fetch('index.html');
      if (!response.ok) {
        throw new Error(`Fehler beim Laden der Datei: ${response.status}`);
      }
      const html = await response.text();
      document.getElementById('index_html').innerHTML = html;
      shortName();
    } catch (error) {
      console.error(error);
    }
}

async function loadInfoIndexHTML() {
    try {
      const response = await fetch('index_legal_privacy.html');
      if (!response.ok) {
        throw new Error(`Fehler beim Laden der Datei: ${response.status}`);
      }
      const html = await response.text();
      document.getElementById('index_html').innerHTML = html;
    } catch (error) {
      console.error("index wurde nicht geladen");
    }
}

async function initInfoPages() {
  await loadHTML();
  linkBackgroundStyleInfoPages();
}

async function linkBackgroundStyleInfoPages() {
  const privacyPolicyMarker = document.getElementById('privacy-policy-marker-id');
  const legalNoticeMarker = document.getElementById('legal-notice-marker-id');
  if(window.location.pathname.includes("privacy_policy.html")) {
    privacyPolicyMarker.style.backgroundColor = "rgba(9, 25, 49, 1)";
  } else if(window.location.pathname.includes("legal_notice.html")) {
    legalNoticeMarker.style.backgroundColor = "rgba(9, 25, 49, 1)";
  }
}

function shortName() {
  const storedName = localStorage.getItem("loggedInUserName") || "";
  const trimmedName = storedName.trim();
  const cricleText = document.getElementById("user-profile-font");

  const nameParts = trimmedName.split(" ");
  let initials = "";

  for (let i = 0; i < nameParts.length && i < 2; i++) {
    if (nameParts[i]) {
      initials += nameParts[i][0].toUpperCase();
    }
  }
  cricleText.textContent = initials;
}

function reapplyStylesheets() {
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    links.forEach(link => {
        const href = link.href;
        link.href = '';
        link.href = href;
    });
}

function triggerMediaQueryReflow() {
    const spacer = document.createElement('div');
    spacer.style.cssText = 'position: absolute; width: 1px; height: 1px; overflow: hidden; top: -9999px; left: -9999px;';
    document.body.appendChild(spacer);

    spacer.style.width = '2px';
    spacer.offsetWidth;

    requestAnimationFrame(() => {
        spacer.style.width = '1px';
        spacer.offsetWidth;
        spacer.remove();
    });
}

function triggerResizeEvent() {
    const body = document.body;
    const originalWidth = body.style.width;

    body.style.width = '99.9vw';
    body.offsetWidth;

    window.dispatchEvent(new Event('resize'));

    requestAnimationFrame(() => {
        body.style.width = originalWidth || '';
    });
}

function selectedSiteBackgroundStyle() {
    const summaryMarker = document.getElementById('summary-marker-list-id');
    const boardMarker = document.getElementById('board-marker-list-id');
    const addTaskMarker = document.getElementById('add-task-marker-list-id');
    const contactsMarker = document.getElementById('contacts-marker-list-id');
    const activeColor = "rgba(9, 25, 49, 1)";
    const windowSize = window.innerWidth;

      if(window.location.pathname.includes("summary.html")) {
        summaryMarker.style.backgroundColor = activeColor;
      } else if(window.location.pathname.includes("board.html")) {
        boardMarker.style.backgroundColor = activeColor;
      } else if(window.location.pathname.includes("add_task.html")) {
        addTaskMarker.style.backgroundColor = activeColor;
      } else if(window.location.pathname.includes("contacts.html")) {
        contactsMarker.style.backgroundColor = activeColor;
      }
}