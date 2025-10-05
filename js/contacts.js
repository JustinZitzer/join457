let openedContactsSideCardOverlay = false;
let openedAddNewContactOverlay = false;
let openedEditContactsOverlay = false;
let activeCard = null;
const STORAGE_KEY = 'contactColors';
let show = false;

function openContactsSideCardOverlay(contactId) {
    const contact = allContacts.find(c => c.id === contactId);
    if (!contact) {
        console.warn(`Kontakt mit ID ${contactId} nicht gefunden.`);
        return;
    }
    const contactsRightSection = document.getElementById('contacts_right_section');
    const existingOverlay = document.getElementById('contacts_side_overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }
    contactsRightSection.innerHTML += (getContactOverlay(contact));
}

function openContactsSideCardOverlayById(contactId) {
    openContactsSideCardOverlay(contactId);
    toggleContactCardColor(contactId);
    requestAnimationFrame(flyInOverlay);
}

function handleActiveCard(contactId) {
    const contactCard = document.getElementById(`contact_card_${contactId}`);
    contactCard.classList.remove('contact-card-activated');
}

function flyInOverlay() {
    const overlay = document.getElementById('contacts_side_overlay');
    if (activeCard) {
        overlay.classList.add('active-side-overlay');
        overlay.classList.remove('hide-side-overlay');
    } else {
        removeSideOverlay();
    }
}

function removeSideOverlay() {
    const overlay = document.getElementById('contacts_side_overlay');
    if (!overlay) return;
    overlay.classList.remove('active-side-overlay');
    requestAnimationFrame(() =>
        overlay.classList.add('hide-side-overlay')
    );
}

function toggleContactCardColor(contactId) {
    const contactCard = document.getElementById(`contact_card_${contactId}`);
    if (activeCard && activeCard !== contactCard) {
        activeCard.classList.remove('contact-card-activated');
    }
    const isNowActive = contactCard.classList.toggle('contact-card-activated');
    activeCard = isNowActive ? contactCard : null;
}

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

function openEditContactOverlay(contactId) {
    const main = document.getElementById('main_contacts');
    const contact = allContacts.find(c => c.id === contactId);
    if (!contact) {
        console.warn(`Kontakt mit ID ${contactId} nicht gefunden.`);
        return;
    }
    if (!openedEditContactsOverlay) {
        main.innerHTML += getEditContactOverlay(contact);
        openedEditContactsOverlay = true;
    }
}

function removeEditContactOverlay() {
    if (openedEditContactsOverlay) {
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

function getRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 100;
    const lightness = 50;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function loadColorMap() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
}

function saveColorMap(map) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

function getColorForContact(id) {
    const map = loadColorMap();
    if (!map[id]) {
        map[id] = getRandomColor();
        saveColorMap(map);
    }
    return map[id];
}