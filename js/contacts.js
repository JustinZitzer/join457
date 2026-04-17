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

/** Initializes the contacts page and loads all required data. */
async function initContact() {
    await loadHTML();
    await loadContacts();
    selectedSiteBackgroundStyle();
}

/** Opens the contact side overlay for a given contact ID. 
 *@param {string|number} contactId - ID of the contact to display.
*/
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

/** Opens the contact overlay by ID and triggers animations and UI updates. 
 *@param {string|number} contactId - ID of the contact to display.
*/
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

/** Handles responsive behavior for the contact overlay on mobile devices. */
function showContactsCardOverlayMobile() {
    const contactOverlayActive = document.getElementById('contacts_side_overlay');
    const contactsRightSection = document.getElementById('contacts_right_section');
    const contactsLeftSection = document.getElementById('contacts-sidebar-container');
    const displayResolution = window.innerWidth;

    if (!contactOverlayActive) return;
    const isActive = contactOverlayActive.classList.contains('active-side-overlay');

    ifElseRuleCardMobile(displayResolution, isActive, contactsRightSection, contactsLeftSection);
}

/** Applies mobile or desktop layout rules for the contact overlay. 
 * @param {number} displayResolution - Current viewport width.
 * @param {boolean} isActive - Whether the contact overlay is active/open.
 * @param {HTMLElement} contactsRightSection - Right panel element.
 * @param {HTMLElement} contactsLeftSection - Left panel element.
*/
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

/** Closes the contact side overlay and restores default layout. 
 *@param {string|number} contactId - ID of the contact (currently unused in function).
*/
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

/** Shows the mobile menu with edit and delete options. */
function showThreeDotsMenu() {
    const addContactButton = document.getElementById('add-new-contact-btn-mobile-version');
    const threeDotsMenu = document.getElementById('edit-delete-contact-button');
    const contactOverlayActive = document.getElementById('contacts_side_overlay');

    if (!contactOverlayActive.classList.contains('active')) {
        addContactButton.style.display = 'none';
        threeDotsMenu.style.display = 'block';
    }
}

/** Opens the edit/delete dropdown menu on mobile. */
function showEditContactDropsdownMobile() {
    const dropdown = document.getElementById("delete-edit-dropdown-contacts");
    if (dropdown.classList.contains("display-none")) {
        dropdown.classList.remove("display-none");
    }
}

/** Closes the edit/delete dropdown menu on mobile. */
function closeEditContactDropsdownMobile() {
    const dropdown = document.getElementById("delete-edit-dropdown-contacts");
    if (dropdown && !dropdown.classList.contains("display-none")) {
        dropdown.classList.add("display-none");
    }
}

/** Removes the active styling from a specific contact card. 
 * @param {string|number} contactId - ID of the contact whose card should be deactivated.
*/
function handleActiveCard(contactId) {
    const contactCard = document.getElementById(`contact_card_${contactId}`);
    contactCard.classList.remove('contact-card-activated');
}

/** Removes the active styling from any currently active contact card. */
function removeActivatedContactCard() {
    const activatedCard = document.querySelector(".contact-card-activated");
    if (activatedCard) {
        activatedCard.classList.remove("contact-card-activated");
    }
}

/** Triggers the fly-in animation for the contact overlay. */
function flyInOverlay() {
    const overlay = document.getElementById('contacts_side_overlay');
    if (activeCard) {
        overlay.classList.add('active-side-overlay');
        overlay.classList.remove('hide-side-overlay');
    } else {
        removeSideOverlay();
    }
}

/** Hides the contact overlay with an animation. */
function removeSideOverlay() {
    const overlay = document.getElementById('contacts_side_overlay');
    if (!overlay) return;
    overlay.classList.remove('active-side-overlay');
    requestAnimationFrame(() =>
        overlay.classList.add('hide-side-overlay')
    );
}

/** Toggles the active styling of a contact card. 
 *@param {string|number} contactId - ID of the contact card to toggle.
*/
function toggleContactCardColor(contactId) {
    const contactCard = document.getElementById(`contact_card_${contactId}`);
    if (activeCard && activeCard !== contactCard) {
        activeCard.classList.remove('contact-card-activated');
    }
    const isNowActive = contactCard.classList.toggle('contact-card-activated');
    activeCard = isNowActive ? contactCard : null;
}

/** Opens the overlay for adding a new contact. */
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

/** Removes the add contact overlay and resets UI state. */
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

/** Opens the edit contact overlay for a given contact. 
 * @param {string|number} contactId - ID of the contact to edit.
*/
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

/** Removes the edit contact overlay and resets UI state. */
function removeEditContactOverlay() {
    if (openedEditContactsOverlay) {
        const editContactOverlay = document.getElementById('bg_contact_overlay');
        editContactOverlay.remove();
        openedEditContactsOverlay = false;
    }
    toggleBgColorContactOverlay();
}

