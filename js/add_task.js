  const toDoContent = document.getElementById("todo-content-box");
  const toDoContentFinalDiv = document.getElementById("todo-content-task");
  const inProgressContent = document.getElementById("inprogress-content-task");
  const awaitFeedbackContent = document.getElementById("await-feedback-content-task");
  const doneContent = document.getElementById("done-content-task");
  const arrowContainerRed = document.getElementById("arrow-container-red");
  const arrowContainerOrange = document.getElementById("arrow-container-orange");
  const arrowContainerGreen = document.getElementById("arrow-container-green");

function openOverlay() {
    const overlay = document.getElementById("overlay");
    overlay.classList.add("overlay-visible");
    overlay.classList.remove("overlay-hidden"); // Overlay hidden wurde in dieser function nicht entfernt. 
  
    overlay.onclick = function (event) {
      if (event.target === overlay) {
        closeOverlay();
      }
    };
    
    if (window.innerWidth > 1400) {
    const overlayContent = document.getElementById("content-add-task-overlay");
    overlayContent.innerHTML = `
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
  
      const content = document.getElementById("overlay-content");
      if (content) {
        content.style.animation = "none";
        void content.offsetWidth;
        content.style.animation = "";
        content.classList.add("slide-in");
      }
    } else {
      window.location.href='./add_task.html'
    }
}
  
function closeOverlay() {
    const overlay = document.getElementById("overlay");
    if (overlay) {
      overlay.classList.add("overlay-hidden");
    }
}
  
function overlayToDo() {
    const overlayToDoContainer = document.getElementById("overlay-todo");
    overlayToDoContainer.classList.remove("overlay-hidden");
    overlayToDoContainer.classList.add("overlay-visible");
  
    overlayToDoContainer.onclick = function (event) {
      if (event.target === overlayToDoContainer) {
        closeOverlayToDo();
      }
    };
  
    const overlayContentToDo = document.getElementById(
      "content-add-task-overlay-todo"
    );
    if (window.innerWidth > 1400) {

    overlayContentToDo.innerHTML = `
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
  
    const content = document.getElementById("overlay-content-todo");
    if (content) {
      content.style.animation = "none";
      void content.offsetWidth;
      content.style.animation = "";
      content.classList.add("slide-in");
    }
  } else {
    window.location.href='./add_task.html';
  }
}
  
function closeOverlayToDo() {
    const overlayToDo = document.getElementById("overlay-todo");
    if (overlayToDo) {
      overlayToDo.classList.remove("overlay-visible");
      overlayToDo.classList.add("overlay-hidden");
    }
}
  
function openOverlayInProgress() {
    const overlayInProgress = document.getElementById("overlay-in-progress");
    overlayInProgress.classList.add("overlay-visible");
    overlayInProgress.classList.remove("overlay-hidden");
  
    overlayInProgress.onclick = function (event) {
      if (event.target === overlayInProgress) {
        closeOverlayInProgress();
      }
    };
  
    const overlayContentProgress = document.getElementById(
      "content-add-task-overlay-in-progress"
    );
    if (window.innerWidth > 1400) {
    overlayContentProgress.innerHTML = `
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
  
    const content = document.getElementById("overlay-content-progress");
    if (content) {
      content.style.animation = "none";
      void content.offsetWidth;
      content.style.animation = "";
      content.classList.add("slide-in");
    }
  } else {
      window.location.href='./add_task.html';
    }
}
  
function closeOverlayInProgress(event) {
    document
      .getElementById("overlay-in-progress")
      .classList.remove("overlay-visible");
    document
      .getElementById("overlay-in-progress")
      .classList.add("overlay-hidden");
}
  
function openOverlayFeedback() {
    const openOverlayAwaitFeedback = document.getElementById(
      "overlay-await-feedback"
    );
    openOverlayAwaitFeedback.classList.add("overlay-visible");
    openOverlayAwaitFeedback.classList.remove("overlay-hidden");
    let overlayAwaitFeedback = document.getElementById(
      "content-add-task-overlay-await-feedback"
    );
    if (window.innerWidth > 1400) {
    overlayAwaitFeedback.innerHTML += `
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
  
    // Animation erneut triggern (falls mehrfach geöffnet)
    const contentAwait = openOverlayAwaitFeedback.querySelector(
      ".overlay-await-feedback-contentAwait"
    );
    overlayAwaitFeedback.style.animation = "none";
    void overlayAwaitFeedback.offsetWidth; // Reflow erzwingen
    overlayAwaitFeedback.style.animation = "";
    overlayAwaitFeedback.classList.add("slide-in");
  } else  {
    window.location.href='./add_task.html';
  }
}
  
function closeOverlayFeedback(event) {
    document
      .getElementById("overlay-await-feedback")
      .classList.remove("overlay-visible");
    document
      .getElementById("overlay-await-feedback")
      .classList.add("overlay-hidden");
}
  
function selectContacts() {
    const fieldRequiered = document.getElementById("field-required");
    const windowWidth = window.innerWidth;
    const dropdown = document.getElementById("contacts-dropdown");
    const isHidden = dropdown.classList.contains("hidden");
    dropdown.classList.toggle("hidden");
    if (windowWidth <= 1400) {
        if (isHidden) {
        fieldRequiered.style.top = "1100px";
        } else {
        fieldRequiered.style.top = "870px";
        }
    }
}
  
