const toDoContent = document.getElementById("todo-content-box");
const toDoContentFinalDiv = document.getElementById("todo-content-task");
const bigTaskDiv = document.getElementById("task-big-container");
const inProgressContent = document.getElementById("inprogress-content-task");
const awaitFeedbackContent = document.getElementById("await-feedback-content-task");
const doneContent = document.getElementById("done-content-task");
const arrowContainerRed = document.getElementById("arrow-container-red");
const arrowContainerOrange = document.getElementById("arrow-container-orange");
const arrowContainerGreen = document.getElementById("arrow-container-green");
const taskTitel = document.getElementById("titleInput");
const taskDescription = document.getElementById("inputfield-description");
const taskDueDate = document.getElementById("dueDateInput");
const taskPriorityUrgent = document.getElementById("arrow-container-red");
const taskPriorityMedium = document.getElementById("arrow-container-orange");
const taskPriorityLow = document.getElementById("arrow-container-green");
const taskCategory = document.getElementById("category-input");
const taskSubtask = document.getElementById("inputfield-subtask-assign");
const savedSubtasks = document.getElementById("subtask-added-tasks");
const subtaskInputFieldContainer = document.getElementById("subtask-inputfield-container");
const inputFieldAssignTo = document.getElementById("inputfield-text-assign");
const circleFlexContainer = document.getElementById("three-circle-todo");
const circleRenderContainer = document.getElementById("three-circle-container");
const contactsDropdown = document.getElementById("contacts-dropdown");
let subtaskSavedCounter = 1;
let todosArray = [];
let fullTaskInfoArray = [];

const taskTitel1 = document.getElementById("titleInput1");
const taskDescription1 = document.getElementById("inputfield-description1");
const taskDueDate1 = document.getElementById("dueDateInput1");
const inputFieldAssignTo1 = document.getElementById("inputfield-text-assign1");
const taskCategory1 = document.getElementById("category-input1");
const subtaskInputFieldContainer1 = document.getElementById("subtask-inputfield-container1");
const taskSubtask1 = document.getElementById("inputfield-subtask-assign1");

function openOverlay() {
  const overlay = document.getElementById("overlay");
  overlay.classList.remove("overlay-hidden");
  overlay.classList.add("overlay-visible");

  // Optional: Animation oder Template laden
  if (window.innerWidth > 1400) {
    const overlayContent = document.getElementById("content-add-task-overlay");
    overlayContent.innerHTML = getTaskOverlayTemplate();


    // Animation (falls definiert)
    const content = document.getElementById("content-add-task-overlay");
    if (content) {
      content.style.animation = "none";
      void content.offsetWidth;
      content.style.animation = "";
      content.classList.add("slide-in");
    }
  } else {
    window.location.href = "./add_task.html";
  }
}


function closeOverlay() {
  const overlay = document.getElementById("overlay");
  overlay.classList.remove("overlay-visible");
  overlay.classList.add("overlay-hidden");
}

// Klick auf das Overlay-Hintergrund
if (window.location.pathname.endsWith("board.html")) {
  document.getElementById("overlay").addEventListener("click", closeOverlay);
}

// Klick auf das Inhaltselement wird gestoppt (wichtig!)
if (window.location.pathname.endsWith("board.html")) {
document
  .getElementById("content-add-task-overlay")
  .addEventListener("click", function (event) {
    event.stopPropagation();
  });
  
}

