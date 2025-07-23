const taskTitel = document.getElementById("titleInput");
const taskDescription = document.getElementById("inputfield-description");
const taskDueDate = document.getElementById("dueDateInput");
const taskPriorityUrgent = document.getElementById("arrow-container-red");
const taskPriorityMedium = document.getElementById("arrow-container-orange");
const taskPriorityLow = document.getElementById("arrow-container-green");
const taskAssignedTo = document.getElementById("inputfield-text-assign");
const taskAssignedContacts = document.getElementById("contacts-dropdown");
const taskCategory = document.getElementById("category-input");
const taskSubtask = document.getElementById("inputfield-subtask-assign");

function openOverlay() {
    const overlay = document.getElementById("overlay");
    overlay.classList.add("overlay-visible");
  
    overlay.onclick = function (event) {
      if (event.target === overlay) {
        closeOverlay();
      }
    };
  
    const overlayContent = document.getElementById("content-add-task-overlay");
    overlayContent.innerHTML = `
  <div id="overlay-content" class="overlay-content" onclick="event.stopPropagation()">
  <div class="container-both-sides">
  <div class="add-task-text-box">
  <h2>Add Task</h2>
  </div>
  
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
                      <button onclick="toggleRed(this)" class="arrow-container-red">
                          <h4>Urgent</h4>
                          <img class="arrow-red" src="./assets/icons/double-arrow-up-14221.png"
                              alt="red-arrow">
                      </button>
                  </div>
  
                  <input type="text" placeholder="Medium =" class="text-inputfield-medium">
  
                  <div class="arrow-container-main-green">
                      <button onclick="toggleGreen(this)"class="arrow-container-green">
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
  
  <div class="clear-create-container">
    <div class="clear-field">
      <div class="clear-text">Cancel</div>
      <img class="close-button" src="./assets/icons/close.png" alt="close-icon">
    </div>
  
    <div class="create-field">
          <div class="text-create-field">Create Task</div>
          <img class="check-button" src="./assets/icons/check.png" alt="check-button">
          </div>
          </div>
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
  }
  
  function closeOverlay() {
    const overlay = document.getElementById("overlay");
    if (overlay) {
      overlay.classList.remove("overlay-visible");
    }
  }
  
  function overlayToDo() {
    const overlayToDoContainer = document.getElementById("overlay-todo");
    overlayToDoContainer.classList.add("overlay-visible");
  
    overlayToDoContainer.onclick = function (event) {
      if (event.target === overlayToDoContainer) {
        closeOverlayToDo();
      }
    };
  
    const overlayContentToDo = document.getElementById(
      "content-add-task-overlay-todo"
    );
    overlayContentToDo.innerHTML = `
           <div id="overlay-content" class="overlay-content" onclick="event.stopPropagation()">
  <div class="container-both-sides">
  <div class="add-task-text-box">
  <h2>Add Task</h2>
  </div>
  
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
                      <button onclick="toggleRed(this)" class="arrow-container-red">
                          <h4>Urgent</h4>
                          <img class="arrow-red" src="./assets/icons/double-arrow-up-14221.png"
                              alt="red-arrow">
                      </button>
                  </div>
  
                  <input type="text" placeholder="Medium =" class="text-inputfield-medium">
  
                      <div class="arrow-container-main-green">
                          <button onclick="toggleGreen(this)"class="arrow-container-green">
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
  
  <div class="clear-create-container">
  <div class="clear-field">
  <div class="clear-text">Cancel</div>
  <img class="close-button" src="./assets/icons/close.png" alt="close-icon">
  </div>
  
  <div class="create-field">
  <div class="text-create-field">Create Task</div>
  <img class="check-button" src="./assets/icons/check.png" alt="check-button">
  </div>
  </div>
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
  }
  
  function closeOverlayToDo() {
    const overlayToDo = document.getElementById("overlay-todo");
    if (overlayToDo) {
      overlayToDo.classList.remove("overlay-visible");
    }
  }
  
  function openOverlayInProgress() {
    const overlayInProgress = document.getElementById("overlay-in-progress");
    overlayInProgress.classList.add("overlay-visible");
  
    overlayInProgress.onclick = function (event) {
      if (event.target === overlayInProgress) {
        closeOverlayInProgress();
      }
    };
  
    const overlayContentProgress = document.getElementById(
      "content-add-task-overlay-in-progress"
    );
    overlayContentProgress.innerHTML = `
           <div id="overlay-content" class="overlay-content" onclick="event.stopPropagation()">
  <div class="container-both-sides">
  <div class="add-task-text-box">
  <h2>Add Task</h2>
  </div>
  
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
                      <button onclick="toggleRed(this)" class="arrow-container-red">
                          <h4>Urgent</h4>
                          <img class="arrow-red" src="./assets/icons/double-arrow-up-14221.png"
                              alt="red-arrow">
                      </button>
                  </div>
  
                  <input type="text" placeholder="Medium =" class="text-inputfield-medium">
  
                  <div class="arrow-container-main-green">
                      <button onclick="toggleGreen(this)"class="arrow-container-green">
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
  
  <div class="clear-create-container">
  <div class="clear-field">
  <div class="clear-text">Cancel</div>
  <img class="close-button" src="./assets/icons/close.png" alt="close-icon">
  </div>
  
  <div class="create-field">
  <div class="text-create-field">Create Task</div>
  <img class="check-button" src="./assets/icons/check.png" alt="check-button">
  </div>
  </div>
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
  }
  
  function closeOverlayInProgress(event) {
    document
      .getElementById("overlay-in-progress")
      .classList.remove("overlay-visible");
  }
  
  function openOverlayFeedback() {
    const openOverlayAwaitFeedback = document.getElementById(
      "overlay-await-feedback"
    );
    openOverlayAwaitFeedback.classList.add("overlay-visible");
    let overlayAwaitFeedback = document.getElementById(
      "content-add-task-overlay-await-feedback"
    );
    overlayAwaitFeedback.innerHTML += `
      <div id="overlay-content" class="overlay-content" onclick="event.stopPropagation()">
  <div class="container-both-sides">
  <div class="add-task-text-box">
  <h2>Add Task</h2>
  </div>
  
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
                      <button onclick="toggleRed(this)" class="arrow-container-red">
                          <h4>Urgent</h4>
                          <img class="arrow-red" src="./assets/icons/double-arrow-up-14221.png"
                              alt="red-arrow">
                      </button>
                  </div>
  
                  <input type="text" placeholder="Medium =" class="text-inputfield-medium">
  
                  <div class="arrow-container-main-green">
                      <button onclick="toggleGreen(this)"class="arrow-container-green">
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
  
  <div class="clear-create-container">
  <div class="clear-field">
  <div class="clear-text">Cancel</div>
  <img class="close-button" src="./assets/icons/close.png" alt="close-icon">
  </div>
  
  <div class="create-field">
  <div class="text-create-field">Create Task</div>
  <img class="check-button" src="./assets/icons/check.png" alt="check-button">
  </div>
  </div>
  </div>
  </div>
  </div>
        `;
  
    // Animation erneut triggern (falls mehrfach geöffnet)
    const contentAwait = openOverlayAwaitFeedback.querySelector(
      ".overlay-await-feedback-contentAwait"
    );
    contentAwait.style.animation = "none";
    void contentAwait.offsetWidth; // Reflow erzwingen
    contentAwait.style.animation = "";
    contentAwait.classList.add("slide-in");
  }
  
  function closeOverlayFeedback(event) {
    document
      .getElementById("overlay-await-feedback")
      .classList.remove("overlay-visible");
  }
  
  function selectContacts() {
    const dropdown = document.getElementById("contacts-dropdown");
    dropdown.classList.toggle("hidden");
  }
  
  function toggleRed(button) {
    button.classList.toggle("active");
  }
  
  function toggleOrange(button) {
    button.classList.toggle("active");
  }
  
  function toggleGreen(button) {
    button.classList.toggle("active");
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

  function getInfoForNewTask() {
    let titel = taskTitel.value;
    let description = taskDescription.value;
    let dueDate = taskDueDate.value;
    let priority = getPriorityForNewTask();
    let assignedTo = taskAssignedContacts.checked ? taskAssignedTo.textContent : null;
    let category = taskCategory.value;
    let subtask = taskSubtask.value || null;
    return { titel, description, dueDate, priority, assignedTo, category, subtask };
  }

function clearInputFieldsForNewTask() {
    const contacts = document.getElementsByClassName("contact-checkbox");
    taskTitel.value = "";
    taskDescription.value = "";
    taskDueDate.value = "";
    taskPriorityUrgent.classList.remove("active");
    taskPriorityMedium.classList.remove("active");
    taskPriorityLow.classList.remove("active");
    taskAssignedTo.value = "";
    taskCategory.value = "";
    taskSubtask.value = "";
    for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    contact.checked = false;
    }
}

  function getPriorityForNewTask() {
    if (taskPriorityUrgent.classList.contains("active")) {
      return "Urgent";
    } else if (taskPriorityMedium.classList.contains("active")) {
      return "Medium";
    } else if (taskPriorityLow.classList.contains("active")) {
      return "Low";
    } else {
      return "No priority selected";
    }
  }

  async function postNewTaskToFirebase() {
    if (taskTitel.value && taskDueDate.value) {
        const inputsForTask = getInfoForNewTask();
        const newTaskNumber = await getTaskCountAndSmallestNumber()
        const newTaskKey = "task" + newTaskNumber;
        const dataPost = await putRegistryDataBaseFunction("tasks/" + newTaskKey, inputsForTask);
        clearInputFieldsForNewTask();
        console.log(dataPost);
    } else if (!taskTitel.value) {
        alert("Please enter a title for the task.");
    } else if (!taskDueDate.value) {
        alert("Please enter a due date for the task.");
    }
  }

async function putRegistryDataBaseFunction(path= "", data= {}) {
  let response = await fetch (FireBaseUrl + path + ".json", {
    method : "PUT",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(data)
  });
  return responseToJson = await response.json();
}

async function getTaskCountAndSmallestNumber() {
  let response = await fetch(FireBaseUrl + "tasks.json");
  let data = await response.json();
  if (!data) return 1;
  const usedNumbers = Object.keys(data)
    .map(key => parseInt(key.replace('task', '')))
    .sort((a, b) => a - b);
  let freeNumber = 1;
  for (let i = 0; i < usedNumbers.length; i++) {
    let num = usedNumbers[i];
    if (num !== freeNumber) {
        break;
    }
    freeNumber++;
}
  return freeNumber;
}

async function initAddTask() {
    await loadDataSignUp();
}