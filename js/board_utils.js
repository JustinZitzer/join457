/** Filters visible tasks based on the search input.
 * @param {HTMLElement[]} taskTitles - Array of elements containing task titles.
 * @param {HTMLElement[]} descriptions - Array of elements containing task descriptions.
 * @param {HTMLElement[]} toDos - Array of task container elements to show or hide.
 * @param {string} inputStart - The lowercase search string to match against task content.
 */
function filterTasksBySearch(taskTitles, descriptions, toDos, inputStart) {
  for (let i = 0; i < taskTitles.length; i++) {
    const title = taskTitles[i].textContent.trim().toLowerCase();
    const description = descriptions[i].textContent.trim().toLowerCase();
    const titleWords = title.split(" "),
      descriptionWords = description.split(" ");
    let match = false;

    for (let j = 0; j < titleWords.length; j++) {
      if (titleWords[j].startsWith(inputStart)) {
        match = true;
        break;
      }
    }

    for (let j = 0; j < descriptionWords.length; j++) {
      if (descriptionWords[j].startsWith(inputStart)) {
        match = true;
        break;
      }
    }
    toDos[i].classList.toggle("display-none", !match);
  }
}

/** Searches tasks by title or description and updates visibility. */
function searchTask() {
  const inputValue = document.getElementById("title-findtask-inputfield").value.trim().toLowerCase();
  const taskTitles = document.getElementsByClassName("task-titel-mini-task");
  const descriptions = document.getElementsByClassName("task-board-big-description");
  const toDos = document.getElementsByClassName("todo-content-box");
  const inputStart = inputValue.substring(0, 3);

  if (inputValue.length < 1) {
    for (let i = 0; i < toDos.length; i++) {
      toDos[i].classList.remove("display-none");
    }
    return;
  }

  filterTasksBySearch(taskTitles, descriptions, toDos, inputStart);
}

/** Toggles the category dropdown in the board overlay. */
function categoryUserOrTechnicalTaskBoard() {
  const input = document.getElementById("inputfield-category-assign-board");
  const dropdown = document.getElementById("category-dropdown-board");
  const isOpen = dropdown.classList.contains("open");
  dropdown.classList.toggle("open");
  input.classList.toggle("inputfield-blue-border-top-right");
  if (isOpen) {
    validateCategoryInBoardInput();
  }
}

/** Selects the User Story category in the board overlay. */
function selectUserCategoryBoard() {
  const inputfield = document.getElementById("inputfield-category-assign-board");
  inputfield.value = "User Story";
  categoryUserOrTechnicalTaskBoard();
}

/** Selects the Technical Task category in the board overlay. */
function selectTechnicalCategoryBoard() {
  const inputfield = document.getElementById("inputfield-category-assign-board");
  inputfield.value = "Technical Task";
  categoryUserOrTechnicalTaskBoard();
}

/** Replaces a board subtask with an editable input field.
 * @param {number} i - The index or identifier used to locate the subtask element.
 * @param {string} subtaskText - The current subtask text to prefill the input field.
 */
function changeSubtasksInBoard(i, subtaskText) {
  const subtaskDiv = document.getElementById(`subtasks-in-container-board${i}`);
  subtaskDiv.innerHTML = changeSubtasksIntoInputfield(i, subtaskText);
}

/** Saves the changed subtask text in the board overlay.
 * @param {number} i - The index or identifier used to locate the subtask in the board overlay.
 */
function changedSubtasksBoard(i) {
  const input = document.getElementById(`new-subtask-text-field${i}`);
  const newSubtaskText = input.value.trim();
  if (!newSubtaskText) return;

  const subtaskDiv = document.getElementById(`subtasks-in-container-board${i}`);
  subtaskDiv.innerHTML = subtasksInBoard(i, newSubtaskText);
}

/** Deletes a subtask from the board overlay.
 * @param {number} i - The index or identifier used to locate the subtask element.
 */
function deleteSubtasksInBoard(i) {
  const subtaskDiv = document.getElementById(`subtasks-in-container-board${i}`);
  if (subtaskDiv) {
    subtaskDiv.remove();
  }
}

/** Renders subtasks inside the big task view. 
 * @param {string|number} taskKey - Identifier for the task.
 * @param {Array} subtasks - Array of subtask objects.
 * @param {string} titel - Task title used in templates.
 * @param {string} category - Task category used in templates.
*/
function renderSubtasksInBigTask(taskKey, subtasks, titel, category) {
  const subtaksContainer = document.getElementById(`subtasks-board-tasks-div${taskKey}`);
  const subtasksEditDiv = document.getElementById(`subtasks-edit-div${taskKey}`);
  subtaksContainer.innerHTML = "";
  if (!subtasks) return;

  for (let i = 0; i < subtasks.length; i++) {
    const subtask = subtasks[i];
    if (!subtask) return;
    const text = subtask.subtaskText;

    if (subtask.statusCheckbox === false) {
      subtaksContainer.innerHTML += getSubtaskUncheckedTemplate(taskKey, i, category, titel, text);
    } else {
      subtaksContainer.innerHTML += getSubtaskCheckedTemplate(taskKey, i, category, titel, text);
    }
    subtasksEditDiv.innerHTML += getEditSubtaskTemplate(taskKey, i, text);
  }
}

/** Updates the subtask progress text. 
 * @param {string|number} taskKey - Identifier for the task.
 * @param {Array} subtasks - Array of subtask objects.
*/
function progressBarStyle(taskKey, subtasks) {
  const progressBarCounter = document.getElementById(`subtask-text${taskKey}`);
  if (!subtasks) return;
  for (let i = 0; i < subtasks.length; i++) {
    const subtask = subtasks[i];
    if (!subtask) return;
    progressBarCounter.innerHTML = `${i + 1}/${subtasks.length} subtasks`;
  }
}