function openOverlay() {
  const overlay = document.getElementById("overlay");
  overlay.classList.remove("overlay-hidden");
  overlay.classList.add("overlay-visible");

  if (window.innerWidth > 1400) {
    const overlayContent = document.getElementById("content-add-task-overlay");
    overlayContent.innerHTML = getTaskOverlayTemplate();

    // Slide-in starten
    overlayContent.classList.add("slide-in");

    // ❗️ Jetzt existiert das X-Button-Element – Listener hier hinzufügen:
    const closeButton = document.querySelector(".x-close-button-add-task-overlay");
    if (closeButton) {
      closeButton.addEventListener("click", function () {
        overlayContent.classList.remove("slide-in");
        overlayContent.classList.add("slide-out");

        setTimeout(function () {
          overlay.classList.remove("overlay-visible");
          overlay.classList.add("overlay-hidden");
          overlayContent.classList.remove("slide-out");
        }, 300);
      });
    }
  } else {
    window.location.href = "./add_task.html";
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
    overlayContentToDo.innerHTML = getTaskOverlayTemplate();

    const content = document.getElementById("overlay-content-todo");
    if (content) {
      content.style.animation = "none";
      void content.offsetWidth;
      content.style.animation = "";
      content.classList.add("slide-in");
    }
  } else {
    window.location.href = "./add_task.html";
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
    overlayContentProgress.innerHTML = getTaskOverlayTemplate();

    const content = document.getElementById("overlay-content-progress");
    if (content) {
      content.style.animation = "none";
      void content.offsetWidth;
      content.style.animation = "";
      content.classList.add("slide-in");
    }
  } else {
    window.location.href = "./add_task.html";
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
    overlayAwaitFeedback.innerHTML = getTaskOverlayTemplate();

    // Animation erneut triggern (falls mehrfach geöffnet)
    const contentAwait = openOverlayAwaitFeedback.querySelector(
      ".overlay-await-feedback-contentAwait"
    );
    overlayAwaitFeedback.style.animation = "none";
    void overlayAwaitFeedback.offsetWidth; // Reflow erzwingen
    overlayAwaitFeedback.style.animation = "";
    overlayAwaitFeedback.classList.add("slide-in");
  } else {
    window.location.href = "./add_task.html";
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
  const anyActive =
    arrowContainerRed.classList.contains("active") ||
    arrowContainerOrange.classList.contains("active") ||
    arrowContainerGreen.classList.contains("active");

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
  const taskSubtask = document.getElementById("inputfield-subtask-assign");
  var dropdown = document.getElementById("category-dropdown");
  if (dropdown.classList.contains("dropdown-open")) {
    dropdown.classList.remove("dropdown-open");
    setTimeout(() => {
      dropdown.classList.add("display-none");
    }, 300);
    taskSubtask.style.borderBottom = "1px solid #29ABE2";
    taskSubtask.style.borderRight = "1px solid #29ABE2";
    taskSubtask.style.borderTop = "none";
    validateGetCategoryForNewTask();
  } else {
    dropdown.classList.remove("display-none");
    setTimeout(() => {
      dropdown.classList.add("dropdown-open");
    }, 1);
    if (taskSubtask.value.trim() !== "") {
      taskSubtask.style.borderTop = "1px solid #29ABE2";
      taskSubtask.style.borderRight = "1px solid #29ABE2";
      taskSubtask.style.borderBottom = "none";
    }
  }
}

function toggleDropdownOverlay() {
  const taskSubtask = document.getElementById("inputfield-subtask-assign1");
  var dropdown = document.getElementById("category-dropdown");
  if (dropdown.classList.contains("dropdown-open")) {
    dropdown.classList.remove("dropdown-open");
    setTimeout(() => {
      dropdown.classList.add("display-none");
    }, 300);
    taskSubtask.style.borderBottom = "1px solid #29ABE2";
    taskSubtask.style.borderRight = "1px solid #29ABE2";
    taskSubtask.style.borderTop = "none";
    validateGetCategoryForNewTask();
  } else {
    dropdown.classList.remove("display-none");
    setTimeout(() => {
      dropdown.classList.add("dropdown-open");
    }, 1);
    if (taskSubtask.value.trim() !== "") {
      taskSubtask.style.borderTop = "1px solid #29ABE2";
      taskSubtask.style.borderRight = "1px solid #29ABE2";
      taskSubtask.style.borderBottom = "none";
    }
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


function selectCategoryOverlay(category) {
  var input = document.getElementById("category-input1");
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

function validateInputOverlay() {
  const input = document.getElementById("titleInput1");
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
  const value = input.value.trim();

  const dateCheckSlash =
    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

  if (!value) {
    showError("This field is required.");
  } else if (!dateCheckSlash.test(value)) {
    showError("Bitte gib ein gültiges Datum im Format TT.MM.JJJJ ein.");
  } else {
    clearError();
  }

  function showError(message) {
    errorMsg.textContent = message;
    errorMsg.style.display = "block";
    input.classList.add("input-error");
  }

  function clearError() {
    errorMsg.textContent = "";
    errorMsg.style.display = "none";
    input.classList.remove("input-error");
  }
}

function validateDueDateInputOverlay() {
  const input = document.getElementById("dueDateInput1");
  const errorMsg = document.getElementById("due-date-error");
  const value = input.value.trim();

  const dateCheckSlash =
    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

  if (!value) {
    showError("This field is required.");
  } else if (!dateCheckSlash.test(value)) {
    showError("Bitte gib ein gültiges Datum im Format TT.MM.JJJJ ein.");
  } else {
    clearError();
  }

  function showError(message) {
    errorMsg.textContent = message;
    errorMsg.style.display = "block";
    input.classList.add("input-error");
  }

  function clearError() {
    errorMsg.textContent = "";
    errorMsg.style.display = "none";
    input.classList.remove("input-error");
  }
}

function getContactCardForDropdown(contact) {
  const name = contact.lastName
    ? `${contact.firstName} ${contact.lastName}`
    : contact.firstName;
  return `
    <label class="contact-option">
      <span id="contact-name-${contact.id}">${name}</span>
      <input id="contact-checkbox-${
        contact.id
      }" type="checkbox" class="contact-checkbox" data-contact-id="${
    contact.id || ""
  }">
    </label>
  `;
}

async function loadContactsForDropdown() {
  const container = document.getElementById("contacts-dropdown");
  if (!container) return;
  if (container.innerHTML === "") {
    try {
      const contactsUnsorted = await fetchContacts();
      const contacts = Object.values(contactsUnsorted);
      contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
      allContacts = contacts;
      for (const key in contacts) {
        container.innerHTML += getContactCardForDropdown(contacts[key]);
      }
    } catch (error) {
      console.error("Error loading contacts:", error);
    }
    selectContacts();
  } else {
    selectContacts();
  }
}

function changeinputFieldAssignToStyle() {
  if (inputFieldAssignTo.classList.contains("custom-border")) {
    inputFieldAssignTo.style.borderTop = "";
    inputFieldAssignTo.style.borderRight = "";
    inputFieldAssignTo.classList.remove("custom-border");
  } else {
    inputFieldAssignTo.style.borderTop = "1px solid #29ABE2";
    inputFieldAssignTo.style.borderRight = "1px solid #29ABE2";
    inputFieldAssignTo.classList.add("custom-border");
  }
}

function getInfoForNewTask() {
  
  let titel = taskTitel.value || "New Task";
  let description = taskDescription.value || "No description";
  let dueDate = taskDueDate.value;
  let priority = getPriorityForNewTask();
  let assignedTo = getAssignedToValue();
  let categoryUserOrTechnicalTask = getCategoryForNewTask();
  let subtasks = updateSubtasksArray() || "No subtasks";
  return {
    titel,
    description,
    dueDate,  
    priority,
    assignedTo,
    categoryUserOrTechnicalTask,
    subtasks,
  };
}

function getCategoryForNewTask() {
  const taskCategory = document.getElementById("category-input");

  if (!taskCategory.value == "") {
    return taskCategory.value;
  } else {
    alert("Please select a valid category: 'Technical Task' or 'User Story'");
  }
}

function validateGetCategoryForNewTask() {
  const taskCategory = document.getElementById("category-input");
  const fieldRequired = document.getElementById("error-field-category");
  if (taskCategory == "Technical Task" || taskCategory == "User Story") {
    return taskCategory.value;
  } else {
    fieldRequired.classList.remove("display-none");
  }
}

function getCategoryForNewTask() {
  const taskCategory = document.getElementById("category-input");

  if (!taskCategory.value == "") {
    return taskCategory.value;
  } else {
    alert("Please select a valid category: 'Technical Task' or 'User Story'");
  }
}

function validateGetCategoryForNewTask() {
  const taskCategory = document.getElementById("category-input");
  const fieldRequired = document.getElementById("error-field-category");
  if (taskCategory == "Technical Task" || taskCategory == "User Story") {
    return taskCategory.value;
  } else {
    fieldRequired.classList.remove("display-none");
  }
}

function addStyleForDropdownAnimation() {
  const dropdown = document.getElementById("category-dropdown");
  dropdown.classList.remove("display-none");
}

function updateSubtasksArray() {
  let subtasksArray = [];
  subtasksArray = [];

  for (let index = 0; index < subtaskSavedCounter; index++) {
    const subtaskElement = document.getElementById(`subtask-${index}`);
    const subtaskTextElement = document.getElementById(`subtask-list-element-div${index}`);
    const checkboxElement = document.getElementById(`subtask-checkbox${index}`);

    if (subtaskElement && subtaskTextElement && checkboxElement) {
      const subtask = subtaskTextElement.textContent.trim().replace("• ", "");
      const notChecked = false;
      subtasksArray.push({
        subtaskText: subtask,
        statusCheckbox: notChecked
      });
    }
  }
  return subtasksArray;
}

function addSubtaskInContainer() {
  const taskSubtask = document.getElementById("inputfield-subtask-assign");
  const savedSubtasks = document.getElementById("subtask-added-tasks");
  let subtask = taskSubtask.value.trim();

  if (subtask) {
    savedSubtasks.innerHTML += getSubtaskListElementTemplate(
      subtask,
      subtaskSavedCounter
    );
    subtaskSavedCounter++;
    taskSubtask.value = "";

    updateSubtasksArray();
  }
}

function hidePlusIconShowCheckAndCrossIcon() {
  const plusIcon = document.getElementById("add-icon-container");
  const checkIcon = document.getElementById("subtask-icon-cross");
  const separatorIcon = document.getElementById("subtask-icon-separator");
  const checkIconCheck = document.getElementById("subtask-icon-check");
  plusIcon.classList.add("display-none");
  checkIcon.classList.remove("display-none");
  separatorIcon.classList.remove("display-none");
  checkIconCheck.classList.remove("display-none");
}

function clearSubtaskInputField(event) {
  if (event) event.stopPropagation();
  const plusIcon = document.getElementById("add-icon-container");
  const checkIcon = document.getElementById("subtask-icon-cross");
  const separatorIcon = document.getElementById("subtask-icon-separator");
  const checkIconCheck = document.getElementById("subtask-icon-check");
  const taskSubtask = document.getElementById("inputfield-subtask-assign");
  taskSubtask.value = "";
  plusIcon.classList.remove("display-none");
  checkIcon.classList.add("display-none");
  separatorIcon.classList.add("display-none");
  checkIconCheck.classList.add("display-none");
}

function editSavedSubtask(subtaskSavedCounter, subtask) {
  const subTaskElement = document.getElementById(
    `subtask-list-element-div${subtaskSavedCounter}`
  );
  subTaskElement.innerHTML = getSubtaskEditInputFieldTemplate(
    subtask,
    subtaskSavedCounter
  );
}

function saveEditedSubtask(subtaskSavedCounter) {
  const input = document.getElementById(
    `edit-subtask-inputfield${subtaskSavedCounter}`
  );
  if (!input) return;
  const newValue = input.value;

  const subTaskElementDiv = document.getElementById(
    `subtask-list-element-div${subtaskSavedCounter}`
  );
  if (!subTaskElementDiv) return;
  const liElement = subTaskElementDiv.parentElement;

  liElement.outerHTML = getSubtaskListElementTemplate(
    newValue,
    subtaskSavedCounter
  );

  updateSubtasksArray();
}

function deleteSavedSubTask(subtaskSavedCounter, subtask) {
  const subTaskElement = document.getElementById(
    `subtask-${subtaskSavedCounter}`
  );
  if (subTaskElement) subTaskElement.remove();

  updateSubtasksArray();
}

function getAssignedToValue() {
  let assignedTo = [];
  for (let i = 0; i < allContacts.length; i++) {
    const contact = allContacts[i];
    const checkbox = document.getElementById(`contact-checkbox-${contact.id}`);
    const nameElem = document.getElementById(`contact-name-${contact.id}`);
    if (checkbox && checkbox.checked && nameElem) {
      assignedTo.push(nameElem.textContent.trim());
    }
  }
  if (assignedTo.length === 0) {
    assignedTo = ["Not Assigned to anyone"];
  }
  return assignedTo;
}

function getContactForCircle() {
  let assignedContacts = getAssignedToValue();
  assignedContacts = assignedContacts.filter(
    (contact) => contact !== "Not Assigned to anyone"
  );
  let nameInitialesArray = [];

  for (let i = 0; i < assignedContacts.length; i++) {
    const fullNames = assignedContacts[i].trim();
    const names = fullNames.split(" ");
    let initials = "";
    if (names[0]) initials += names[0][0].toUpperCase();
    if (names[1]) initials += names[1][0].toUpperCase();
    nameInitialesArray.push(initials);
  }
  renderCirclesForAssignedContacts(nameInitialesArray);
  return nameInitialesArray;
}

function renderCirclesForAssignedContacts(nameInitialesArray) {
  circleRenderContainer.innerHTML = "";
  if (
    nameInitialesArray.length == 0 ||
    nameInitialesArray.includes("Not Assigned to anyone")
  ) {
    circleFlexContainer.classList.add("display-none");
    return;
  } else if (!contactsDropdown.classList.contains("hidden")) {
    circleFlexContainer.classList.add("display-none");
    return;
  }

  const circleClasses = [
    "single-circle-first",
    "single-circle-second",
    "single-circle-third",
  ];
  for (let i = 0; i < Math.min(nameInitialesArray.length, 3); i++) {
    const initials = nameInitialesArray[i];
    circleRenderContainer.innerHTML += `
      <div class="${circleClasses[i]}">
        <h6>${initials}</h6>
      </div>
    `;
  }
  circleFlexContainer.classList.remove("display-none");
}

function clearInputFieldsForNewTask() {
  const contacts = document.getElementsByClassName("contact-checkbox");
  taskTitel.value = "";
  taskDescription.value = "";
  taskDueDate.value = "";
  taskPriorityUrgent.classList.remove("active");
  taskPriorityMedium.classList.remove("active");
  taskPriorityLow.classList.remove("active");
  taskCategory.value = "";
  taskSubtask.value = "";
  savedSubtasks.innerHTML = "";
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
  if (taskTitel.value && taskDueDate.value && taskCategory.value) {
    const inputsForTask = getInfoForNewTask();
    const newTaskKey = taskTitel.value;
    const dataPost = await putRegistryDataBaseFunction(
      "tasks/toDo/" + newTaskKey,
      inputsForTask
    );
    clearInputFieldsForNewTask();
    console.log(dataPost);
  } else if (!taskTitel.value) {
    alert("Please enter a title for the task.");
  } else if (!taskDueDate.value) {
    alert("Please enter a due date for the task.");
  } else if (!taskCategory.value) {
    alert("Please select a category for the task.");
  }
}

async function putRegistryDataBaseFunction(path = "", data = {}) {
  let response = await fetch(FireBaseUrl + path + ".json", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return (responseToJson = await response.json());
}

async function loadToDoTasksFromFirebase() {
  const response = await fetch(FireBaseUrl + "tasks/toDo.json");
  const data = await response.json();

  const keys = Object.keys(data);
  try {
    if (data) {
      for (let i = 0; i < keys.length; i++) {
        const taskKey = keys[i];
        const task = data[taskKey];
        toDoContentFinalDiv.innerHTML += getTaskFromFirebaseTemplate(
          task,
          taskKey
        );
      }
    } else {
      toDoContentFinalDiv.innerHTML =
        '<div class="empty-todo-hint">Keine Aufgaben vorhanden.</div>';
    }
  } catch (error) {
    console.error("Error loading can not load tasks data:", error);
  }
}

async function initAddTask() {
  await loadDataSignUp();
}

async function loadAllTasksFromFirebase() {
  todosArray = []; // Leeren!
  const response = await fetch(FireBaseUrl + "tasks.json");
  const data = await response.json();

  if (data) {
    for (const categoryKey in data) {
      // z.B. "toDo", "done", ...
      const categoryTasks = data[categoryKey];
      for (const taskKey in categoryTasks) {
        const task = categoryTasks[taskKey];
        // Schreibe Info dazu (für Filter, Drag&Drop usw.)
        task.id = taskKey; // z.B. "task1"
        task.category = categoryKey; // z.B. "toDo"
        todosArray.push(task);
      }
    }
  }
  updateTasksHtml(); // Jetzt alles rendern!
}

function filterTasksByCategory() {
  let toDoTasks = todosArray.filter((task) => task.category === "toDo");
  let inProgressTasks = todosArray.filter(
    (task) => task.category === "inProgress"
  );
  let awaitFeedbackTasks = todosArray.filter(
    (task) => task.category === "awaitFeedback"
  );
  let doneTasks = todosArray.filter((task) => task.category === "done");
  return { toDoTasks, inProgressTasks, awaitFeedbackTasks, doneTasks };
}

const loadedTasks = {};

function updateTasksHtml() {
  const { toDoTasks, inProgressTasks, awaitFeedbackTasks, doneTasks } = filterTasksByCategory();
  clearAllTasks();
  bigTaskDiv.innerHTML = "";

  for (let i = 0; i < toDoTasks.length; i++) {
    const task = toDoTasks[i];
    loadedTasks[task.id] = task;
    toDoContentFinalDiv.innerHTML += getTaskFromFirebaseTemplate(task, task.id);
    bigTaskDiv.innerHTML += getTaskFromFirebaseBigTaskTemplate(task, task.id);
    bigTaskDiv.innerHTML += getTaskEditTemplate(task, task.id);
    userStoryOrTechnicalTaskStyle(task.id);
    priorityStyle(task.id);
    renderAssignedContacts(task.id, task.assignedTo);
    renderSubtasksInBigTask(task.id, task.subtasks);
    assignedContactsEdit (task.id, task.assignedTo);
    buttonPriorityStyle(task.id, task.priority);
  }

  for (let i = 0; i < inProgressTasks.length; i++) {
    const task = inProgressTasks[i];
    loadedTasks[task.id] = task;
    inProgressContent.innerHTML += getTaskFromFirebaseTemplate(task, task.id);
    bigTaskDiv.innerHTML += getTaskFromFirebaseBigTaskTemplate(task, task.id);
    bigTaskDiv.innerHTML += getTaskEditTemplate(task, task.id);
    userStoryOrTechnicalTaskStyle(task.id);
    priorityStyle(task.id);
    renderAssignedContacts(task.id, task.assignedTo);
    renderSubtasksInBigTask(task.id, task.subtasks);
    assignedContactsEdit (task.id, task.assignedTo);
    buttonPriorityStyle(task.id, task.priority);
  }

  for (let i = 0; i < awaitFeedbackTasks.length; i++) {
    const task = awaitFeedbackTasks[i];
    loadedTasks[task.id] = task;
    awaitFeedbackContent.innerHTML += getTaskFromFirebaseTemplate(
      task,
      task.id
    );
    bigTaskDiv.innerHTML += getTaskFromFirebaseBigTaskTemplate(task, task.id);
    bigTaskDiv.innerHTML += getTaskEditTemplate(task, task.id);
    userStoryOrTechnicalTaskStyle(task.id);
    priorityStyle(task.id);
    renderAssignedContacts(task.id, task.assignedTo);
    renderSubtasksInBigTask(task.id, task.subtasks);
    assignedContactsEdit (task.id, task.assignedTo);
    buttonPriorityStyle(task.id, task.priority);
  }

  for (let i = 0; i < doneTasks.length; i++) {
    const task = doneTasks[i];
    loadedTasks[task.id] = task;
    doneContent.innerHTML += getTaskFromFirebaseTemplate(task, task.id);
    bigTaskDiv.innerHTML += getTaskFromFirebaseBigTaskTemplate(task, task.id);
    bigTaskDiv.innerHTML += getTaskEditTemplate(task, task.id);
    userStoryOrTechnicalTaskStyle(task.id);
    priorityStyle(task.id);
    renderAssignedContacts(task.id, task.assignedTo);
    renderSubtasksInBigTask(task.id, task.subtasks);
    assignedContactsEdit (task.id, task.assignedTo);
    buttonPriorityStyle(task.id, task.priority);
  }
}

function clearAllTasks() {
  toDoContentFinalDiv.innerHTML = "";
  inProgressContent.innerHTML = "";
  awaitFeedbackContent.innerHTML = "";
  doneContent.innerHTML = "";
}

let currentDraggedElement = null;
let currentDraggedCategory = null;

function startDragging(taskId, category) {
  currentDraggedElement = taskId;
  currentDraggedCategory = category;
}

function allowDrop(ev) {
  ev.preventDefault();
}

async function moveTo(newCategory) {
  // 1. Finde Task im Array
  const taskIndex = todosArray.findIndex(
    (t) =>
      t.id === currentDraggedElement && t.category === currentDraggedCategory
  );
  if (taskIndex === -1) return;
  const task = todosArray[taskIndex];

  // 2. Lösche aus alter Kategorie in Firebase
  await fetch(FireBaseUrl + `tasks/${currentDraggedCategory}/${task.id}.json`, {
    method: "DELETE",
  });

  // 3. Neue Kategorie setzen und speichern
  task.category = newCategory;
  await fetch(FireBaseUrl + `tasks/${newCategory}/${task.id}.json`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  // 4. Tasks neu laden und rendern
  loadAllTasksFromFirebase();
}

function userStoryOrTechnicalTaskStyle(taskKey) {
  const userOrTechnicalTextBox = document.getElementById(
    `user-story-or-technical-task-box${taskKey}`
  );
  const userOrTechnicalDiv = document.getElementById(
    `user-story-box${taskKey}`
  );
  const userOrTechnicalDivBig = document.getElementById(
    `big-board-user-or-technical${taskKey}`
  );

  if (!userOrTechnicalTextBox || !userOrTechnicalDiv) return;

  if (userOrTechnicalTextBox.innerHTML == "User Story") {
    userOrTechnicalDiv.classList.add("user-story-box");
    userOrTechnicalDivBig.classList.add("user-story-box");
  } else if (userOrTechnicalTextBox.innerHTML == "Technical Task") {
    userOrTechnicalDiv.classList.add("technical-task-box");
    userOrTechnicalDivBig.classList.add("technical-task-box");
  }
}

function priorityStyle(taskKey) {
  const priorityBoxText = document.getElementById(`task-board-big-priority${taskKey}`);
  const priorityBoxLogo = document.getElementById(`task-board-big-priority-icon${taskKey}`);
  const priorityBoxPicture = document.getElementById(`priority-icon-task-little${taskKey}`);
  if (priorityBoxText.innerHTML == "No priority selected") {
    priorityBoxPicture.classList.add("display-none");
  } else if (priorityBoxText.innerHTML == "Urgent") {
    priorityBoxLogo.src = "./assets/icons/double-arrow-up-14221.png";
    priorityBoxPicture.src = "./assets/icons/double-arrow-up-14221.png";
  } else if (priorityBoxText.innerHTML == "Medium") {
    priorityBoxLogo.src = "./assets/icons/medium-priority-icon.png";
    priorityBoxPicture.src = "./assets/icons/medium-priority-icon.png";
  } else if (priorityBoxText.innerHTML == "Low") {
    priorityBoxLogo.src = "./assets/icons/double-arrow-down-14228.png";
    priorityBoxPicture.src = "./assets/icons/double-arrow-down-14228.png";
  }
}

function renderAssignedContacts(taskKey, assignedTo) {
  const container = document.getElementById(`task-board-big-assigned-to-contacts-div${taskKey}`);
  const containerTask = document.getElementById(`three-circle-container${taskKey}`);
  const containerTaskEdit = document.getElementById(`three-circle-todo-edit${taskKey}`);
  const circleClasses = ["single-circle-first-big","single-circle-second-big","single-circle-third-big",];
  const circleClassesTask = ["single-circle-first-little","single-circle-second-little","single-circle-third-little",];
  container.innerHTML = "";
  containerTask.innerHTML = "";

  for (let i = 0; i < assignedTo.length; i++) {
    const name = assignedTo[i];
    const initials = name.split(" ").map((word) => word.charAt(0).toUpperCase())
    .join("").substring(0, 2);
    if (name == "undefined") return;
    container.innerHTML += `
      <div class="task-board-big-first-contact-big">
        <span class="${circleClasses[i]}">${initials}</span>
        <p class="task-board-big-first-contact-name-big">${name}</p>
      </div>
    `;
    containerTask.innerHTML += `
    <div class="task-board-big-first-contact-big">
      <span class="${circleClassesTask[i]}">${initials}</span>
    </div>
    `;
  }
}

async function loadDataBoard(path = "") {
  let response = await fetch(FireBaseUrl + path + ".json");
  let responseToJson = await response.json();
  fullTaskInfoArray.push(responseToJson);
  console.log(fullTaskInfoArray);
}

let currentTaskKey = null;

function showBigTaskInfo(taskKey) {
  const overlay = document.getElementById("task-big-container-absolute");
  const wrapper = document.getElementById("task-big-container");

  const panels = wrapper.getElementsByClassName("big-task-panel");
  for (let i = 0; i < panels.length; i++) {
    panels[i].classList.add("display-none");
  }

  const editTaskPanel = document.getElementById(`big-task-edit${taskKey}`);
  if (editTaskPanel && !editTaskPanel.classList.contains("display-none")) {
    cancelEditTask(taskKey);
  }

  const task = document.getElementById(`big-task-${taskKey}`);
  if (task) task.classList.remove("display-none");

  overlay.classList.remove("display-none");
  wrapper.classList.remove("display-none");
  overlay.classList.add("active");
  wrapper.classList.add("active");

  currentTaskKey = taskKey;
}

function hideBigTaskInfo(taskKey) {
  if (!taskKey) {
    taskKey = currentTaskKey;
  }
  const overlay = document.getElementById("task-big-container-absolute");
  const wrapper = document.getElementById("task-big-container");
  const editTaskPanel = document.getElementById(`big-task-edit${taskKey}`);
  setTimeout(() => {
    if (editTaskPanel && !editTaskPanel.classList.contains("display-none")) {
    cancelEditTask(taskKey);
    return;
  }}, 500);

  overlay.classList.remove("active");
  wrapper.classList.remove("active");

  setTimeout(() => {
    overlay.classList.add("display-none");
    wrapper.classList.add("display-none");

    if (taskKey) {
      const task = document.getElementById(`big-task-${taskKey}`);
      if (task) task.classList.add("display-none");
    }
    currentTaskKey = null;
  }, 500);
}

function initBigTaskInfoOverlay() {
  const overlay = document.getElementById("task-big-container-absolute");
  const taskWindow = document.getElementById("task-big-container");
  if (window.location.pathname.endsWith("board.html")) {
    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) {
        hideBigTaskInfo();
      }
    });

    taskWindow.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  }
}
initBigTaskInfoOverlay();

function editTask(taskKey) {
  const showTaskPanel = document.getElementById(`big-task-show-hide-div${taskKey}`);
  const editTaskPanel = document.getElementById(`big-task-edit${taskKey}`);
  const task = document.getElementById(`big-task-${taskKey}`);

  if (showTaskPanel) {
    showTaskPanel.classList.add("display-none");
    task.classList.add("height-zero");
  }
  if (editTaskPanel) {
    editTaskPanel.classList.remove("display-none");
  }
}

function cancelEditTask(taskKey) {
  const showTaskPanel = document.getElementById(`big-task-show-hide-div${taskKey}`);
  const editTaskPanel = document.getElementById(`big-task-edit${taskKey}`);
  const task = document.getElementById(`big-task-${taskKey}`);

  if (showTaskPanel) {
    showTaskPanel.classList.remove("display-none");
    task.classList.remove("height-zero");
  }
  if (editTaskPanel) {
    editTaskPanel.classList.add("display-none");
  }
}

async function deleteTask(category, taskKey) {
  const url = `${FireBaseUrl}tasks/${category}/${taskKey}.json`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log(`Task ${taskKey} aus Kategorie "${category}" gelöscht.`);
      await loadAllTasksFromFirebase();
    }
  } catch (error) {
    error = console.error("Error deleting task:", error);
  }
}

function renderSubtasksInBigTask(taskKey, subtasks) {
  const subtaksContainer = document.getElementById(`subtasks-board-tasks-div${taskKey}`);
  const subtasksEditDiv = document.getElementById(`subtasks-edit-div${taskKey}`);
  subtaksContainer.innerHTML = "";
  if (!subtasks) return;
  for (let i = 0; i < subtasks.length; i++) {
    const subtask = subtasks[i];
    if (!subtask) return;
    if(subtask.statusCheckbox == false) {
      subtaksContainer.innerHTML += `
        <div class="subtasks-board-first-task" id="subtasks-board-first-task${taskKey}${i}">
          <input class="checkbox-board-subtasks" id="checkbox-board-subtasks${taskKey}${i}" type="checkbox">
          <span>${subtask.subtaskText}</span>
        </div>
      `;
    } else {
      subtaksContainer.innerHTML += `
        <div class="subtasks-board-first-task" id="subtasks-board-first-task${taskKey}${i}">
          <input checked class="checkbox-board-subtasks" id="checkbox-board-subtasks${taskKey}${i}" type="checkbox">
          <span>${subtask.subtaskText}</span>
        </div>
      `;
    }
    subtasksEditDiv.innerHTML += getEditSubtaskTemplate(taskKey, i, subtask.subtaskText);
  }
}

function progressBarStyle(taskKey, subtasks) {
  const progressBar = document.getElementById(`progressbar-content${taskKey}`);
  const progressBarCounter = document.getElementById(`subtask-text${taskKey}`);
  if (!subtasks) return;
  for (let i = 0; i < subtasks.length; i++) {
    const subtask = subtasks[i];
    if (!subtask) return;
    progressBarCounter.innerHTML = `${i + 1}/${subtasks.length} subtasks`;
  }
}

function assignedContactsEdit (taskKey, assignedTo) {
  const containerTaskEdit = document.getElementById(`three-circle-container-edit${taskKey}`);
  const dropdownEdit = document.getElementById(`contacts-dropdown-edit${taskKey}`);
  const circleClassesTask = ["single-circle-first-edit","single-circle-second-edit","single-circle-third-edit",];
  
  for (let i = 0; i < assignedTo.length; i++) {
    const name = assignedTo[i];
    const initials = name.split(" ").map((word) => word.charAt(0).toUpperCase()).join("").substring(0, 2);
    if (name == "undefined") return;
    containerTaskEdit.innerHTML += `
      <div id="contact-in-edit-template${taskKey}" class="contact-in-edit-template">
        <span class="${circleClassesTask[i]}">${initials}</span>
      </div>
    `;
  }
}

async function loadContactsForDropdownInEdit(taskKey) {
  const container = document.getElementById(`contacts-dropdown-edit${taskKey}`);
  const threeCircleDivEdit = document.getElementById(`three-circle-container-edit${taskKey}`);
  if (container.innerHTML == "") {
    try {
      const contactsUnsorted = await fetchContacts();
      const contacts = Object.values(contactsUnsorted);
      contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
      allContacts = contacts;
      for (let i = 0; i < contacts.length; i++) {
        container.innerHTML += getContactCardForDropdownInEdit(contacts[i],taskKey);
      }
    } catch (error) {
      console.error("Error loading contacts in Editing Dropdown:", error);
    }
  }
  container.classList.toggle("hidden");
  threeCircleDivEdit.classList.toggle("hidden");
}


function getContactCardForDropdownInEdit(contact,taskKey) {
  const name = contact.lastName
    ? `${contact.firstName} ${contact.lastName}`
    : contact.firstName;
    const initials = getInitials(contact.firstName, contact.lastName);
  return `
    <label class="contact-option-edit">
      <span id="circles-edit${contact.id}${taskKey}" class="circles-edit">${initials}</span>
      <div class="name-checkbox-flexbox">
        <span class="contact-name-edit" id="contact-name-edit${contact.id}${taskKey}">${name}</span>
        <input id="contact-checkbox-${contact.id}${taskKey}" type="checkbox" class="contact-checkbox-edit" data-contact-id="${contact.id || ""}">
      </div>
    </label>
  `;
}

function changeContactCircleInEditTemplate(taskKey) {
  let initialsArray = [];

  for (let i = 0; i < allContacts.length; i++) {
    const contact = allContacts[i];
    const checkboxId = `contact-checkbox-${contact.id}${taskKey}`;
    const nameId = `contact-name-edit${contact.id}${taskKey}`;

    const checkbox = document.getElementById(checkboxId);
    const nameElem = document.getElementById(nameId);

    if (checkbox && checkbox.checked && nameElem) {
      const fullName = nameElem.textContent.trim();
      const names = fullName.split(" ");
      let initials = "";
      if (names[0]) initials += names[0][0].toUpperCase();
      if (names[1]) initials += names[1][0].toUpperCase();
      initialsArray.push(initials);
    }
  }

  renderCirclesInEditTemplate(taskKey, initialsArray);
  return nameElem;
}

function renderCirclesInEditTemplate(taskKey, initialsArray) {
  const container = document.getElementById(`three-circle-container-edit${taskKey}`);
  const dropdown = document.getElementById(`contacts-dropdown-edit${taskKey}`);
  container.innerHTML = "";
  const circleClasses = ["single-circle-first-edit", "single-circle-second-edit", "single-circle-third-edit"];

  for (let i = 0; i < Math.min(initialsArray.length, 3); i++) {
    const initials = initialsArray[i];
    container.innerHTML += `
      <div class="${circleClasses[i]}">${initials}</div>
    `;
  }
  showAndHideCirclesInEditTemplate(container, initialsArray, taskKey);
}

function showAndHideCirclesInEditTemplate (container, initialsArray, taskKey) {
  const dropdown = document.getElementById(`contacts-dropdown-edit${taskKey}`);
   if (initialsArray.length === 0) {
    container.classList.add("hidden");
    container.classList.add("height-zero");
  } else if(!dropdown.classList.contains("hidden")){
    container.classList.add("hidden");
    container.classList.add("height-zero");
  }
    else {
    container.classList.remove("hidden");
    container.classList.remove("height-zero");
  }
}

function getInitials(firstName, lastName) {
  let initials = "";
  if (firstName && firstName.length > 0) initials += firstName[0].toUpperCase();
  if (lastName && lastName.length > 0) initials += lastName[0].toUpperCase();
  return initials;
}

function showInputFieldEditSubtasksIcons(taskKey) {
  const inputfield = document.getElementById(`inputfield-subtask-edit-div${taskKey}`);
  const clearIcon = document.getElementById(`delete-subtask-edit-check-icon${taskKey}`);
  const seperatorIcon = document.getElementById(`seperator-subtasks-edit${taskKey}`);
  const addIcon = document.getElementById(`add-new-subtask-edit-icon${taskKey}`);

  clearIcon.classList.remove("hidden");
  seperatorIcon.classList.remove("hidden");
  addIcon.classList.remove("hidden");
  inputfield.classList.add('input-border-left-bottom');
}

function clearInputHideIconsSubtasksInput(taskKey) {
  const inputfield = document.getElementById(`inputfield-subtask-edit-div${taskKey}`);
  const clearIcon = document.getElementById(`delete-subtask-edit-check-icon${taskKey}`);
  const seperatorIcon = document.getElementById(`seperator-subtasks-edit${taskKey}`);
  const addIcon = document.getElementById(`add-new-subtask-edit-icon${taskKey}`);

  clearIcon.classList.add("hidden");
  seperatorIcon.classList.add("hidden");
  addIcon.classList.add("hidden");
  inputfield.classList.remove('input-border-left-bottom');
  inputfield.value = "";
}

function hideIconsInEditSubtasks(taskKey, i) {
  const penIcon = document.getElementById(`edit-pencil-icon${taskKey}${i}`);
  const seperator = document.getElementById(`seperator-for-subtasks${taskKey}${i}`);
  const wasteIcon = document.getElementById(`waste-icon${taskKey}${i}`);
  const inputfield = document.getElementById(`subtask-edit-inputfield${taskKey}${i}`);

  if (!inputfield) {
    penIcon.classList.add("hidden");
    seperator.classList.add("hidden");
    wasteIcon.classList.add("hidden");
  }
}

function showIconsInEditSubtasks(taskKey, i) {
  const penIcon = document.getElementById(`edit-pencil-icon${taskKey}${i}`);
  const seperator = document.getElementById(`seperator-for-subtasks${taskKey}${i}`);
  const wasteIcon = document.getElementById(`waste-icon${taskKey}${i}`);
  const inputfield = document.getElementById(`subtask-edit-inputfield${taskKey}${i}`);
  if (!inputfield) {
    penIcon.classList.remove("hidden");
    seperator.classList.remove("hidden");
    wasteIcon.classList.remove("hidden");
  }
}

function buttonPriorityStyle(taskKey, priority) {
  const buttonUrgent = document.getElementById(`urgent-edit-button-div${taskKey}`);
  const buttonMedium = document.getElementById(`medium-edit-button-div${taskKey}`);
  const buttonLow = document.getElementById(`low-edit-button-div${taskKey}`);

  if (priority == "Urgent") {
    buttonUrgent.classList.add("active-red");
  } else if (priority == "Medium") {
    buttonMedium.classList.add("active-yellow");
  } else if (priority == "Low") {
    buttonLow.classList.add("active-green");
  }
}

function changePriorityInEdit(taskKey, priority) {
  const buttonUrgent = document.getElementById(`urgent-edit-button-div${taskKey}`);
  const buttonMedium = document.getElementById(`medium-edit-button-div${taskKey}`);
  const buttonLow = document.getElementById(`low-edit-button-div${taskKey}`);
  const isUrgentActive = buttonUrgent.classList.contains("active-red");
  const isMediumActive = buttonMedium.classList.contains("active-yellow");
  const isLowActive = buttonLow.classList.contains("active-green");

  removeActiveFromButtons(buttonUrgent, buttonMedium, buttonLow);
  addPriorityAndActive(buttonUrgent, buttonMedium, buttonLow, priority, isUrgentActive, isMediumActive, isLowActive);
}

function removeActiveFromButtons(buttonUrgent, buttonMedium, buttonLow) {
  buttonUrgent.classList.remove("active-red");
  buttonMedium.classList.remove("active-yellow");
  buttonLow.classList.remove("active-green");
}

function addPriorityAndActive(buttonUrgent, buttonMedium, buttonLow, priority, isUrgentActive, isMediumActive, isLowActive) {
  if (priority === "Urgent" && !isUrgentActive) {
    buttonUrgent.classList.add("active-red");
    return "Urgent";
  }
  if (priority === "Medium" && !isMediumActive) {
    buttonMedium.classList.add("active-yellow");
    return "Medium";
  }
  if (priority === "Low" && !isLowActive) {
    buttonLow.classList.add("active-green");
    return "Low";
  }
  return "No priority selected";
}

function changeSubtaskContent(taskKey, i, subtaskText) {
  const subtaskTextDiv = document.getElementById(`subtask-task-text-edit${taskKey}${i}`);
  const subtaskContainer = document.getElementById(`subtasks-board-first-task-edit${taskKey}${i}`);
  const subtasksEditDiv = document.getElementById(`subtasks-edit-div${taskKey}`);
  subtaskContainer.innerHTML = "";

  subtaskContainer.innerHTML = `
  <div class="flexbox-inputfield-subtask-edit">
    <svg onclick="cancelEditSubtask('${taskKey}', '${i}')" id="subtask-delete-icon-edit${taskKey}${i}" class="subtask-delete-icon-edit" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_314135_4497" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
      <rect width="22" height="22" fill="#D9D9D9"/>
      </mask>
      <g mask="url(#mask0_314135_4497)">
      <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"/>
      </g>
    </svg>
    <div id="subtask-inputfield-edit-seperator${taskKey}${i}" class="subtask-inputfield-edit-seperator"></div>
    <svg onclick="confirmChangeForEditSubtask('${taskKey}', '${i}', '${subtaskText}')" id="subtask-confirm-icon-edit${taskKey}${i}" class="subtask-confirm-icon-edit" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_314253_4333" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
      <rect y="0.5" width="25" height="25" fill="#D9D9D9"/>
      </mask>
      <g mask="url(#mask0_314253_4333)">
      <path d="M9.55057 15.65L18.0256 7.175C18.2256 6.975 18.4631 6.875 18.7381 6.875C19.0131 6.875 19.2506 6.975 19.4506 7.175C19.6506 7.375 19.7506 7.6125 19.7506 7.8875C19.7506 8.1625 19.6506 8.4 19.4506 8.6L10.2506 17.8C10.0506 18 9.81724 18.1 9.55057 18.1C9.28391 18.1 9.05057 18 8.85057 17.8L4.55057 13.5C4.35057 13.3 4.25474 13.0625 4.26307 12.7875C4.27141 12.5125 4.37557 12.275 4.57557 12.075C4.77557 11.875 5.01307 11.775 5.28807 11.775C5.56307 11.775 5.80057 11.875 6.00057 12.075L9.55057 15.65Z" fill="#2A3647"/>
      </g>
    </svg>

    <input class="subtask-edit-inputfield" id="subtask-edit-inputfield${taskKey}${i}" type="text" value="${subtaskText}">
  </div>
  `;
  return i;
}

function cancelEditSubtask(taskKey, i) {
  const subtaskContainer = document.getElementById(`subtasks-board-first-task-edit${taskKey}${i}`);
  if (subtaskContainer) {
    subtaskContainer.remove();
  }
}

function confirmChangeForEditSubtask(taskKey, i) {
  const oldSubtaskDiv = document.getElementById(`subtasks-board-first-task-edit${taskKey}${i}`);
  const inputfieldSubtask = document.getElementById(`subtask-edit-inputfield${taskKey}${i}`);
  let newSubtaskText = inputfieldSubtask.value;

  const newSubtaskDiv = document.createElement('div');
  newSubtaskDiv.innerHTML = getEditSubtaskTemplate(taskKey, i, newSubtaskText);

  const newSubtaskDivFirstElementChild = newSubtaskDiv.firstElementChild;

  oldSubtaskDiv.parentNode.replaceChild(newSubtaskDivFirstElementChild, oldSubtaskDiv);
}

function addNewSubtaskInEdit(taskKey) {
  const subtasksEditDiv = document.getElementById(`subtasks-edit-div${taskKey}`);
  const input = document.getElementById(`inputfield-subtask-edit-div${taskKey}`);
  const subtaskText = input.value.trim();

  // Wenn kein Text drin ist, abbrechen
  if (!subtaskText) return;

  const currentSubtasks = subtasksEditDiv.getElementsByClassName("subtasks-board-first-task-edit");
  const newIndex = currentSubtasks.length;

  subtasksEditDiv.innerHTML += getEditSubtaskTemplate(taskKey, newIndex, subtaskText);

  input.value = "";

  document.getElementById(`delete-subtask-edit-check-icon${taskKey}`).classList.add("hidden");
  document.getElementById(`seperator-subtasks-edit${taskKey}`).classList.add("hidden");
  document.getElementById(`add-new-subtask-edit-icon${taskKey}`).classList.add("hidden");
}

function getInformationForEditTask(taskKey) {
  const title = document.getElementById(`titel-edit-task-big${taskKey}`).value;
  const description = document.getElementById(`description-edit-task-big${taskKey}`).value;
  const dueDate = document.getElementById(`due-date-edit-task-big${taskKey}`).value;
  const priority = addPriorityAndActive(taskKey);
  const assignedTo = changeContactCircleInEditTemplate(taskKey);
  const subtasks = getEditedSubtasksForFirebase(taskKey);
  const userStoryOrTechnicalTask = document.getElementById(`big-board-user-or-technical${taskKey}`).innerHTML;
  const category = document.getElementById(`todo-content-box${taskKey}`).dataset.category;
  return { title, description, dueDate, priority, assignedTo, subtasks, userStoryOrTechnicalTask, category };
}

function getEditedSubtasksForFirebase(taskKey) {
  const subtasks = [];
  const container = document.getElementById(`subtasks-edit-div${taskKey}`);
  if (!container) return subtasks;

  const allSubtasks = container.getElementsByClassName("subtasks-board-first-task-edit");

  for (let i = 0; i < allSubtasks.length; i++) {
    const span = document.getElementById(`subtask-task-text-edit${taskKey}${i}`);
    if (span) {
      const text = span.textContent.trim();
      if (text) {
        subtasks.push({
          subtaskText: text,
          statusCheckbox: false
        });
      }
    }
  }

  return subtasks;
}