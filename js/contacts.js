let openedContactsSideCardOverlay = false;
let openedAddNewContactOverlay = false;
let openedEditContactsOverlay = false;
let activeCard = null;
const STORAGE_KEY = 'contactColors';
let show = false;
let resizeTimeout;

window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(showContactsCardOverlayMobile, 10);
});

async function initContact() {
    await loadHTML();
    await loadContacts();
    selectedSiteBackgroundStyle();
}

function openContactsSideCardOverlay(contactId) {
    const contact = allContacts.find(c => c.id === contactId);
    if (!contact) {
        console.warn(`Kontakt mit ID ${contactId} nicht gefunden.`);
        return;
    }
    const contactsRightSection = document.getElementById('contacts_right_section');
    const existingOverlay = document.getElementById('contacts_side_overlay');
    const dropdownEditDelete = document.getElementById('delete-edit-dropdown-contacts');
    const backIcon = document.getElementById('close-side-contact-arrow-icon');
    if (existingOverlay) {
        existingOverlay.remove();
        dropdownEditDelete.remove();
        backIcon.remove();
    }
    contactsRightSection.innerHTML += (getContactOverlay(contact));
}

function openContactsSideCardOverlayById(contactId) {
    openContactsSideCardOverlay(contactId);
    removeActivatedContactCard();
    toggleContactCardColor(contactId);


    requestAnimationFrame(() => {
        const overlay = document.getElementById('contacts_side_overlay');
        overlay?.classList.add('active-side-overlay');
        flyInOverlay();
        showContactsCardOverlayMobile();
        showThreeDotsMenu();
    });
}

function showContactsCardOverlayMobile() {
    const contactOverlayActive = document.getElementById('contacts_side_overlay');
    const contactsRightSection = document.getElementById('contacts_right_section');
    const contactsLeftSection = document.getElementById('contacts-sidebar-container');
    const displayResolution = window.innerWidth;

    if (!contactOverlayActive) return;
    const isActive = contactOverlayActive.classList.contains('active-side-overlay');

    ifElseRuleCardMobile(displayResolution, isActive, contactsRightSection, contactsLeftSection);
}

function ifElseRuleCardMobile(displayResolution, isActive, contactsRightSection, contactsLeftSection) {
    if (displayResolution < 1023) {
        if (isActive) {
            contactsRightSection.style.display = 'flex';
            contactsLeftSection.style.display = 'none';
        } else {
            contactsRightSection.style.display = 'none';
            contactsLeftSection.style.display = 'block';
        }
    } else {
        contactsRightSection.style.display = 'flex';
        contactsLeftSection.style.display = 'block';
    }
}

function closeContactsSideCardOverlay(contactId) {
    const contactsRightSection = document.getElementById('contacts_right_section');
    const contactsLeftSection = document.getElementById('contacts-sidebar-container');
    const addContactButton = document.getElementById('add-new-contact-btn-mobile-version');
    const threeDotsMenu = document.getElementById('edit-delete-contact-button');

    document.getElementById('contacts_side_overlay')?.remove();
    document.getElementById('delete-edit-dropdown-contacts')?.remove();
    document.getElementById('close-side-contact-arrow-icon')?.remove();

    contactsLeftSection.style.display = 'block';
    contactsRightSection.style.display = 'none';
    addContactButton.style.display = 'block';
    threeDotsMenu.style.display = 'none';
}

function showThreeDotsMenu() {
    const addContactButton = document.getElementById('add-new-contact-btn-mobile-version');
    const threeDotsMenu = document.getElementById('edit-delete-contact-button');
    const contactOverlayActive = document.getElementById('contacts_side_overlay');

    if (!contactOverlayActive.classList.contains('active')) {
        addContactButton.style.display = 'none';
        threeDotsMenu.style.display = 'block';
    }
}

function showEditContactDropsdownMobile() {
    const dropdown = document.getElementById("delete-edit-dropdown-contacts");
    if (dropdown.classList.contains("display-none")) {
        dropdown.classList.remove("display-none");
    }
}

function closeEditContactDropsdownMobile() {
    const dropdown = document.getElementById("delete-edit-dropdown-contacts");
    if (dropdown && !dropdown.classList.contains("display-none")) {
        dropdown.classList.add("display-none");
    }
}

function handleActiveCard(contactId) {
    const contactCard = document.getElementById(`contact_card_${contactId}`);
    contactCard.classList.remove('contact-card-activated');
}

function removeActivatedContactCard() {
    const activatedCard = document.querySelector(".contact-card-activated");

    if (activatedCard) {
        activatedCard.classList.remove("contact-card-activated");
    }
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
    toggleBgColorContactOverlay();
}

function openEditContactOverlay(contactId) {
    const main = document.getElementById('main_contacts');
    const contact = allContacts.find(c => c.id === contactId);
    if (!contact) return;

    let overlay = document.getElementById('edit_contact_overlay');

    if (!overlay) {
        main.insertAdjacentHTML('beforeend', getEditContactOverlay(contact));
        overlay = document.getElementById('edit_contact_overlay');
    }

    overlay.classList.add('active');
}


function removeEditContactOverlay() {
    if (openedEditContactsOverlay) {
        const editContactOverlay = document.getElementById('bg_contact_overlay');
        editContactOverlay.remove();
        openedEditContactsOverlay = false;
    }
    toggleBgColorContactOverlay();
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

function handleCreatedContactOverlay() {
    const container = document.getElementById('main_contacts');

    container.insertAdjacentHTML('beforeend', getCreatedContactOverlay());

    const overlay = container.querySelector('.bg-contact-overlay');

    setTimeout(() => {
        overlay.remove();

    }, 800);

}

function handleEditedContactOverlay() {
    const container = document.getElementById('main_contacts');

    container.insertAdjacentHTML('beforeend', getEditedContactOverlay());

    const overlay = container.querySelector('.bg-contact-overlay');

    setTimeout(() => {
        overlay.remove();

    }, 800);

}

function toggleBgColorContactOverlay() {
    const bgContactOverlay = document.getElementById('bg_contact_overlay');
    bgContactOverlay.remove();
}