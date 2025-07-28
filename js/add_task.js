const toDoContent = document.getElementById("todo-content-box");
const toDoContentFinalDiv = document.getElementById("todo-content-task");
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
    overlayContent.innerHTML = getTaskOverlayTemplate();
  
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

    overlayContentToDo.innerHTML = getTaskOverlayTemplate();
  
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
    overlayContentProgress.innerHTML = getTaskOverlayTemplate();
  
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
    overlayAwaitFeedback.innerHTML = getTaskOverlayTemplate();
  
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
      <span id="contact-name-${contact.id}">${name}</span>
      <input id="contact-checkbox-${contact.id}" type="checkbox" class="contact-checkbox" data-contact-id="${contact.id || ''}">
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

function getInfoForNewTask() {
  let titel = taskTitel.value;
  let description = taskDescription.value || "No description";
  let dueDate = taskDueDate.value;
  let priority = getPriorityForNewTask();
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
  let category = taskCategory.value;
  let subtask = taskSubtask.value || "No subtasks";
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
      const newTaskKey = taskTitel.value;
      const dataPost = await putRegistryDataBaseFunction("tasks/toDo/" + newTaskKey, inputsForTask);
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

/*async function getTaskCountAndSmallestNumber() {
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
} evtl später für ID nutzen
*/

async function loadToDoTasksFromFirebase() {
  const response = await fetch(FireBaseUrl + 'tasks/toDo.json');
  const data = await response.json();

  toDoContentFinalDiv.innerHTML = '';
  const keys = Object.keys(data);
  if (data) {
    for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const task = data[key];
    toDoContentFinalDiv.innerHTML += generateToDoTaskHtml(task, key);
  }
  } else {
    toDoContentFinalDiv.innerHTML = '<div class="empty-todo-hint">Keine Aufgaben vorhanden.</div>';
  }
}

async function initAddTask() {
    await loadDataSignUp();
}