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
let currentStatusForNewTask = "toDo";
let currentDraggedElement = null;
let currentDraggedCategory = null;
let currentTaskKey = null;
let subtaskSavedCounter = 1;
let todosArray = [];
let fullTaskInfoArray = [];
const loadedTasks = {};
document.addEventListener("click", dropdownCloseOnClickOutside, true);

/** Sends data to Firebase using a PUT request. */
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

/** Renders todo tasks into a given container. */
function renderTodoTasks(keys, data, container) {
  for (let i = 0; i < keys.length; i++) {
    const taskKey = keys[i];
    const task = data[taskKey];
    container.innerHTML += getTaskFromFirebaseTemplate(task, taskKey);
  }
}

/** Loads all todo tasks from Firebase and renders them. */
async function loadToDoTasksFromFirebase() {
  const response = await fetch(FireBaseUrl + "tasks/toDo.json");
  const data = await response.json();

  try {
    if (data) {
      const keys = Object.keys(data);
      renderTodoTasks(keys, data, toDoContentFinalDiv);
    } else {
      toDoContentFinalDiv.innerHTML = getEmptyTodoTemplate();
    }
  } catch (error) {
    console.error("Error loading can not load tasks data:", error);
  }
}

/** Initializes the add task page and loads required data. */
async function initAddTask() {
  loadHTML();
  await loadDataSignUp();
  loadMediumButtonPriority();
  selectedSiteBackgroundStyle();
  checkTodaysDate();
}

/** Pushes all tasks from Firebase into a flat array. */
function pushTasksIntoArray(data, todosArray) {
  for (const categoryKey in data) {
    const categoryTasks = data[categoryKey];
    for (const taskKey in categoryTasks) {
      const task = categoryTasks[taskKey];
      task.id = taskKey;
      task.category = categoryKey;
      todosArray.push(task);
    }
  }
}

/** Loads all tasks from Firebase and updates the UI. */
async function loadAllTasksFromFirebase() {
  todosArray = [];
  const response = await fetch(FireBaseUrl + "tasks.json");
  const data = await response.json();

  if (data) {
    pushTasksIntoArray(data, todosArray);
  }

  updateTasksHtml();
}

/** Filters tasks by their category. */
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

/** Renders a single task including all details and UI elements. */
function renderSingleTask(task) {
  loadedTasks[task.id] = task;
  bigTaskDiv.innerHTML += getTaskFromFirebaseBigTaskTemplate(task, task.id);
  bigTaskDiv.innerHTML += getTaskEditTemplate(task, task.id);
  userStoryOrTechnicalTaskStyle(task.id);
  priorityStyle(task.id);
  renderAssignedContacts(task.id, task.assignedTo);
  renderSubtasksInBigTask(task.id, task.subtasks, task.titel, task.category);
  assignedContactsEdit(task.id, task.assignedTo);
  buttonPriorityStyle(task.id, task.priority);
  subtaskCounter(task.id);
}

/** Renders all tasks inside a specific column. */
function renderTasksForColumn(tasks, columnElement) {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    columnElement.innerHTML += getTaskFromFirebaseTemplate(task, task.id);
    renderSingleTask(task);
  }
}

/** Updates the entire board UI with current tasks. */
function updateTasksHtml() {
  const {toDoTasks, inProgressTasks, awaitFeedbackTasks, doneTasks,} = filterTasksByCategory();

  const categories = [
    [toDoContentFinalDiv, toDoTasks],
    [inProgressContent, inProgressTasks],
    [awaitFeedbackContent, awaitFeedbackTasks],
    [doneContent, doneTasks],
  ];

  bigTaskDiv.innerHTML = "";

  categories.forEach(([container, tasks]) => {
    container.innerHTML = "";
    tasks.length ? renderTasksForColumn(tasks, container) : (container.innerHTML = getEmptyTodoTemplate());
  });
}

