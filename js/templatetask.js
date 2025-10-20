function getTaskOverlayTemplate() {
  return `
  <div id="overlay-content" class="overlay-content-board" onclick="event.stopPropagation()">
    <div class="container-both-sides-board">
      <div class="add-task-text-box-board">
      <div class="container-add-task">
        <h2>Add Task</h2>
        <img class="x-close-button-add-task-overlay" src="./assets/icons/system-single-close-line-svgrepo-com.svg" alt="">
        </div>
      </div>
      <div class="inputfield-box-left-side-board">
        <div class="text-title-board">
          <div class="text-title-mark-board">
            <span>Title</span>
          </div>
          <input onblur="validateInputBoard()" type="text" placeholder="Enter a title" class="title-inputfield-enter-title-board" id="titleInputBoard">
          <div>
            <p class="field-required-in-board display-none" id="field-required-in-board">This field is required</p>
          </div>
        </div>
        <div class="description-main-box-board">
          <div class="description-text-board">
            <span>Description</span>
            <input type="text" placeholder="Enter Description" class="inputfield-description-board" id="inputfield-description-board">
          </div>
          <div class="inputfield-due-date-container-board">
            <img class="calendar-clock-board" src="./assets/icons/calendar_clock.png" alt="clock-calendar">
            <div class="due-date-mark-board">
              <span>Due date</span>
            </div>
            <input onblur="validateDueDateInputBoard()" type="text" placeholder="dd/mm/yyy" class="due-date-text-field-board" id="dueDateInputBoard">
          </div>
            <div>
              <p class="field-required-in-board display-none" id="due-date-required-board-error">This field is required</p>
            </div>
        </div>
      </div>
      <img class="line-middle-of-both-container-board" src="./assets/icons/Vector 4.png" alt="line between bothcontainers">
      <div class="inputfield-box-right-side-board">
        <div class="text-priority-board">
          <div class="priority-box-board">
            <span>Priority</span>
            <div class="main-box-inputfield-board">
              <div class="arrow-container-main-red-board">
                <button onclick="togglePriorityBoard('Urgent')" class="arrow-container-red-board" id="arrow-container-red-board">
                  <h4>Urgent</h4>
                  <img class="arrow-red-board" src="./assets/icons/double-arrow-up-14221.png" alt="red-arrow">
                </button>
              </div>
              <button onclick="togglePriorityBoard('Medium')" class="arrow-container-orange-board" id="arrow-container-orange-board">
                <h4>Medium</h4>
                <h4>=</h4>
              </button>
              <div class="arrow-container-main-green-board">
                <button onclick="togglePriorityBoard('Low')" class="arrow-container-green-board" id="arrow-container-green-board">
                  <h5>Low</h5>
                  <img class="arrow-green-board" src="./assets/icons/double-arrow-down-14228.png" alt="green-arrow">
                </button>
              </div>
            </div>
          </div>
          <div class="assigned-inputfield-box-board">
            <span>Assigned to</span>
            <input type="text" placeholder="Select contacts to assign" class="inputfield-text-assign-board" id="inputfield-text-assign-board">
            <img onclick="loadContactsForDropdownInBoard()" class="assigned-arrow-icon-board" src="./assets/icons/arrow_drop_down.png" alt="assigned-arrow-button" id="contact-list-board">
          </div>
            <div class="contacts-dropdown-board display-none" id="contacts-dropdown-board"></div>
            <div class="three-circle-container-board display-none" id="three-circle-container-board"></div>
          <div class="task-inputfield-box-board">
            <div class="category-mark-board">
              <span>Category</span>
            </div>
            <input type="text" placeholder="Select task category" class="inputfield-category-assign-board" id="inputfield-category-assign-board">
            <img class="assigned-arrow-icon-down-board" src="./assets/icons/arrow_drop_down.png" alt="assigned-arrow-button" id="dropdown-toogle-btn-board">
          </div>
          <div class="subtask-inputfield-box-board">
            <span>Subtasks</span>
            <div class="subtask-inputfield-container-board">
              <img class="add-icon-container-board" src="./assets/icons/subtask-plus-icon.svg" alt="subtask-plus-icon" id="add-icon-container-board">
              <input type="text" placeholder="Add new subtask" class="inputfield-subtask-assign-board" id="inputfield-subtask-assign-board">
            </div>
          </div>
        </div>
        <div class="field-required-board">
          <span>This field is required</span>
        </div>
      </div>
    </div>
    <div class="clear-create-container-board">
      <div class="clear-field-board">
        <div class="clear-text-board">Cancel</div>
        <img class="close-button-board" src="./assets/icons/close.png" alt="close-icon">
      </div>
      <div class="create-field-board">
        <div class="text-create-field-board">Create Task</div>
        <img class="check-button-board" src="./assets/icons/check.png" alt="check-button">
      </div>
    </div>
  </div>
  `;
}

