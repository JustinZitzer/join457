let openedContactsSideCardOverlay = false;
let openedAddNewContactOverlay = false;
let openedEditContactsOverlay = false;
let toggledCard = false;

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
    },10)
}

function flyInOverlay() {
    const overlay = document.getElementById('contacts_side_overlay');
    overlay.classList.toggle("active-side-overlay")
}

function toggleContactCardColor(contactId) {
    const contactCard = document.getElementById(`contact_card_${contactId}`);
    contactCard.classList.toggle('contact-card-activated');
}


/*funktionen der card ergänzen*/

function openAddNewContactOverlay() {
    const main = document.getElementById('main_contacts');
    if (!openedAddNewContactOverlay) {
        main.innerHTML += getAddContactOverlay();
        openedAddNewContactOverlay = true;
    }
}
function removeAddNewContactOverlay() {
    const overlay = document.getElementById('add_contact_overlay');
    if (overlay) {
        overlay.remove();
        openedAddNewContactOverlay = false;
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