/** Clears all task columns in the UI. */
function clearAllTasks() {
  toDoContentFinalDiv.innerHTML = "";
  inProgressContent.innerHTML = "";
  awaitFeedbackContent.innerHTML = "";
  doneContent.innerHTML = "";
}

/** Starts dragging a task and highlights drop zones. */
function startDragging(taskId, category) {
  currentDraggedElement = taskId;
  currentDraggedCategory = category;
  highlightDropZones();
}

/** Allows dropping elements during drag and drop. */
function allowDrop(ev) {
  ev.preventDefault();
}

/** Moves a task to a new category in Firebase. */
async function moveTo(newCategory) {
  const taskIndex = todosArray.findIndex((t) => t.id === currentDraggedElement && t.category === currentDraggedCategory);
  if (taskIndex === -1) return;
  const task = todosArray[taskIndex];

  await fetch(FireBaseUrl + `tasks/${currentDraggedCategory}/${task.id}.json`, {
    method: "DELETE",
  });

  task.category = newCategory;
  await fetch(FireBaseUrl + `tasks/${newCategory}/${task.id}.json`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  removeDropHighlight();

  loadAllTasksFromFirebase();
}

/** Applies styling depending on task type (User Story or Technical Task). */
function userStoryOrTechnicalTaskStyle(taskKey) {
  const userOrTechnicalTextBox = document.getElementById(`user-story-or-technical-task-box${taskKey}`);
  const userOrTechnicalDiv = document.getElementById(`user-story-box${taskKey}`);
  const userOrTechnicalDivBig = document.getElementById(`big-board-user-or-technical${taskKey}`);

  if (!userOrTechnicalTextBox || !userOrTechnicalDiv) return;

  if (userOrTechnicalTextBox.innerHTML == "User Story") {
    userOrTechnicalDiv.classList.add("user-story-box");
    userOrTechnicalDivBig.classList.add("user-story-box-big");
  } else if (userOrTechnicalTextBox.innerHTML == "Technical Task") {
    userOrTechnicalDiv.classList.add("technical-task-box");
    userOrTechnicalDivBig.classList.add("technical-task-box-big");
  }
}

/** Applies the correct icon based on task priority. */
function applyPriorityIcon(priorityBoxText, priorityBoxLogo, priorityBoxPicture) {
  if (priorityBoxText.innerHTML == "No priority selected") {
    priorityBoxPicture.classList.add("display-none");
  } else if (priorityBoxText.innerHTML == "Urgent") {
    priorityBoxLogo.src = "./assets/icons/double-arrow-up-14221.svg";
    priorityBoxPicture.src = "./assets/icons/double-arrow-up-14221.svg";
  } else if (priorityBoxText.innerHTML == "Medium") {
    priorityBoxLogo.src = "./assets/icons/medium-priority-icon.svg";
    priorityBoxPicture.src = "./assets/icons/medium-priority-icon.svg";
  } else if (priorityBoxText.innerHTML == "Low") {
    priorityBoxLogo.src = "./assets/icons/double-arrow-down-14228.svg";
    priorityBoxPicture.src = "./assets/icons/double-arrow-down-14228.svg";
  }
}

/** Styles the priority display of a task. */
function priorityStyle(taskKey) {
  const priorityBoxText = document.getElementById(`task-board-big-priority${taskKey}`);
  const priorityBoxLogo = document.getElementById(`task-board-big-priority-icon${taskKey}`);
  const priorityBoxPicture = document.getElementById(`priority-icon-task-little${taskKey}`);

  applyPriorityIcon(priorityBoxText, priorityBoxLogo, priorityBoxPicture);
}

/** Generates a deterministic class name based on a string. */
function getClassFromName(name, classArray) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash += name.charCodeAt(i);
  }
  return classArray[hash % classArray.length];
}