function getTaskFromFirebaseTemplate(task, taskKey) {
  return `
    <div onclick="showBigTaskInfo('${taskKey}')" id="todo-content-box${taskKey}" class="todo-content-box"
        draggable="true" ondragstart="startDragging('${taskKey}', '${task.category}')">
      <div id="user-story-box${taskKey}">
        <span id="user-story-or-technical-task-box${taskKey}">${task.categoryUserOrTechnicalTask}</span>
      </div>
      <div class="text-contact-box">
        <span>${task.titel}</span>
        <div class="text-create-box">
          <span>${task.description}</span>
        </div>
      </div>
      <div id="progressbar-box${taskKey}" class="progressbar-box">
        <div id="progressbar-content${taskKey}" class="progressbar-content">
          <div id="progressbar-fill${taskKey}" class="progressbar-fill"></div>
        </div>
        <div id="subtask-text${taskKey}" class="subtask-text">0/2 subtasks</div>
      </div>
      <div class="three-circle-todo">
        <div id="three-circle-container${taskKey}" class="three-circle-container">
          <div class="single-circle-first"><h5>AS</h5></div>
          <div class="single-circle-second"><h5>DE</h5></div>
          <div class="single-circle-third"><h5>EF</h5></div>
        </div>
        <img class="priority-icon-task-little" src="" alt="bild" id="priority-icon-task-little${taskKey}">
      </div>
    </div>
  `;
}

