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
    await deleteData('contacts', key);
    console.log(`Kontakt gelöscht: ${key}`);
    loadContacts();
    removeSideOverlay();
    activeCard = null;
  } catch (error) {
    console.error("Error deleting contacts:", error);
  }
}


async function createNewContact(event) {
  event.preventDefault();
  const { name, email, phone } = getNewContactInputs();
  if (!validateContactInputs(name, email, phone)) return;

  const existingContact = allContacts.some(contact => contact.email.toLowerCase() === email.toLowerCase());
  if (existingContact) {
    alert('Ein Kontakt mit dieser E-Mail existiert bereits.');
    return;
  }

  const newContact = buildNewContact(name, email, phone);
  await saveContactToDatabase(newContact);
}

function getNewContactInputs() {
  return {
    name: document.querySelector('.add-contact-name-input').value.trim(),
    email: document.querySelector('.add-contact-email-input').value.trim(),
    phone: document.querySelector('.add-contact-phone-input').value.trim(),
  };
}

function validateContactInputs(name, email, phone) {
  if (!name || !email || !phone)
    return alert("Bitte alle Felder ausfüllen."), false;

  if (!isValidEmail(email))
    return alert("Bitte eine gültige E-Mail-Adresse eingeben (z. B. email@gmx.de)."), false;

  if (!isValidPhone(phone))
    return alert("Die Telefonnummer darf nur Zahlen enthalten."), false;

  return true;
}

function isValidEmail(email) {
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  if (!parts[0] || !parts[1]) return false;
  if (!parts[1].includes('.')) return false;
  return true;
}

function isValidPhone(phone) {
  for (let char of phone) {
    if (char < '0' || char > '9') return false;
  }
  return phone.length > 0;
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
    console.log("Kontakt gespeichert:", contact, "→", result);
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
    console.log("Kontakt aktualisiert:", contact);
    removeEditContactOverlay();
    await loadContacts();
    openContactsSideCardOverlayById(contact.id);
  } catch (error) {
    console.error("Fehler beim Speichern:", error);
    alert("Fehler beim Speichern. Bitte versuche es erneut.");
  }
}