function togglePriority(button) {
  const anyActive = arrowContainerRed.classList.contains("active") || arrowContainerOrange.classList.contains("active")
  || arrowContainerGreen.classList.contains("active");

  if (button.classList.contains("active")) {
    button.classList.remove("active");
  } else if (anyActive) {
    arrowContainerRed.classList.remove("active");
    arrowContainerOrange.classList.remove("active");
    arrowContainerGreen.classList.remove("active");
    button.classList.add("active");
  } else {
    button.classList.add("active");
  }
}
  
function toggleDropdown() {
    var dropdown = document.getElementById("category-dropdown");
    if (dropdown.classList.contains("dropdown-open")) {
      dropdown.classList.remove("dropdown-open");
    } else {
      dropdown.classList.add("dropdown-open");
    }
}
  
function selectCategory(category) {
    var input = document.getElementById("category-input");
    input.value = category;
  
    var dropdown = document.getElementById("category-dropdown");
    dropdown.classList.remove("dropdown-open");
}
  
function validateInput() {
    const input = document.getElementById("titleInput");
    const errorMsg = document.getElementById("error-message");
  
    if (input.value.trim() === "") {
      errorMsg.textContent = "This field is required.";
      errorMsg.style.display = "block";
      input.classList.add("input-error");
    } else {
      errorMsg.textContent = "";
      errorMsg.style.display = "none";
      input.classList.remove("input-error");
    }
}
  
function validateDueDateInput() {
    const input = document.getElementById("dueDateInput");
    const errorMsg = document.getElementById("due-date-error");
  
    if (input.value.trim() === "") {
      errorMsg.textContent = "This field is required.";
      errorMsg.style.display = "block";
      input.classList.add("input-error");
    } else {
      errorMsg.textContent = "";
      errorMsg.style.display = "none";
      input.classList.remove("input-error");
    }
}

let currentDraggedElement;

let todosArray = [{
  'id' : '0',
  'content' : 'To do task',
  'category' : 'todo'
}, {
  'id' : '1',
  'content' : 'To do Task 2',
  'category' : 'todo'
},  {
  'id' : '2',
  'content' : 'Task 3',
  'category' : 'inprogress'
}, {
  'id' : '3',
  'content' : 'Task 4',
  'category' : 'await-feedback'
}, {
  'id' : '4',
  'content' : 'Task 5',
  'category' : 'done'
}];

function updateTasksHtml() {
  const { toDoTasks, inProgressTasks, awaitFeedbackTasks, doneTasks } = filterTasksByCategory();

  const tasksArrays = [toDoTasks, inProgressTasks, awaitFeedbackTasks, doneTasks];
  const containers = [toDoContentFinalDiv, inProgressContent, awaitFeedbackContent, doneContent];

  clearTaskDivsForUpdatingHtml();

  for (let c = 0; c < tasksArrays.length; c++) {
    const tasks = tasksArrays[c];
    const container = containers[c];

    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      container.innerHTML += generateToDoTaskHtml(task);
    }
  }
}

function filterTasksByCategory() {
  let toDoTasks = todosArray.filter(todo => todo['category'] == 'todo');
  let inProgressTasks = todosArray.filter(inprogress => inprogress['category'] == 'inprogress');
  let awaitFeedbackTasks = todosArray.filter(awaitfeedback => awaitfeedback['category'] == 'await-feedback');
  let doneTasks = todosArray.filter(done => done['category'] == 'done');
  return {toDoTasks, inProgressTasks, awaitFeedbackTasks, doneTasks};
}

function clearTaskDivsForUpdatingHtml() {
  toDoContentFinalDiv.innerHTML = '';
  inProgressContent.innerHTML = '';
  awaitFeedbackContent.innerHTML = '';
  doneContent.innerHTML = '';
}

function generateToDoTaskHtml(task) {
  return `<div ondragstart="startDragging(${task['id']})" draggable="true" class="generate-task">${task['content']}</div>`;
}

function startDragging(taskId) {
  currentDraggedElement = taskId;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(category) {
  todosArray[currentDraggedElement]['category'] = category;
  updateTasksHtml();
}

function getContactCardForDropdown(contact) {
  const name = contact.lastName
    ? `${contact.firstName} ${contact.lastName}`
    : contact.firstName;
  return `
    <label class="contact-option">
      <span>${name}</span>
      <input id="contact-${contact.id}" type="checkbox" class="contact-checkbox" data-contact-id="${contact.id || ''}">
    </label>
  `;
}

async function loadContactsForDropdown() {
  const container = document.getElementById('contacts-dropdown');
  container.innerHTML = "";
  try {
    const contactsUnsorted = await fetchContacts();
    const contacts = Object.values(contactsUnsorted);
    contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
    allContacts = contacts;
    for (const key in contacts) {
      container.innerHTML += getContactCardForDropdown(contacts[key]);
    }
  } catch (error) {console.error("Error loading contacts:", error);}
  selectContacts();
}