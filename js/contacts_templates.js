function getContactOverlay() {
    return `
    <div id="contacts_side_overlay" class="contacts-overlay-container">
                <div class="contacts-overlay-header">
                    <div class="contacts-overlay-user-profile">
                        <p>AM</p>
                    </div>
                    <div class="contacts-info-container">
                        <h3>Anton Za</h3>
                        <div class="contacts-overlay-action-buttons-container">
                            <div onclick="openEditContactOverlay()" class="contacts-overlay-edit-container">
                                <img src="./assets/icons/edit-icon.svg" alt="edit-icon">
                                <p>Edit</p>
                            </div>
                            <div class="contacts-overlay-delete-container">
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
                        <a class="blue-color">Anton.za@gmail.com</a>
                    </div>
                    <div class="contacts-phone-details-container">
                        <h4>Phone</h4>
                        <a>+491645128738</a>
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
                        <button class="add-contact-create-contact-btn">Create Contact <img src="./assets/icons/check-icon.svg" alt="check-icon"></button>
                    </div>
                </form>
            </div>
        </div>
        `;
}

function getEditContactOverlay() {
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
                <div class="add-contact-person-svg-container">
                    <p>AZ</p>
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