/** Renders assigned contacts in big and small formats. */
function renderAssignedContactItems(assignedTo, container, containerTask, circleClasses, circleClassesTask) {
  for (let i = 0; i < assignedTo.length; i++) {
    const name = assignedTo[i];
    const initials = name.split(" ").map((word) => word.charAt(0).toUpperCase()).join("").substring(0, 2);

    if (name == "undefined") return;

    const circleClass = getClassFromName(name, circleClasses);

    container.innerHTML += getAssignedContactBigTemplate(circleClass, initials, name);
  }
  for (let i = 0; i < Math.min(assignedTo.length, 3); i++) {
    const name = assignedTo[i];
    const initials = name.split(" ").map((word) => word.charAt(0).toUpperCase()).join("").substring(0, 2);

    if (name == "undefined") return;
    containerTask.innerHTML += getAssignedContactLittleTemplate(circleClassesTask[i], initials);
  }
  assignedToPlusNumber(assignedTo, containerTask);
}

/** Displays "+X" if more than 3 contacts are assigned. */
function assignedToPlusNumber(assignedTo, containerTask) {
  if (assignedTo.length > 3) {
    containerTask.innerHTML += `<div class="text-align-contacts-counter">+${assignedTo.length - 3}</div>`;
  }
}

/** Renders assigned contacts for a task. */
function renderAssignedContacts(taskKey, assignedTo) {
  const container = document.getElementById(`task-board-big-assigned-to-contacts-div${taskKey}`);
  const containerTask = document.getElementById(`three-circle-container${taskKey}`);
  const priorityBoxPicture = document.getElementById(`priority-icon-task-little${taskKey}`);

  const circleClasses = ["single-circle-first-big", "single-circle-second-big", "single-circle-third-big", "single-circle-fourth-big", "single-circle-fifth-big"];

  const circleClassesTask = ["single-circle-first-little", "single-circle-second-little", "single-circle-third-little",];

  container.innerHTML = "";
  containerTask.innerHTML = "";

  if (assignedTo) {
    renderAssignedContactItems(assignedTo, container, containerTask, circleClasses, circleClassesTask);
  } else if (!assignedTo) {
    priorityBoxPicture.style.marginTop = "22px";
  }
}

/** Loads additional board data from Firebase. */
async function loadDataBoard(path = "") {
  let response = await fetch(FireBaseUrl + path + ".json");
  let responseToJson = await response.json();
  fullTaskInfoArray.push(responseToJson);
}

/** Shows the overlay for a big task view. */
function showBigTaskOverlay(overlay, wrapper) {
  overlay.classList.remove("display-none");
  wrapper.classList.remove("display-none");
  overlay.classList.add("active");
  wrapper.classList.add("active");
}

/** Displays detailed information for a selected task. */
function showBigTaskInfo(taskKey) {
  const overlay = document.getElementById("task-big-container-absolute");
  const wrapper = document.getElementById("task-big-container");
  const dueDateEdit = document.getElementById(`due-date-edit-task-big${taskKey}`);
  const today = new Date().toISOString().split("T")[0];

  [...wrapper.getElementsByClassName("big-task-panel")]
    .forEach(p => p.classList.add("display-none"));

  const editTaskPanel = document.getElementById(`big-task-edit${taskKey}`);
  if (editTaskPanel && !editTaskPanel.classList.contains("display-none")) cancelEditTask(taskKey);

  document.getElementById(`big-task-${taskKey}`)?.classList.remove("display-none");

  showBigTaskOverlay(overlay, wrapper);
  if (dueDateEdit) dueDateEdit.min = today;

  backgroundNotScrollable(); currentTaskKey = taskKey;
}

/** Handles delayed hiding of the edit panel. */
function handleHideEditPanel(taskKey, editTaskPanel) {
  setTimeout(() => {
    if (editTaskPanel && !editTaskPanel.classList.contains("display-none")) {
      cancelEditTask(taskKey);
      return;
    }
  }, 500);
}

