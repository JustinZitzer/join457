function toggleUserProfileOverlay() {
    const userProfileMenu = document.getElementById('user_profile_menu');
    userProfileMenu.classList.toggle('hide')
}

function goToSummaryHtml() {
    window.location.href = 'summary.html';
}

function goToAddTaskHtml() {
    window.location.href = 'add_task.html';
}

function goToBoardHtml() {
    window.location.href = 'board.html';
}

function goToContactsHtml() {
    window.location.href = 'contacts.html';
}