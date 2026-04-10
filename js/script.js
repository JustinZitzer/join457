/** Toggles the visibility of the user profile overlay menu. */
function toggleUserProfileOverlay() {
    const userProfileMenu = document.getElementById('user_profile_menu');
    userProfileMenu.classList.toggle('hide')
}

/** Navigates to the summary page and triggers a resize event. */
function goToSummaryHtml() {
    window.location.href = 'summary.html';
    window.dispatchEvent(new Event('resize'));
}

/** Navigates to the add task page and triggers a resize event. */
function goToAddTaskHtml() {
    window.location.href = 'add_task.html';
    window.dispatchEvent(new Event('resize'));
}

/** Navigates to the board page and triggers a resize event. */
function goToBoardHtml() {
    window.location.href = 'board.html';
    window.dispatchEvent(new Event('resize'));
}

/** Navigates to the contacts page and triggers a resize event. */
function goToContactsHtml() {
    window.location.href = 'contacts.html';
    window.dispatchEvent(new Event('resize'));
}