/** Hides the big task UI with animation. */
function hideBigTaskUI(overlay, wrapper, taskKey) {
  setTimeout(() => {
    overlay.classList.add("display-none");
    wrapper.classList.add("display-none");

    if (taskKey) {
      const task = document.getElementById(`big-task-${taskKey}`);
      if (task) task.classList.add("display-none");
    }

    currentTaskKey = null;
    backgroundNotScrollable();
  }, 500);
}

/** Closes the big task detail view. */
function hideBigTaskInfo(taskKey) {
  if (!taskKey) {
    taskKey = currentTaskKey;
  }

  const overlay = document.getElementById("task-big-container-absolute");
  const wrapper = document.getElementById("task-big-container");
  const editTaskPanel = document.getElementById(`big-task-edit${taskKey}`);

  handleHideEditPanel(taskKey, editTaskPanel);

  overlay.classList.remove("active");
  wrapper.classList.remove("active");

  hideBigTaskUI(overlay, wrapper, taskKey);
}

/** Initializes click handling for closing task overlay. */
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

/** Collects all edited task data for saving. */
function getInformationForEditTask(taskKey, category, categoryUserOrTechnicalTask) {
  const titel = document.getElementById(`titel-edit-task-big${taskKey}`).value;
  const oldTitle = document.getElementById(`task-board-big-headline${taskKey}`).textContent;
  const description = document.getElementById(`description-edit-task-big${taskKey}`).value;
  const dueDate = document.getElementById(`due-date-edit-task-big${taskKey}`).value;
  const priority = saveEditTaskPriority(taskKey);
  const assignedTo = changeContactCircleInEditTemplate(taskKey);
  const subtasks = getEditedSubtasksForFirebase(taskKey);
  const id = titel;
  return {
    titel, description, dueDate, priority, assignedTo, subtasks,
    categoryUserOrTechnicalTask, id, category
  };
}

/** Iterates through subtasks and builds Firebase array. */
function getEditedSubtasksLoop(taskKey, allSubtasks, subtasks) {
  for (let i = 0; i < allSubtasks.length; i++) {
    const span = document.getElementById(`subtask-task-text-edit${taskKey}${i}`);
    const checkbox = document.getElementById(`checkbox-board-subtasks${taskKey}${i}`);

    if (!span) continue;

    const text = span.textContent.trim();
    if (!text) continue;

    subtasks.push({
      subtaskText: text,
      statusCheckbox: checkbox ? checkbox.checked : false
    });
  }
}

/** Retrieves all edited subtasks for Firebase. */
function getEditedSubtasksForFirebase(taskKey) {
  const subtasks = [];
  const container = document.getElementById(`subtasks-edit-div${taskKey}`);
  if (!container) return subtasks;

  const allSubtasks = container.getElementsByClassName("subtasks-board-first-task-edit");

  getEditedSubtasksLoop(taskKey, allSubtasks, subtasks);

  return subtasks;
}

/** Returns selected priority in edit mode. */
function saveEditTaskPriority(taskKey) {
  const buttonUrgent = document.getElementById(`urgent-edit-button-div${taskKey}`);
  const buttonMedium = document.getElementById(`medium-edit-button-div${taskKey}`);
  const buttonLow = document.getElementById(`low-edit-button-div${taskKey}`);

  if (buttonUrgent.classList.contains("active-red")) {
    return "Urgent";
  } else if (buttonMedium.classList.contains("active-yellow")) {
    return "Medium";
  } else if (buttonLow.classList.contains("active-green")) {
    return "Low";
  } else {
    return "No priority selected";
  }
}

