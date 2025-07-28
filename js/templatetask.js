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
  <div class="main-container-middle-part" id="main-container-middle-part${taskKey}">
    <div id="todo-content-box" class="todo-content-box">
      <div class="user-story-box">
        <span>${task.category}</span>
      </div>

      <div class="text-contact-box">
        <span>${task.titel}</span>

          <div class="text-create-box">
            <span>${task.description}</span>
          </div>
      </div>
      <div class="progressbar-box">
        <div class="progressbar-content">
        </div>

        <div class="subtask-text">
          0/2 subtasks
        </div>
      </div>

      <div class="three-circle-todo">
        <div class="three-circle-container">
          <div class="single-circle-first">
            <h5>AS</h5>
          </div>

          <div class="single-circle-second">
            <h5>DE</h5>
          </div>

          <div class="single-circle-third">
            <h5>EF</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}