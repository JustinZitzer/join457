function getTaskOverlayTemplate() {
    return `
  <div id="overlay-content" class="overlay-content-board" onclick="event.stopPropagation()">
    <div class="container-both-sides-board">
      <div class="add-task-text-box-board">
        <h2>Add Task</h2>
      </div>
      <div class="inputfield-box-left-side-board">
        <div class="text-title-board">
          <div class="text-title-mark-board">
            <span>Title</span>
          </div>
          <input type="text" placeholder="Enter a title" class="title-inputfield-enter-title-board">
        </div>
        <div class="description-main-box-board">
          <div class="description-text-board">
            <span>Description</span>
            <input type="text" placeholder="Enter Description" class="inputfield-description-board">
          </div>
          <div class="inputfield-due-date-container-board">
            <img class="calendar-clock-board" src="./assets/icons/calendar_clock.png" alt="clock-calendar">
            <div class="due-date-mark-board">
              <span>Due date</span>
            </div>
            <input type="text" placeholder="dd/mm/yyy" class="due-date-text-field-board">
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
                <button onclick="toggleRed(this)" class="arrow-container-red-board">
                  <h4>Urgent</h4>
                  <img class="arrow-red-board" src="./assets/icons/double-arrow-up-14221.png" alt="red-arrow">
                </button>
              </div>
              <input type="text" placeholder="Medium =" class="text-inputfield-medium-board">
              <div class="arrow-container-main-green-board">
                <button onclick="toggleGreen(this)" class="arrow-container-green-board">
                  <h5>Low</h5>
                  <img class="arrow-green-board" src="./assets/icons/double-arrow-down-14228.png" alt="green-arrow">
                </button>
              </div>
            </div>
          </div>
          <div class="assigned-inputfield-box-board">
            <span>Assigned to</span>
            <input type="text" placeholder="Select contacts to assign" class="inputfield-text-assign-board">
            <img class="assigned-arrow-icon-board" src="./assets/icons/arrow_drop_down.png" alt="assigned-arrow-button">
          </div>
          <div class="task-inputfield-box-board">
            <div class="category-mark-board">
              <span>Category</span>
            </div>
            <input type="text" placeholder="Select task category" class="inputfield-category-assign-board">
            <img class="assigned-arrow-icon-down-board" src="./assets/icons/arrow_drop_down.png" alt="assigned-arrow-button">
          </div>
          <div class="subtask-inputfield-box-board">
            <span>Subtasks</span>
            <div class="subtask-inputfield-container-board">
              <img class="add-icon-container-board" src="./assets/icons/subtask-plus-icon.svg" alt="subtask-plus-icon">
              <input type="text" placeholder="Add new subtask" class="inputfield-subtask-assign-board">
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
    <div id="todo-content-box${taskKey}" class="todo-content-box" draggable="true" ondragstart="startDragging('${taskKey}', '${task.category}')">
      <div class="user-story-box">
        <span>${task.categoryUserOrTechnicalTask}</span>
      </div>
      <div class="text-contact-box">
        <span>${task.titel}</span>
        <div class="text-create-box">
          <span>${task.description}</span>
        </div>
      </div>
      <div class="progressbar-box">
        <div class="progressbar-content"></div>
        <div class="subtask-text">0/2 subtasks</div>
      </div>
      <div class="three-circle-todo">
        <div class="three-circle-container">
          <div class="single-circle-first"><h5>AS</h5></div>
          <div class="single-circle-second"><h5>DE</h5></div>
          <div class="single-circle-third"><h5>EF</h5></div>
        </div>
      </div>
    </div>
  `;
}

function getSubtaskListElementTemplate(subtask, subtaskSavedCounter) {
  return `
    <li class="subtask-list-element" id="subtask-${subtaskSavedCounter}">
      <div class="subtask-list-element-div" id="subtask-list-element-div${subtaskSavedCounter}">
        • ${subtask}
        <div class="pen-and-bin-container">
          <svg onclick="editSavedSubtask(${subtaskSavedCounter}, '${subtask.replace(/'/g, "\\'")}')" width="25" height="25" viewBox="0 0 33 32" fill="#2A3647" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_313493_6285" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="33" height="32">
              <rect x="0.5" width="32" height="32"/>
            </mask>
            <g mask="url(#mask0_313493_6285)">
              <path d="M7.16667 25.3332H9.03333L20.5333 13.8332L18.6667 11.9665L7.16667 23.4665V25.3332ZM26.2333 11.8998L20.5667 6.29984L22.4333 4.43317C22.9444 3.92206 23.5722 3.6665 24.3167 3.6665C25.0611 3.6665 25.6889 3.92206 26.2 4.43317L28.0667 6.29984C28.5778 6.81095 28.8444 7.42761 28.8667 8.14984C28.8889 8.87206 28.6444 9.48873 28.1333 9.99984L26.2333 11.8998ZM24.3 13.8665L10.1667 27.9998H4.5V22.3332L18.6333 8.19984L24.3 13.8665Z" fill="#2A3647"/>
            </g>
          </svg>
          <div class="seperator-pen-bin"></div>
          <svg onclick="deleteSavedSubTask(${subtaskSavedCounter}, '${subtask}')" width="24" height="24" viewBox="0 0 24 24" fill="#2A3647" xmlns="http://www.w3.org/2000/svg">
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