/** Saves edited task data to Firebase. */
async function saveEditedTaskToFirebase(taskKey, category, categoryUserOrTechnicalTask) {
  if (!validateEditTaskTitle(taskKey) || !validateEditTaskDueDate(taskKey)) return;

  const inputsForTask = getInformationForEditTask(taskKey, category, categoryUserOrTechnicalTask);
  const newTitle = inputsForTask.titel;
  const oldTitle = document.getElementById(`task-board-big-headline${taskKey}`).textContent;

  if (newTitle !== oldTitle) {
    await putRegistryDataBaseFunction(`tasks/${category}/${newTitle}`, inputsForTask);
    await deleteTask(category, oldTitle);
  } else {
    await putRegistryDataBaseFunction(`tasks/${category}/${oldTitle}`, inputsForTask);
  }

  hideBigTaskInfo(taskKey);
  await loadAllTasksFromFirebase();
}

/** Saves the checkbox state of a subtask. */
async function saveSubtaskStatus(taskKey, category, titel, i) {
  const checkbox = document.getElementById(`checkbox-board-subtasks${taskKey}${i}`);
  if (!checkbox) return;
  const isChecked = checkbox.checked;
  try {
    await patchRegistryDataBaseFunction(
      `tasks/${category}/${titel}/subtasks/${i}`,
      { statusCheckbox: isChecked }
    );
  } catch (error) {
    console.error("Error saving subtask status:", error);
  }
}

/** Sends a PATCH request to Firebase. */
async function patchRegistryDataBaseFunction(path, data) {
  const url = `${FireBaseUrl}${path}.json`;
  return fetch(url, {
    method: "PATCH",
    body: JSON.stringify(data)
  });
}

/** Updates subtask progress bar and counter. */
function updateSubtaskProgress(taskKey, counter, subtasksCheckboxes, subtaskDiv, progressBarDiv) {
  const threeCircleToDo = document.getElementById(`three-circle-todo${taskKey}`);
  if (subtasksCheckboxes.length > 0) {
    subtaskDiv.innerHTML = `${counter}/${subtasksCheckboxes.length} subtasks`;

    const progressBarFillDiv = document.getElementById(`progressbar-fill${taskKey}`);
    const progressPercentage = (counter / subtasksCheckboxes.length) * 100;

    progressBarFillDiv.style.width = `${progressPercentage}%`;
  }
}

/** Calculates and displays subtask completion progress. */
function subtaskCounter(taskKey) {
  const subtaskDiv = document.getElementById(`subtask-text${taskKey}`);
  const subtasksCheckboxes = document.getElementsByClassName(`checkbox-board-subtasks${taskKey}`);
  const progressBarDiv = document.getElementById(`progressbar-box${taskKey}`);
  const priorityIcon = document.getElementById(`priority-icon-task-little${taskKey}`);

  let counter = 0;

  if (!subtasksCheckboxes || subtasksCheckboxes.length === 0) {
    if (progressBarDiv) progressBarDiv.style.display = "none";
    priorityIcon.style.marginTop = "50px";
    return;
  }

  for (let i = 0; i < subtasksCheckboxes.length; i++) {
    if (subtasksCheckboxes[i].checked) {
      counter++;
    }
  }

  updateSubtaskProgress(taskKey, counter, subtasksCheckboxes, subtaskDiv, progressBarDiv);
}

/** Collects all task input data for Firebase (board view). */
function taskInfosForFirebaseBoard() {
  let titel = validateInputBoard() || "New Task";
  let description = document.getElementById("inputfield-description-board").value || "No description";
  let dueDate = validateDueDateInputBoard();
  let priority = getSelectedPriority();
  let assignedTo = getAssignedToValue() || "Not Assigned to anyone";
  let categoryUserOrTechnicalTask = document.getElementById("inputfield-category-assign-board").value;
  let subtasks = subtasksInfoForFirebase() || "No subtasks";
  return { titel, description, dueDate, priority, assignedTo, categoryUserOrTechnicalTask, subtasks, };
}

