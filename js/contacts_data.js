let allContacts = [];

/**
 * Fetches contact data from storage
 * @async
 * @returns {Promise<Object>} The contacts data or an empty object if no data is found or an error occurs
 */
async function fetchContacts() {
  try {
    const data = await loadData('contacts');
    return data || {};
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return {};
  }
}

/**
 * Loads contacts and renders them into the contact list container
 * @async
 * @returns {Promise<void>}
 */
async function loadContacts() {
  const container = document.getElementById('contact_list');
  container.innerHTML = '';

  try {
    const contacts = await getSortedContacts();
    if (!contacts) return container.innerHTML = '<p>Keine Kontakte gefunden.</p>';

    allContacts = contacts;
    renderContactsList(container, contacts);
  } catch (error) {
    console.error("Error loading contacts:", error);
    container.innerHTML = '<p>Fehler beim Laden der Kontakte.</p>';
  }
}

/**
 * Fetches contacts, converts them into an array and sorts them by first name
 * @async
 * @returns {Promise<Array<Object>|null>} Sorted contacts array or null if no contacts are found
 */
async function getSortedContacts() {
  const contactsUnsorted = await fetchContacts();
  if (!contactsUnsorted) return null;

  const contacts = Object.entries(contactsUnsorted).map(([key, value]) => ({
    ...value,
    key,
  }));

  return contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
}

/**
 * Renders the contact list into the given container, grouped by first letter
 * @param {HTMLElement} container - The HTML element where the contacts will be rendered
 * @param {Array<Object>} contacts - The list of contact objects to render
 */
function renderContactsList(container, contacts) {
  let lastLetter = "";

  for (const contact of contacts) {
    const currentLetter = contact.firstName[0].toUpperCase();

    if (currentLetter !== lastLetter) {
      container.innerHTML += getLetterGroup(currentLetter);
      lastLetter = currentLetter;
    }

    container.innerHTML += getContactCard(contact);
  }
}

/**
 * Renders a single contact into the contact list container
 * @async
 * @param {Object} contacts - The contact object to render
 * @returns {Promise<void>}
 */
async function renderContacts(contacts) {
  const container = document.getElementById('contact_list');
  container.innerHTML += getContactCard(contacts);
}

/**
 * Deletes a contact by key and updates the contact list
 * @async
 * @param {string} key - The unique key of the contact to delete
 * @returns {Promise<void>}
 */
async function deleteContact(key) {
  try {
    closeContactsSideCardOverlay();
    await deleteData('contacts', key);
    loadContacts();
    removeSideOverlay();
    activeCard = null;
  } catch (error) {
    console.error("Error deleting contacts:", error);
  }
}

/**
 * Creates a new contact after validating input and checking for duplicates
 * @async
 * @param {Event} event - The submit event from the form
 * @returns {Promise<void>}
 */
async function createNewContact(event) {
  const failMessage = document.getElementById('failure-message-add-contact');
  event.preventDefault();
  resetAddContactErrors();

  const { name, email, phone } = getNewContactInputs();
  if (!validateContactInputs(name, email, phone)) return;
  if (allContacts.some(c => c.email.toLowerCase() === email.toLowerCase())) {
    failMessage.classList.remove('display-none');
    failMessage.innerHTML = 'A contact with this email already exists.';
    return;
  }
  await saveContactToDatabase(buildNewContact(name, email, phone));
  handleCreatedContactOverlay();
}

/**
 * Retrieves input values for a new contact from the form
 * @returns {Object} An object containing name, email, and phone
 */
function getNewContactInputs() {
  return {
    name: document.querySelector('.add-contact-name-input').value.trim(),
    email: document.querySelector('.add-contact-email-input').value.trim(),
    phone: document.querySelector('.add-contact-phone-input').value.trim(),
  };
}

/**
 * Validates name, email, and phone inputs for a new contact
 * @param {string} name - The contact's name
 * @param {string} email - The contact's email
 * @param {string} phone - The contact's phone number
 * @returns {boolean} True if all inputs are valid, false otherwise
 */
function validateContactInputs(name, email, phone) {
  resetAddContactErrors();

  const nameIsValid = validateNameField(name);
  const emailIsValid = validateEmailField(email);
  const phoneIsValid = validatePhoneField(phone);

  if (!name || !email || !phone) return false;

  return nameIsValid && emailIsValid && phoneIsValid;
}

/**
 * Validates the name input field for a new contact
 * @returns {boolean} True if the name is valid, false otherwise
 */
function validateNameField() {
  const name = document.getElementById('add-contact-name-input').value;

  if (!isValidName(name)) {
    showNameError('*Name must be at least 3 characters long.');
    return false;
  }

  resetNameError();
  return true;
}

/**
 * Validates the email input field for a new contact
 * @returns {boolean} True if the email is valid, false otherwise
 */
function validateEmailField() {
  const email = document.getElementById('add-contact-email-input').value;

  if (!isValidEmail(email)) {
    showEmailError('*Please enter a valid email address.');
    return false;
  }

  resetEmailError();
  return true;
}

/**
 * Validates the phone input field for a new contact
 * @returns {boolean} True if the phone number is valid, false otherwise
 */
function validatePhoneField() {
  const phone = document.getElementById('add-contact-phone-input').value;

  if (!isValidPhone(phone)) {
    showPhoneError('*Please enter a valid phone number.');
    return false;
  }

  resetPhoneError();
  return true;
}

/**
 * Resets the error message and styling for the name input field
 */
function resetNameError() {
  const input = document.getElementById('add-contact-name-input');
  const error = document.getElementById('failure-message-add-contact-name');

  input.style.borderColor = '';
  error.classList.add('display-none');
  error.innerHTML = '';
}

