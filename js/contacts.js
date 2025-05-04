let openedContactsSideCardOverlay = false;
let openedAddNewContactOverlay = false;
let openedEditContactsOverlay = false;

function openContactsSideCardOverlay() {
    const contactsRightSection = document.getElementById('contacts_right_section')
    if (!openedContactsSideCardOverlay) {
        contactsRightSection.innerHTML += getContactOverlay();
        openedContactsSideCardOverlay = true;
    }
}

/*funktionen der card ergänzen*/

function openAddNewContactOverlay() {
    const main = document.getElementById('main_contacts');
    if (!openedAddNewContactOverlay) {
        main.innerHTML += getAddContactOverlay();
    }
}

function removeAddNewContactOverlay() {
    if (!openedAddNewContactOverlay) {
        const addContactOverlay = document.getElementById('add_contact_overlay');
        addContactOverlay.remove();
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