/** Validates task title input and shows error message. */
function validateInputBoard() {
  const input = document.getElementById("titleInputBoard").value;
  const inputfield = document.getElementById("titleInputBoard");
  const errorMsg = document.getElementById("field-required-in-board");

  if (input.trim() == "") {
    errorMsg.classList.remove("display-none");
  } else if (input.trim().length < 3) {
    errorMsg.classList.remove("display-none");
    errorMsg.innerHTML = "Title must be 3 characters long.";
  }
  else {
    if (!errorMsg.classList.contains("display-none"))
      errorMsg.classList.add("display-none");
  }
  return input;
}

/** Validates due date input. */
function validateDueDateInputBoard() {
  const input = document.getElementById("dueDateInputBoard");
  const errorMsg = document.getElementById("due-date-required-board-error");
  const value = input.value.trim();

  const result = isValidDDMMYYYYRealDate(value);

  if (!result.valid) {
    errorMsg.innerHTML = result.message;
    errorMsg.classList.remove("display-none");
    return false;
  }

  errorMsg.classList.add("display-none");
  return value;
}

/** Validates a real date in YYYY-MM-DD format. */
function isValidDDMMYYYYRealDate(value) {
  const regex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  if (!value) return { valid: false, message: "Please pick a valid date." };
  if (!regex.test(value)) return { valid: false, message: "*Please pick a valid date." };

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day); date.setHours(0, 0, 0, 0);

  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day)
    return { valid: false, message: "Please enter a real, valid date." };

  const today = new Date(); today.setHours(0, 0, 0, 0);
  if (date < today) return { valid: false, message: "The due date cannot be in the past." };

  return { valid: true, message: "" };
}

/** Toggles priority selection in board view. */
function togglePriorityBoard(priority) {
  const urgentButton = document.getElementById("arrow-container-red-board");
  const mediumButton = document.getElementById("arrow-container-orange-board");
  const lowButton = document.getElementById("arrow-container-green-board");

  if (toggleIfActive(priority, urgentButton, mediumButton, lowButton)) {
    return getSelectedPriority();
  }

  urgentButton.classList.remove("active");
  mediumButton.classList.remove("active");
  lowButton.classList.remove("active");

  if (priority === "Urgent") urgentButton.classList.add("active");
  if (priority === "Medium") mediumButton.classList.add("active");
  if (priority === "Low") lowButton.classList.add("active");

  return getSelectedPriority();
}

/** Returns selected priority from board buttons. */
function getSelectedPriority() {
  const urgentButton = document.getElementById("arrow-container-red-board");
  const mediumButton = document.getElementById("arrow-container-orange-board");
  const lowButton = document.getElementById("arrow-container-green-board");

  if (urgentButton.classList.contains("active")) return "Urgent";
  if (mediumButton.classList.contains("active")) return "Medium";
  if (lowButton.classList.contains("active")) return "Low";
  return "No priority selected";
}

/** Toggles off active priority if already selected. */
function toggleIfActive(priority, urgentButton, mediumButton, lowButton) {
  if (priority === "Urgent" && urgentButton.classList.contains("active")) {
    urgentButton.classList.remove("active");
    return true;
  }
  if (priority === "Medium" && mediumButton.classList.contains("active")) {
    mediumButton.classList.remove("active");
    return true;
  }
  if (priority === "Low" && lowButton.classList.contains("active")) {
    lowButton.classList.remove("active");
    return true;
  }
  return false;
}

/** Loads and sorts contacts alphabetically. */
async function loadAndSortContacts() {
  const contactsUnsorted = await fetchContacts();
  const contacts = Object.values(contactsUnsorted);
  contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
  allContacts = contacts;
  return contacts;
}

/** Loads contacts into board dropdown. */
async function loadContactsForDropdownInBoard() {
  const container = document.getElementById("contacts-dropdown-board");
  if (!container) return;

  if (container.innerHTML === "") {
    try {
      const contacts = await loadAndSortContacts();
      for (const key in contacts) {
        container.innerHTML += getContactCardForDropdown(contacts[key]);
      }
      showCirclesInDropdownAddTask();
    } catch (error) {
      console.error("Error loading contacts:", error);
    }
  }

  container.classList.toggle("display-none");
}

