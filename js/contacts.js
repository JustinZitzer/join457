let openedContactsSideCardOverlay = false;
let openedAddNewContactOverlay = false;
let openedEditContactsOverlay = false;
let activeCard = null;

function openContactsSideCardOverlay(contactId) {
    const contact = allContacts[contactId];


    if (!contact) {
        console.warn(`Kontakt mit ID ${contactId} nicht gefunden.`);
        return;
    }
    const contactsRightSection = document.getElementById('contacts_right_section');
    const existingOverlay = document.getElementById('contacts_side_overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }
    contactsRightSection.innerHTML += getContactOverlay(contactId, contact);
}

function openContactsSideCardOverlayById(contactId) {
    const firstKey = Object.keys(allContacts)[contactId];
    const firstContact = allContacts[firstKey]
    const contactsRightSection = document.getElementById('contacts_right_section');
    const contactsSideOverlay = document.getElementById('contacts_side_overlay');
    if (contactsSideOverlay) {
        contactsSideOverlay.remove();
    }
    contactsRightSection.innerHTML += getContactOverlay(firstContact);
    setTimeout(() => {
        flyInOverlay();
    }, 10)
    toggleContactCardColor(contactId);
}

function flyInOverlay() {
    const overlay = document.getElementById('contacts_side_overlay');
    overlay.classList.toggle("active-side-overlay")
}


function toggleContactCardColor(contactId) {
  const contactCard = document.getElementById(`contact_card_${contactId}`);
  if (activeCard && activeCard !== contactCard) {
    activeCard.classList.remove('contact-card-activated');
  }
  const isNowActive = contactCard.classList.toggle('contact-card-activated');
  activeCard = isNowActive ? contactCard : null;
}


/*funktionen der card ergänzen*/

function openAddNewContactOverlay() {
    const main = document.getElementById('main_contacts');
    const containerGreyBackground = document.getElementById('contacts-sidebar-container');
    const addContactButton = document.getElementById('add-new-contact-btn-mobile-version');
    if (!openedAddNewContactOverlay) {
        main.innerHTML += getAddContactOverlay();
        openedAddNewContactOverlay = true;
        containerGreyBackground.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        addContactButton.style.display = 'none';
    }
}
function removeAddNewContactOverlay() {
    const overlay = document.getElementById('add_contact_overlay');
    const addContactButton = document.getElementById('add-new-contact-btn-mobile-version');
    if (overlay) {
        overlay.remove();
        openedAddNewContactOverlay = false;
        addContactButton.style.display = 'block';
    }
}

function openEditContactOverlay() {
    const main = document.getElementById('main_contacts');
    if (!openedEditContactsOverlay) {
        main.innerHTML += getEditContactOverlay();
    }
}

function removeEditContactOverlay() {
    if (!openedEditContactsOverlay) {
        const editContactOverlay = document.getElementById('edit_contact_overlay');
        editContactOverlay.remove();
        openedEditContactsOverlay = false;
    }
}

function handleContactClick(contact) {
    openContactsSideCardOverlay(contact);
    toggleContactCardColor(contact);
}

function getContactById(contactId) {
    return allContacts[contactId];
}
