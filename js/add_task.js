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