/** Extracts initials for assigned contacts in board view. */
function getContactForCircleBoard() {
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
  renderCirclesForAssignedContactsBoard(nameInitialesArray);
  return nameInitialesArray;
}

/** Toggles styling of assigned-to input field. */
function changeAssignedToBoardInputStyle() {
  const inputfield = document.getElementById("inputfield-text-assign-board");
  inputfield.classList.toggle("inputfield-blue-border-top-right");
}

/** Renders contact circles (shared helper). */
function renderCircleItems(circleRenderContainer, circleClasses, nameInitialesArray) {
  for (let i = 0; i < Math.min(nameInitialesArray.length, 3); i++) {
    const initials = nameInitialesArray[i];
    circleRenderContainer.innerHTML += getAssignedCircleTemplate(circleClasses[i], initials);
  }
}

/** Renders assigned contact circles in board view. */
function renderCirclesForAssignedContactsBoard(nameInitialesArray) {
  const circleRenderContainer = document.getElementById("three-circle-container-board");
  circleRenderContainer.innerHTML = "";

  const circleClasses = ["single-circle-first", "single-circle-second", "single-circle-third"];

  if (nameInitialesArray.length === 0) {
    circleRenderContainer.classList.add("display-none");
    circleRenderContainer.classList.add("hidden");
    return;
  }

  renderCircleItems(circleRenderContainer, circleClasses, nameInitialesArray);
  circleRenderContainer.classList.remove("display-none", "hidden");

  if (nameInitialesArray.length > 3) {
    circleRenderContainer.innerHTML += `<div class="plus-counter">+${nameInitialesArray.length - 3}</div>`;
  }
}

/** Adds a subtask in board view. */
function subtaskIntoBoard() {
  const subtasksContainer = document.getElementById("subtasks-in-board");
  const inputfield = document.getElementById("inputfield-subtask-assign-in-board");
  const subtaskText = inputfield.value.trim();
  const i = document.getElementsByClassName("subtask-board-dot-and-text-div").length;

  if (!subtaskText) return;
  subtasksContainer.classList.remove("display-none");
  subtasksContainer.innerHTML += subtasksInBoard(i, subtaskText);
  inputfield.value = "";

}

/** Collects subtasks for Firebase (board view). */
function subtasksInfoForFirebase() {
  let subtasksArray = [];
  subtasksArray = [];
  const subtasksText = document.getElementsByClassName("subtasks-in-container");
  for (let i = 0; i < subtasksText.length; i++) {
    const subtask = subtasksText[i].textContent.trim();
    const notChecked = false;
    subtasksArray.push({
      subtaskText: subtask,
      statusCheckbox: notChecked
    });
  }
  return subtasksArray;
}

/** Handles creation of a new task in Firebase. */
async function handleTaskCreationBoard(status, taskTitel) {
  const inputsForTask = taskInfosForFirebaseBoard();
  const newTaskKey = taskTitel.value;
  const dataPost = await putRegistryDataBaseFunction(`tasks/${status}/` + newTaskKey, inputsForTask);
  clearInputFieldsForNewTaskBoard();
  showTaskAddedMessageBoard();
}

/** Validates and submits a new task to Firebase. */
async function postTaskIntoFirebaseBoard(status) {
  const taskTitel = document.getElementById("titleInputBoard");
  const taskDueDate = document.getElementById("dueDateInputBoard");
  const taskCategory = document.getElementById("inputfield-category-assign-board");
  const isDateValid = validateDueDateInputBoard();

  if (taskTitel.value && taskDueDate.value && taskCategory.value && isDateValid) {
    await handleTaskCreationBoard(status, taskTitel);
    await loadAllTasksFromFirebase();
  } else {
    validateInputBoard();
    validateDueDateInputBoard();
    validateCategoryInBoardInput();
  }
}