/** Handles click events on a contact card. 
 *@param {string|number} contactId - ID of the selected contact.
*/
function handleContactClick(contact) {
    openContactsSideCardOverlay(contact);
    toggleContactCardColor(contact);
}

/** Returns a contact object by its ID.
 * @param {string|number} contactId - ID of the contact.
 */
function getContactById(contactId) {
    return allContacts[contactId];
}

/** Generates a random HSL color string. */
function getRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 50%)`;
}

/** Loads the stored color mapping from localStorage. */
function loadColorMap() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
}

/** Saves the color mapping to localStorage. 
 * @param {Object} map - Object mapping contact IDs to color values.
*/
function saveColorMap(map) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

/** Returns a consistent color for a contact based on its ID. 
 *  @param {string|number} id - Contact ID.
 * @returns {string} Assigned color value.
*/
function getColorForContact(id) {
    const map = loadColorMap();
    if (!map[id]) {
        map[id] = getRandomColor();
        saveColorMap(map);
    }
    return map[id];
}

/** Shows a temporary overlay indicating a contact was created. */
function handleCreatedContactOverlay() {
    const container = document.getElementById('main_contacts');
    container.insertAdjacentHTML('beforeend', getCreatedContactOverlay());
    const overlay = container.querySelector('.bg-contact-overlay');
    setTimeout(() => overlay.remove(), 800);
}

/** Shows a temporary overlay indicating a contact was edited. */
function handleEditedContactOverlay() {
    const container = document.getElementById('main_contacts');
    container.insertAdjacentHTML('beforeend', getEditedContactOverlay());
    const overlay = container.querySelector('.bg-contact-overlay');
    setTimeout(() => overlay.remove(), 800);
}

/** Removes the background overlay color effect. */
function toggleBgColorContactOverlay() {
    const bgContactOverlay = document.getElementById('bg_contact_overlay');
    bgContactOverlay.remove();
}

/** Handles saving an edited contact after validation. 
 * @param {Event} event - Form submit event.
 * @param {string|number} key - Identifier of the contact being edited.
*/
async function saveEditedContact(event, key) {
  event.preventDefault();
  const { name, email, phone } = getEditedContactInputs();
  if (!validateContactInputs(name, email, phone)) return;

  const updatedContact = buildUpdatedContact(name, email, phone, key);
  await commitContactChanges(updatedContact, key);
}

/** Clears all contact-related error messages from the UI. */
function clearContactErrors() {
  const failMessage = document.querySelector('.failure-message-add-contact');
  const failMessageName = document.querySelector('.failure-message-add-contact-name');
  const failMessageEmail = document.querySelector('.failure-message-add-contact-email');
  const failMessagePhone = document.querySelector('.failure-message-add-contact-phonenumber');

  failMessage.classList.add('display-none');
  failMessageName.classList.add('display-none');
  failMessageEmail.classList.add('display-none');
  failMessagePhone.classList.add('display-none');
}

/** Resets the border styling of all contact input fields. */
function clearContactBorder() {
  const failMessageName = document.getElementById('add-contact-name-input');
  const failMessageEmail = document.getElementById('add-contact-email-input');
  const failMessagePhone = document.getElementById('add-contact-phone-input');

  failMessageName.style.borderColor = '';
  failMessageEmail.style.borderColor = '';
  failMessagePhone.style.borderColor = '';
}

/** Retrieves and returns trimmed input values from the edit contact form. */
function getEditedContactInputs() {
  return {
    name: document.querySelector('#edit_contact_overlay .add-contact-name-input').value.trim(),
    email: document.querySelector('#edit_contact_overlay .add-contact-email-input').value.trim(),
    phone: document.querySelector('#edit_contact_overlay .add-contact-phone-input').value.trim(),
  };
}

/** Builds an updated contact object based on edited values. 
 *  * @param {string} name - Full edited name string.
 * @param {string} email - Updated email address.
 * @param {string} phone - Updated phone number.
 * @param {string|number} key - Contact identifier.
 * @returns {Object} Updated contact object.
*/
function buildUpdatedContact(name, email, phone, key) {
  const parts = name.split(" ");
  const original = allContacts.find(c => c.key === key);
  if (!original) throw new Error("Kontakt nicht gefunden");
  return {
    ...original,
    firstName: parts[0],
    lastName: parts.slice(1).join(" ") || " ",
    email,
    phoneNumber: phone,
  };
}

/** Commits updated contact data to the database and refreshes the UI. 
 * @param {Object} contact - Updated contact object.
 * @param {string|number} key - Contact identifier.
*/
async function commitContactChanges(contact, key) {
  try {
    await updateData(`contacts/${key}`, contact);
    removeEditContactOverlay();
    await loadContacts();
    openContactsSideCardOverlayById(contact.id);
    handleEditedContactOverlay();
  } catch (error) {
    console.error("Fehler beim Speichern:", error);
    alert("Fehler beim Speichern. Bitte versuche es erneut.");
  }
}