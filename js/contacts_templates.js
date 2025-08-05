function getContactOverlay(contact) {
    const color = getColorForContact(contact.id);
    return `
    <div id="contacts_side_overlay" class="contacts-overlay-container">
                <div class="contacts-overlay-header">
                    <div class="contacts-overlay-user-profile" style="background-color:${color};">
                        <p>${contact.firstName[0]}${contact.lastName[0]}</p>
                    </div>
                    <div class="contacts-info-container">
                        <h3>${contact.firstName} ${contact.lastName}</h3>
                        <div class="contacts-overlay-action-buttons-container">
                            <div onclick="openEditContactOverlay(${contact.id})" class="contacts-overlay-edit-container">
                                <img src="./assets/icons/edit-icon.svg" alt="edit-icon">
                                <p>Edit</p>
                            </div>
                            <div onclick="deleteContact('${contact.key}')" class="contacts-overlay-delete-container">
                                <img src="./assets/icons/delete-icon.svg" alt="delete-icon">
                                <p>Delete</p>
                            </div>
                        </div>
                    </div>
                </div>
                <span>Contact Information</span>
                <div class="contacts-details-container">
                    <div class="contacts-email-details-container">
                        <h4>Email</h4>
                        <a class="blue-color">${contact.email}</a>
                    </div>
                    <div class="contacts-phone-details-container">
                        <h4>Phone</h4>
                        <a>+${contact.phoneNumber}</a>
                    </div>
                </div>
            </div>
    `;
}

function getAddContactOverlay() {
    return `
    <div id="add_contact_overlay" class="add-contact-overlay">
            <div class="add-contact-left-section">
                <div class="add-contact-left-section-content">
                    <img class="add-contact-join-logo" src="./assets/img/join-logo-white.svg" alt="join-logo-white">
                    <div class="add-contact-headline">
                        <h1>Add contact</h1>
                        <h2>Tasks are better with a team!</h2>
                        <div class="add-contact-underlined"></div>
                    </div>
                </div>
            </div>
            <div class="add-contact-right-section">
                <img onclick="removeAddNewContactOverlay()" class="add-contact-close-btn" src="./assets/icons/contacts-close-icon.svg" alt="close-button">
                <div class="add-contact-person-svg-container">
                    <img src="./assets/img/contacts-person.svg" alt="contact-person">
                </div>
                <form>
                    <div class="add-contact-input-containers">
                        <input class="add-contact-name-input" type="text" placeholder="Name">
                    </div>
                    <div class="add-contact-input-containers">
                        <input class="add-contact-email-input" type="text" placeholder="Email">
                    </div>
                    <div class="add-contact-input-containers">
                        <input class="add-contact-phone-input" type="text" placeholder="Phone">
                    </div>
                    <div class="add-contact-btn-section">
                        <button onclick="removeAddNewContactOverlay()" class="add-contact-cancel-btn">Cancel <img src="./assets/icons/contacts-close-icon.svg" alt="close-icon"></button>
                        <button onclick="createNewContact(event)" class="add-contact-create-contact-btn">Create Contact <img src="./assets/icons/check-icon.svg" alt="check-icon"></button>
                    </div>
                </form>
            </div>
        </div>
        `;
}

function getEditContactOverlay(contact) {
    const color = getColorForContact(contact.id);
    return `
    <div id="edit_contact_overlay" class="add-contact-overlay">
            <div class="add-contact-left-section">
                <div class="add-contact-left-section-content">
                    <img class="add-contact-join-logo" src="./assets/img/join-logo-white.svg" alt="join-logo-white">
                    <div class="add-contact-headline">
                        <h1>Edit contact</h1>
                        <div class="add-contact-underlined"></div>
                    </div>
                </div>
            </div>
            <div class="add-contact-right-section">
                <img onclick="removeEditContactOverlay()" class="add-contact-close-btn" src="./assets/icons/contacts-close-icon.svg" alt="close-button">
                <div class="add-contact-person-svg-container" style="background-color:${color};">
                    <p>${contact.firstName[0]}${contact.lastName[0]}</p>
                </div>
                <form>
                    <div class="add-contact-input-containers">
                        <input class="add-contact-name-input" type="text" placeholder="Name">
                    </div>
                    <div class="add-contact-input-containers">
                        <input class="add-contact-email-input" type="text" placeholder="Email">
                    </div>
                    <div class="add-contact-input-containers">
                        <input class="add-contact-phone-input" type="text" placeholder="Phone">
                    </div>
                    <div class="add-contact-btn-section">
                        <button class="add-contact-cancel-btn">Delete<img src="./assets/icons/delete-icon.svg"
                                alt="close-icon"></button>
                        <button class="add-contact-create-contact-btn">Save<img src="./assets/icons/check-icon.svg"
                                alt="check-icon"></button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function getContactCard(contact) {
    const color = getColorForContact(contact.id);
    return `
    <div id="contact_card_${contact.id}" class="contact-card"
         onclick="openContactsSideCardOverlayById(${contact.id})">
      <div class="contact-profile" style="background-color:${color}">${contact.firstName[0]}${contact.lastName[0]}</div>
      <div class="contact-info">
        <span>${contact.firstName} ${contact.lastName}</span>
        <a>${contact.email}</a>
      </div>
    </div>
  `;
}

function getLetterGroup(currentFirstLetter) {
    return `
    <div class="contacts-letter-group">
        <p>${currentFirstLetter}</p>
        <div class="contact-list-seperator"></div>
    </div>
        `;
}