/**
 * Resets the error message and styling for the email input field
 */
function resetEmailError() {
  const input = document.getElementById('add-contact-email-input');
  const error = document.getElementById('failure-message-add-contact-email');

  input.style.borderColor = '';
  error.classList.add('display-none');
  error.innerHTML = '';
}

function resetPhoneError() {
  const input = document.getElementById('add-contact-phone-input');
  const error = document.getElementById('failure-message-add-contact-phone');

  input.style.borderColor = '';
  error.classList.add('display-none');
  error.innerHTML = '';
}

function showGeneralContactError(message) {
  const generalError = document.getElementById('failure-message-add-contact');
  generalError.classList.remove('display-none');
  generalError.innerHTML = message;
}

function showNameError(message) {
  const nameInput = document.getElementById('add-contact-name-input');
  const nameError = document.getElementById('failure-message-add-contact-name');

  nameInput.style.borderColor = 'red';
  nameError.classList.remove('display-none');
  nameError.innerHTML = message;
}

function showEmailError(message) {
  const emailInput = document.getElementById('add-contact-email-input');
  const emailError = document.getElementById('failure-message-add-contact-email');

  emailInput.style.borderColor = 'red';
  emailError.classList.remove('display-none');
  emailError.innerHTML = message;
}

function showPhoneError(message) {
  const phoneInput = document.getElementById('add-contact-phone-input');
  const phoneError = document.getElementById('failure-message-add-contact-phone');

  phoneInput.style.borderColor = 'red';
  phoneError.classList.remove('display-none');
  phoneError.innerHTML = message;
}

function isValidName(name) {
  if (!name) return false;
  if (!hasValidSpaces(name)) return false;
  if (name.trim().length < 3) return false;

  return true;
}

function isValidEmail(email) {
  if (!email) return false;
  if (!hasValidSpaces(email)) return false;
  if (email.includes(' ')) return false;

  const parts = email.split('@');
  if (parts.length !== 2) return false;

  const localPart = parts[0];
  const domain = parts[1];

  if (!localPart || !domain) return false;
  if (!isValidDomain(domain)) return false;

  return true;
}

function isValidDomain(domain) {
  if (!domain) return false;
  if (!hasValidSpaces(domain)) return false;
  if (domain.includes(' ')) return false;
  if (!domain.includes('.')) return false;

  const domainParts = domain.split('.');

  for (let i = 0; i < domainParts.length; i++) {
    if (domainParts[i].length === 0) return false;
  }

  const lastPart = domainParts[domainParts.length - 1];
  if (lastPart.length < 2) return false;

  return true;
}

function isValidPhone(phone) {
  if (!phone) return false;
  if (!hasValidSpaces(phone)) return false;

  for (let i = 0; i < phone.length; i++) {
    const char = phone[i];

    if (char !== ' ' && (char < '0' || char > '9')) {
      return false;
    }
  }

  const digitsOnly = phone.replaceAll(' ', '');
  return digitsOnly.length >= 5;
}

function hasValidSpaces(value) {
  if (!value) return false;
  if (value.startsWith(' ') || value.endsWith(' ')) return false;
  if (value.includes('  ')) return false;

  return true;
}

function resetAddContactErrors() {
  const nameInput = document.getElementById('add-contact-name-input');
  const emailInput = document.getElementById('add-contact-email-input');
  const phoneInput = document.getElementById('add-contact-phone-input');

  const generalError = document.getElementById('failure-message-add-contact');
  const nameError = document.getElementById('failure-message-add-contact-name');
  const emailError = document.getElementById('failure-message-add-contact-email');
  const phoneError = document.getElementById('failure-message-add-contact-phone');

  nameInput.style.borderColor = '';
  emailInput.style.borderColor = '';
  phoneInput.style.borderColor = '';

  generalError.classList.add('display-none');
  nameError.classList.add('display-none');
  emailError.classList.add('display-none');
  phoneError.classList.add('display-none');

  generalError.innerHTML = '';
  nameError.innerHTML = '';
  emailError.innerHTML = '';
  phoneError.innerHTML = '';
}

function buildNewContact(name, email, phone) {
  const parts = name.split(" ");
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" ") || " ",
    email,
    phoneNumber: phone,
    id: Date.now(),
  };
}

async function saveContactToDatabase(contact) {
  try {
    const result = await postData('contacts', contact);
    removeAddNewContactOverlay();
    loadContacts();
  } catch (error) {
    console.error("Fehler beim Speichern:", error);
    alert("Fehler beim Speichern. Bitte versuche es erneut.");
  }
}

async function saveEditedContact(event, key) {
  event.preventDefault();
  const { name, email, phone } = getEditedContactInputs();
  if (!validateContactInputs(name, email, phone)) return;

  const updatedContact = buildUpdatedContact(name, email, phone, key);
  await commitContactChanges(updatedContact, key);
}

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

function clearContactBorder() {
  const failMessageName = document.getElementById('add-contact-name-input');
  const failMessageEmail = document.getElementById('add-contact-email-input');
  const failMessagePhone = document.getElementById('add-contact-phone-input');

  failMessageName.style.borderColor = '';
  failMessageEmail.style.borderColor = '';
  failMessagePhone.style.borderColor = '';
}

function getEditedContactInputs() {
  return {
    name: document.querySelector('#edit_contact_overlay .add-contact-name-input').value.trim(),
    email: document.querySelector('#edit_contact_overlay .add-contact-email-input').value.trim(),
    phone: document.querySelector('#edit_contact_overlay .add-contact-phone-input').value.trim(),
  };
}

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
