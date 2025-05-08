function openOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.classList.add('overlay-visible');
    let overlayContent= document.getElementById('content-add-task-overlay');
    overlayContent.innerHTML += `
     <div class="container-both-sides">
            <div class="inputfield-box-left-side">
                <div class="text-title">
                    <div class="text-title-mark">
                        <span>Title</span>
                    </div>
                    <input type="text" placeholder="Enter a title" class="title-inputfield-enter-title">
                </div>
                <div class="description-main-box">
                    <div class="description-text">
                        <span>Description</span>
                        <input type="text" placeholder="Enter Description" class="inputfield-description">
                    </div>
                    <div class="inputfield-due-date-container">
                        <img class="calendar-clock" src="./assets/icons/calendar_clock.png" alt="clock-calendar">

                        <div class="due-date-mark">
                            <span>Due date</span>
                        </div>
                        <input type="text" placeholder="dd/mm/yyy" class="due-date-text-field">
                    </div>
                </div>
            </div>
            <img class="line-middle-of-both-container" src="./assets/icons/Vector 4.png"
                alt="line between bothcontainers">

            <div class="inputfield-box-right-side">
                <div class="text-priority">
                    <div class="priority-box">
                        <span>Priority</span>

                        <div class="main-box-inputfield">
                            <div class="arrow-container-main-red">
                                <button class="arrow-container-red">
                                    <h4>Urgent</h4>
                                    <img class="arrow-red" src="./assets/icons/double-arrow-up-14221.png"
                                        alt="red-arrow">
                                </button>
                            </div>

                            <input type="text" placeholder="Medium =" class="text-inputfield-medium">

                            <div class="arrow-container-main-green">
                                <button class="arrow-container-green">
                                    <h5>Low</h5>
                                    <img class="arrow-green" src="./assets/icons/double-arrow-down-14228.png"
                                        alt="green-arrow">
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="assigned-inputfield-box">
                        <span>Assigned to</span>
                        <input type="text" placeholder="Select contacts to assign" class="inputfield-text-assign">

                        <img class="assigned-arrow-icon" src="./assets/icons/arrow_drop_down.png"
                            alt="assigned-arrow-button">

                    </div>
                    <div class="task-inputfield-box">
                        <div class="category-mark">
                            <span>Category</span>
                        </div>
                        <input type="text" placeholder="Select task category" class="inputfield-category-assign">
                        <img class="assigned-arrow-icon-down" src="./assets/icons/arrow_drop_down.png"
                            alt="assigned-arrow-button">
                    </div>

                    <div class="subtask-inputfield-box">
                        <span>Subtasks</span>
                        <div class="subtask-inputfield-container">
                            <img class="add-icon-container" src="./assets/icons/subtask-plus-icon.svg"
                                alt="subtask-plus-icon">
                            <input type="text" placeholder="Add new subtask" class="inputfield-subtask-assign">
                        </div>
                    </div>
                </div>
                <div class="field-required">
                    <span>This field is required</span>
                </div>
            </div>
        </div>
    </div>
    </div>


    <div class="clear-create-container">
        <div class="clear-field">
            <div class="clear-text">Clear</div>
            <img class="close-button" src="./assets/icons/close.png" alt="close-icon">
        </div>

        <div class="create-field">
            <div class="text-create-field">Create Task</div>
            <img class="check-button" src="./assets/icons/check.png" alt="check-button">
        </div>
    </div>

    </div>
    `

    // Animation erneut triggern (falls mehrfach geöffnet)
    const content = overlay.querySelector('.overlay-content');
    content.style.animation = 'none';
    void content.offsetWidth; // Reflow erzwingen
    content.style.animation = '';
    content.classList.add('slide-in');
}

function closeOverlay(event) {
    document.getElementById('overlay').classList.remove('overlay-visible');
}