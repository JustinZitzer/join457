let allContacts = [];

async function fetchContacts() {
  try {
    const data = await loadData('contacts');
    return data || {};
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return {};
  }
}

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

async function getSortedContacts() {
  const contactsUnsorted = await fetchContacts();
  if (!contactsUnsorted) return null;
  const contacts = Object.entries(contactsUnsorted).map(([key, value]) => ({
    ...value,
    key,
  }));
  return contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
}

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

async function renderContacts(contacts) {
  const container = document.getElementById('contact_list');
  container.innerHTML += getContactCard(contacts);
}

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


async function createNewContact(event) {
  const failMessage = document.getElementById('failure-message-add-contact');
  event.preventDefault();
  resetAddContactErrors();
  const { name, email, phone } = getNewContactInputs();
  if (!validateContactInputs(name, email, phone)) return;

  const existingContact = allContacts.some(contact => contact.email.toLowerCase() === email.toLowerCase());
  if (existingContact) {
    failMessage.classList.remove('display-none');
    failMessage.innerHTML = 'A contact with this email already exists.';
    return;
  }

  const newContact = buildNewContact(name, email, phone);
  await saveContactToDatabase(newContact);
  handleCreatedContactOverlay();
}

function getNewContactInputs() {
  return {
    name: document.querySelector('.add-contact-name-input').value.trim(),
    email: document.querySelector('.add-contact-email-input').value.trim(),
    phone: document.querySelector('.add-contact-phone-input').value.trim(),
  };
}

function validateContactInputs(name, email, phone) {
  clearContactErrors();
  clearContactBorder();
  if (!name || !email || !phone) return redBoarderForInputs();

  if (!hasValidSpaces(name)) return nameErrorAddContact();
  if (name.length < 3) return nameErrorAddContact();

  if (!isValidEmail(email)) return emailAddContactFailure();

  if (!isValidPhone(phone)) return phoneNumberError();

  return true;
}


function redBoarderForInputs() {
  const nameInput = document.getElementById('add-contact-name-input');
  const emailInput = document.getElementById('add-contact-email-input');
  const phoneInput = document.getElementById('add-contact-phone-input');
  const failMessage = document.getElementById('failure-message-add-contact');

  nameInput.style.borderColor = 'red';
  emailInput.style.borderColor = 'red';
  phoneInput.style.borderColor = 'red';
  failMessage.classList.remove('display-none');
  failMessage.innerHTML = '*Bitte alle Felder ausfüllen.';

  return false;
}

function emailAddContactFailure() {
  const emailInput = document.querySelector('.add-contact-email-input');
  const errorMessage = document.getElementById('failure-message-add-contact-email');

  emailInput.style.borderColor = 'red';
  errorMessage.classList.remove('display-none');

  return false;
}

function phoneNumberError() {
  const failMessage = document.getElementById('failure-message-add-contact-phone');
  const phoneInput = document.getElementById('add-contact-phone-input');

  phoneInput.style.borderColor = 'red';
  failMessage.classList.remove('display-none');
  failMessage.innerHTML = '*Please enter a valid phone number.';

  return false;
}

function nameErrorAddContact() {
  const failMessage = document.getElementById('failure-message-add-contact-name');
  const nameInput = document.getElementById('add-contact-name-input');

  nameInput.style.borderColor = 'red';
  failMessage.classList.remove('display-none');
  failMessage.innerHTML = '*Name must be 3 characters long.';

  return false;
}

function resetAddContactErrors() {
  const nameInput = document.getElementById('add-contact-name-input');
  const emailInput = document.getElementById('add-contact-email-input');
  const phoneInput = document.getElementById('add-contact-phone-input');
  const failMessage = document.getElementById('failure-message-add-contact');
  if (failMessage) {
    failMessage.innerHTML = '';
  }
  nameInput.style.borderColor = '';
  emailInput.style.borderColor = '';
  phoneInput.style.borderColor = '';

  failMessage.classList.add('display-none');
  failMessage.innerHTML = '';
}

function isValidEmail(email) {
  if (!hasValidSpaces(email)) return false;
  if (email.includes(' ')) return false;

  const parts = email.split('@');
  if (parts.length !== 2) return false;
  if (!parts[0] || !parts[1]) return false;

  return isValidDomain(parts[1]);
}

function isValidDomain(domain) {
  if (!hasValidSpaces(domain)) return false;
  if (domain.includes(' ')) return false;

  const domainParts = domain.split('.');
  if (domainParts.length !== 2) return false;
  if (!domainParts[0] || !domainParts[1]) return false;

  if (domainParts[1].length < 2) return false;

  return true;
}

function isValidPhone(phone) {
  if (!hasValidSpaces(phone)) return false;

  for (let char of phone) {
    if (char !== ' ' && (char < '0' || char > '9')) {
      return false;
    }
  }

  return phone.length > 0;
}

function hasValidSpaces(value) {
  if (value.startsWith(' ') || value.endsWith(' ')) return false;
  if (value.includes('  ')) return false;
  return true;
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
  const failMessageName = document.querySelector('.failure-message-add-contact-name');
  const failMessageEmail = document.querySelector('.failure-message-add-contact-email');
  const failMessagePhone = document.querySelector('.failure-message-add-contact-phonenumber');

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