function getTaskFromFirebaseBigTaskTemplate(task, taskKey) {
  return `
    <div id="big-task-${taskKey}" class="big-task-panel  display-none">
      <div id="big-task-show-hide-div${taskKey}" class="big-task-show-hide-div">
        <div id="task-category-and-cross-icon-div" class="task-category-and-cross-icon-div">
          <span class="big-board-user-or-technical" id="big-board-user-or-technical${taskKey}">${task.categoryUserOrTechnicalTask}</span>
          <img class="close-icon-big-task" src="./assets/icons/contacts-close-icon.svg" alt="" onclick="hideBigTaskInfo('${taskKey}')">
        </div>

        <h1 id="task-board-big-headline${taskKey}" class="task-board-big-headline">${task.titel}</h1>
        <span id="task-board-big-description" class="task-board-big-description">${task.description}</span>

        <div class="task-board-big-date-div">
          <p class="task-board-big-date-text">Due Date:</p>
          <span id="task-board-big-date-number" class="task-board-big-date-number">${task.dueDate}</span>
        </div>

        <div id="task-board-big-priority-div" class="task-board-big-priority-div">
          <p class="task-board-big-priority-text">Priority:</p>
          <span id="task-board-big-priority${taskKey}" class="task-board-big-priority">${task.priority}</span>
          <img id="task-board-big-priority-icon${taskKey}" class="task-board-big-priority-icon" src="" alt="">
        </div>

        <div class="task-board-big-assigned-to-div">
          <p class="assigned-to-big-task-headline">Assigned to:</p>
          <div id="task-board-big-assigned-to-contacts-div${taskKey}" class="task-board-big-assigned-to-contacts-div">
            <div class="task-board-big-first-contact">
              <span class="task-board-big-first-circle">EM</span>
              <p class="task-board-big-first-contact-name"></p>
            </div>
            <div class="task-board-big-second-contact">
              <span class="task-board-big-second-circle">MB</span>
              <p class="task-board-big-second-contact-name"></p>
            </div>
            <div class="task-board-big-third-contact">
              <span class="task-board-big-third-circle">AM</span>
              <p class="task-board-big-third-contact-name"></p>
            </div>
          </div>
        </div>

        <h2 class="subtasks-board-big-headline">Subtasks</h2>
        <div id="subtasks-board-tasks-div${taskKey}" class="subtasks-board-tasks-div">
          <div class="subtasks-board-first-task">
            <input class="checkbox-board-subtasks" type="checkbox">
            <span>Implement Recipe Recommendation</span>
          </div>
          <div class="subtasks-board-second-task">
            <input class="checkbox-board-subtasks" type="checkbox">
            <span>Start Page Layout</span>
          </div>
        </div>

        <div class="task-board-big-delete-edit-div">
          <div class="task-board-big-delete-edit-div-first">
            <img class="delete-icon-board" src="./assets/icons/delete-icon.svg" alt="">
            <p onclick="deleteTask('${task.category}', '${taskKey}')" class="delete-text-board">Delete</p>
            <div class="seperator-big-subtask"></div>
            <img class="edit-icon-board" src="./assets/icons/edit-icon.svg" alt="">
            <p onclick="editTask('${taskKey}')" class="edit-text-board">Edit</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getTaskEditTemplate(task, taskKey) {
  return `
    <div id="big-task-edit${taskKey}" class="big-task-panel">
      <div id="task-category-and-cross-icon-div" class="task-category-and-cross-icon-div-edit">
        <img class="close-icon-big-task" src="./assets/icons/contacts-close-icon.svg" alt="" onclick="cancelEditTask('${taskKey}')">
      </div>

      <div class="titel-edit-div">
        <h2 class="big-task-title-edit" id="big-task-title-edit">Title</h2>
        <input class="titel-edit-task-big" id="titel-edit-task-big${taskKey}" type="text" value="${task.titel}" >
      </div>

      <div class="description-edit-div">
        <h2 class="description-headline-edit">Description</h2>
        <input class="description-edit-task-big" id="description-edit-task-big${taskKey}" type="text" value="${task.description}">
      </div>

      <div class="due-date-edit-div">
        <h2 class="due-date-headline-edit">Due Date</h2>
        <div class="img-input-date-edit-div">
          <div class="inputfield-due-date-container-edit-div">
            <input class="due-date-edit-task-big" id="due-date-edit-task-big${taskKey}" type="text" value="${task.dueDate}">
            <img class="calendar-icon-edit-task-big" src="" alt="calendar-icon">
          </div>
        <div>
      </div>

      <div class="priority-edit-div">
        <h2 class="priority-bold-edit-headline">Priority</h2>
        <div id="task-priority-value-div${taskKey}" class="hidden height-zero">${task.priority}</div>
        <div class="edit-button-div">
          <button onclick="changePriorityInEdit('${taskKey}', 'Urgent')" id="urgent-edit-button-div${taskKey}" class="urgent-edit-button-div">
            <h4>Urgent</h4>
            <img class="arrow-red" src="./assets/icons/double-arrow-up-14221.png" alt="red-arrow">
          </button>
          <button onclick="changePriorityInEdit('${taskKey}', 'Medium')" id="medium-edit-button-div${taskKey}" class="medium-edit-button-div">
            <h4>Medium</h4>
            <h4>=</h4>
          </button>
          <button onclick="changePriorityInEdit('${taskKey}', 'Low')" id="low-edit-button-div${taskKey}" class="low-edit-button-div">
            <h4>Low</h4>
            <img class="arrow-green" src="./assets/icons/double-arrow-down-14228.png" alt="green-arrow">
          </button>
        </div>
      </div>

      <div class="assigned-inputfield-box-edit-div">
        <h2 class="assigned-to-edit-headline">Assigned to</h2>
        <div class="assigned-inputfield-edit-div">
          <input type="text" placeholder="Select contacts to assign" id="inputfield-text-assign-edit ${taskKey}" class="inputfield-text-assign-edit">
          <img id="contact-list-edit-div${taskKey}" onclick="loadContactsForDropdownInEdit('${taskKey}'), changeContactCircleInEditTemplate('${taskKey}')" class="assigned-arrow-icon-edit" src="./assets/icons/arrow_drop_down.png" alt="assigned-arrow-button">
        </div>
      </div>

      <div id="contacts-dropdown-edit${taskKey}" class="contacts-dropdown-edit hidden height-zero"></div>

      <div id="three-circle-todo-edit${taskKey}" class="three-circle-todo-edit">
        <div id="three-circle-container-edit${taskKey}" class="three-circle-container-edit">
      </div>

      <div class="subtask-headline-edit-div">
        <h2 class="subtasks-headline-edited">Subtasks</h2>
        <div class="subtask-inputfield-icon-edit-div">
          <input onclick="showInputFieldEditSubtasksIcons('${taskKey}')" type="text" class="inputfield-subtask-edit-div" placeholer="Add new subtask" id="inputfield-subtask-edit-div${taskKey}">
          <svg onclick="clearInputHideIconsSubtasksInput('${taskKey}')" class="delete-subtask-edit-check-icon hidden" id="delete-subtask-edit-check-icon${taskKey}" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.00005 8.40005L2.10005 13.3C1.91672 13.4834 1.68338 13.575 1.40005 13.575C1.11672 13.575 0.883382 13.4834 0.700049 13.3C0.516715 13.1167 0.425049 12.8834 0.425049 12.6C0.425049 12.3167 0.516715 12.0834 0.700049 11.9L5.60005 7.00005L0.700049 2.10005C0.516715 1.91672 0.425049 1.68338 0.425049 1.40005C0.425049 1.11672 0.516715 0.883382 0.700049 0.700049C0.883382 0.516715 1.11672 0.425049 1.40005 0.425049C1.68338 0.425049 1.91672 0.516715 2.10005 0.700049L7.00005 5.60005L11.9 0.700049C12.0834 0.516715 12.3167 0.425049 12.6 0.425049C12.8834 0.425049 13.1167 0.516715 13.3 0.700049C13.4834 0.883382 13.575 1.11672 13.575 1.40005C13.575 1.68338 13.4834 1.91672 13.3 2.10005L8.40005 7.00005L13.3 11.9C13.4834 12.0834 13.575 12.3167 13.575 12.6C13.575 12.8834 13.4834 13.1167 13.3 13.3C13.1167 13.4834 12.8834 13.575 12.6 13.575C12.3167 13.575 12.0834 13.4834 11.9 13.3L7.00005 8.40005Z" fill="#2A3647"/>
          </svg>
          <div class="seperator-subtasks-edit hidden" id="seperator-subtasks-edit${taskKey}"></div>
          <svg onclick="addNewSubtaskInEdit('${taskKey}')" class="add-new-subtask-edit-icon hidden" id="add-new-subtask-edit-icon${taskKey}" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_314253_4333" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
              <rect y="0.5" width="24" height="24" fill="white"/>
            </mask>
            <g mask="url(#mask0_314253_4333)">
              <path d="M9.55057 15.65L18.0256 7.175C18.2256 6.975 18.4631 6.875 18.7381 6.875C19.0131 6.875 19.2506 6.975 19.4506 7.175C19.6506 7.375 19.7506 7.6125 19.7506 7.8875C19.7506 8.1625 19.6506 8.4 19.4506 8.6L10.2506 17.8C10.0506 18 9.81724 18.1 9.55057 18.1C9.28391 18.1 9.05057 18 8.85057 17.8L4.55057 13.5C4.35057 13.3 4.25474 13.0625 4.26307 12.7875C4.27141 12.5125 4.37557 12.275 4.57557 12.075C4.77557 11.875 5.01307 11.775 5.28807 11.775C5.56307 11.775 5.80057 11.875 6.00057 12.075L9.55057 15.65Z" fill="rgb(42, 54, 71)"/>
            </g>
          </svg>
        </div>
      </div>

      <div class="subtasks-edit-div" id="subtasks-edit-div${taskKey}"></div>

      <div id="add-changes-div${taskKey}" class="add-changes-div">
        <button onclick="saveEditedTaskToFirebase('${taskKey}', '${task.category}', '${task.categoryUserOrTechnicalTask}')" id="add-changes-button${taskKey}" class="add-changes-button">Ok</button>
      </div>

    </div>
  `;
}

function getSubtaskListElementTemplate(subtask, subtaskSavedCounter) {
  return `
    <li class="subtask-list-element" id="subtask-${subtaskSavedCounter}">
      <div class="subtask-list-element-div" id="subtask-list-element-div${subtaskSavedCounter}">
        • ${subtask} <input type="checkbox" id="subtask-checkbox${subtaskSavedCounter}" class="subtask-checkbox hidden">
        <div class="pen-and-bin-container">
          <svg class="pen-icon-before-edit" onclick="editSavedSubtask(${subtaskSavedCounter}, '${subtask.replace(
    /'/g,
    "\\'"
  )}')" width="25" height="25" viewBox="0 0 33 32" fill="#2A3647" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_313493_6285" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="33" height="32">
              <rect x="0.5" width="32" height="32"/>
            </mask>
            <g mask="url(#mask0_313493_6285)">
              <path d="M7.16667 25.3332H9.03333L20.5333 13.8332L18.6667 11.9665L7.16667 23.4665V25.3332ZM26.2333 11.8998L20.5667 6.29984L22.4333 4.43317C22.9444 3.92206 23.5722 3.6665 24.3167 3.6665C25.0611 3.6665 25.6889 3.92206 26.2 4.43317L28.0667 6.29984C28.5778 6.81095 28.8444 7.42761 28.8667 8.14984C28.8889 8.87206 28.6444 9.48873 28.1333 9.99984L26.2333 11.8998ZM24.3 13.8665L10.1667 27.9998H4.5V22.3332L18.6333 8.19984L24.3 13.8665Z" fill="#2A3647"/>
            </g>
          </svg>
          <div class="seperator-pen-bin"></div>
          <svg class="bin-icon-before-edit" onclick="deleteSavedSubTask(${subtaskSavedCounter}, '${subtask}')" width="24" height="24" viewBox="0 0 24 24" fill="#2A3647" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_314135_4497" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
              <rect width="24" height="24"/>
            </mask>
            <g mask="url(#mask0_314135_4497)">
              <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"/>
            </g>
          </svg>
        </div>
      </div>
    </li>
  `;
}

function getSubtaskEditInputFieldTemplate(subtask, subtaskSavedCounter) {
  return `
  <div class="subtask-input-with-icons">
      <input
        id="edit-subtask-inputfield${subtaskSavedCounter}"
        class="edit-subtask-inputfield"
        type="text"
        value="${subtask}"
        onkeydown="if(event.key==='Enter'){saveEditedSubtask(${subtaskSavedCounter})}"
        style="padding-right: 65px"
      >
      <span class="input-icon-container">
        <svg class="bin-edit-subtask-icon" onclick="deleteSavedSubTask(${subtaskSavedCounter}, '${subtask}')" width="22" height="22" viewBox="0 0 24 24" fill="#2A3647" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_314135_4497" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
            <rect width="24" height="24"/>
          </mask>
          <g mask="url(#mask0_314135_4497)">
            <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"/>
          </g>
        </svg>
        <div class="seperator-pen-bin"></div>
        <svg class="check-edit-subtask-icon" onclick="saveEditedSubtask(${subtaskSavedCounter})" width="18" height="18" viewBox="0 0 38 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.02832 15.0001L15.2571 26.0662L33.9717 3.93408" stroke="#2A3647" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </div>
  `;
}

function circleAssignedToTemplate(i, circleClasses, initials, name) {
  return `
  <div class="task-board-big-first-contact">
    <span class="${circleClasses[i]}">${initials}</span>
    <p class="task-board-big-first-contact-name">${name}</p>
  </div>
  `;
}

function getEditSubtaskTemplate(taskKey, i, subtaskText) {
  return `
    <div onmouseenter="showIconsInEditSubtasks('${taskKey}', '${i}')" onmouseleave="hideIconsInEditSubtasks('${taskKey}', '${i}')"
        class="subtasks-board-first-task-edit" id="subtasks-board-first-task-edit${taskKey}${i}">
      <div class="bullet-subtask-flexbox">
        <div class="subtask-bullet-margin-right">•</div>
        <span id="subtask-task-text-edit${taskKey}${i}">${subtaskText}</span>
        <svg onclick="changeSubtaskContent('${taskKey}', '${i}', '${subtaskText}')"
             id="edit-pencil-icon${taskKey}${i}" class="edit-pencil-icon"
             width="25" height="25" viewBox="0 0 33 32" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_313493_6285" style="mask-type:alpha"
                maskUnits="userSpaceOnUse" x="0" y="0" width="33" height="32">
            <rect x="0.5" width="32" height="32" fill="#D9D9D9"/>
          </mask>
          <g mask="url(#mask0_313493_6285)">
            <path d="M7.16667 25.3332H9.03333L20.5333 13.8332L18.6667 11.9665L7.16667 23.4665V25.3332ZM26.2333 11.8998L20.5667 6.29984L22.4333 4.43317C22.9444 3.92206 23.5722 3.6665 24.3167 3.6665C25.0611 3.6665 25.6889 3.92206 26.2 4.43317L28.0667 6.29984C28.5778 6.81095 28.8444 7.42761 28.8667 8.14984C28.8889 8.87206 28.6444 9.48873 28.1333 9.99984L26.2333 11.8998ZM24.3 13.8665L10.1667 27.9998H4.5V22.3332L18.6333 8.19984L24.3 13.8665Z" fill="#2A3647"/>
          </g>
        </svg>
        <div id="seperator-for-subtasks${taskKey}${i}" class="seperator-for-subtasks"></div>
        <svg onclick="cancelEditSubtask('${taskKey}', '${i}')" id="waste-icon${taskKey}${i}" class="waste-icon"
             width="23" height="23" viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_314135_4497" style="mask-type:alpha"
                maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
            <rect width="24" height="24" fill="#D9D9D9"/>
          </mask>
          <g mask="url(#mask0_314135_4497)">
            <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"/>
          </g>
        </svg>
      </div>
    </div>
  `;
}
