/** Returns the HTML template for editing a saved subtask. 
 * @param {string} subtask - The subtask text to display in the input field.
 * @param {number} subtaskSavedCounter - Unique index used for element IDs and event binding.
 * @returns {string} HTML string representing the editable subtask UI component.
*/
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

/** Returns the HTML template for an assigned contact circle with name. 
 * @param {number} i - Index used to select the circle CSS class.
 * @param {string[]} circleClasses - Array of CSS class names for styling circles.
 * @param {string} initials - Initials displayed inside the circle.
 * @param {string} name - Full contact name displayed next to the circle.
 * @returns {string} HTML string for an assigned contact entry.
*/
function circleAssignedToTemplate(i, circleClasses, initials, name) {
  return `
  <div class="task-board-big-first-contact">
    <span class="${circleClasses[i]}">${initials}</span>
    <p class="task-board-big-first-contact-name">${name}</p>
  </div>
  `;
}

/** Returns the HTML template for an editable subtask in task edit mode. 
 * @param {string} taskKey - Unique identifier for the parent task.
 * @param {number} i - Index of the subtask within the task.
 * @param {string} subtaskText - Text content of the subtask.
 * @returns {string} HTML string representing an editable subtask component.
*/
function getEditSubtaskTemplate(taskKey, i, subtaskText) {
  return `
    <div class="subtasks-board-first-task-edit" id="subtasks-board-first-task-edit${taskKey}${i}">
      <div class="bullet-subtask-flexbox">
        <div class="subtask-bullet-margin-right">•</div>
        <span class="subtask-task-text-edit" id="subtask-task-text-edit${taskKey}${i}">${subtaskText}</span>
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

/** Returns the HTML template for a subtask displayed in the board view. 
 *  @param {number|string} i - Index used for generating unique element IDs.
 * @param {string} subtaskText - Text content of the subtask.
 * @returns {string} HTML string representing a board subtask component.
*/
function subtasksInBoard(i, subtaskText) {
  return `
  <div id="subtasks-in-container-board${i}" class="subtask-board-dot-and-text-div">
      <div class="flexbox-for-dot-subtask-text-board">
        <div>•</div>
        <p id="subtasks-in-container${i}" class="subtasks-in-container">${subtaskText}</p>
      </div>

      <div id="pen-and-bin-icons-board-div${i}" class="pen-and-bin-icons-board-div">
        <svg onclick="changeSubtasksInBoard('${i}', '${subtaskText}')" width="25" height="25" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_313493_6285" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="33" height="32">
          <rect x="0.5" width="32" height="32" fill="#2A3647"/>
          </mask>
          <g mask="url(#mask0_313493_6285)">
          <path d="M7.16667 25.3332H9.03333L20.5333 13.8332L18.6667 11.9665L7.16667 23.4665V25.3332ZM26.2333 11.8998L20.5667 6.29984L22.4333 4.43317C22.9444 3.92206 23.5722 3.6665 24.3167 3.6665C25.0611 3.6665 25.6889 3.92206 26.2 4.43317L28.0667 6.29984C28.5778 6.81095 28.8444 7.42761 28.8667 8.14984C28.8889 8.87206 28.6444 9.48873 28.1333 9.99984L26.2333 11.8998ZM24.3 13.8665L10.1667 27.9998H4.5V22.3332L18.6333 8.19984L24.3 13.8665Z" fill="#2A3647"/>
          </g>
        </svg>
        <div id="seperator-board${i}" class="seperator-board"></div>
        <svg onclick="deleteSubtasksInBoard('${i}')" id="bin-icon-before-edit-board${i}" class="bin-icon-before-edit-board" width="22" height="22" viewBox="0 0 24 24" fill="#2A3647" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_314135_4497" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
            <rect width="24" height="24"/>
            </mask>
              <g mask="url(#mask0_314135_4497)">
            <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"/>
          </g>
        </svg>
      </div>
    </div>
  `;
}

/** Returns the HTML template for turning a board subtask into an input field. 
 * @param {number|string} i - Index used for generating unique element IDs.
 * @param {string} subtaskText - Text content of the subtask.
 * @returns {string} HTML string representing a board subtask component.
*/
function changeSubtasksIntoInputfield(i, subtaskText) {
  return `
    <div class="new-subtask-inputfield-div">
    <input class="new-subtask-text-field" id="new-subtask-text-field${i}" type="text" value="${subtaskText}">
  </div>
    <div class="icons-board-subtask-flexbox">
      <svg onclick="deleteSubtasksInBoard('${i}')" id="bin-icon-before-edit-board${i}" class="bin-icon-before-edit-board" width="22" height="22" viewBox="0 0 24 24" fill="#2A3647" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_314135_4497" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
          <rect width="24" height="24"/>
          </mask>
            <g mask="url(#mask0_314135_4497)">
          <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"/>
        </g>
      </svg>
      <div id="seperator-board${i}" class="seperator-board"></div>
      <svg onclick="changedSubtasksBoard('${i}', '${subtaskText}')" width="18" height="18" viewBox="0 0 38 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.02832 15.0001L15.2571 26.0662L33.9717 3.93408" stroke="#2A3647" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
  `;
}

/** Returns the HTML template for a contact card inside the dropdown. 
 *  @param {Object} contact - Contact object containing id, firstName, and optional lastName.
 * @returns {string} HTML string representing a dropdown contact option.
 */

function getContactCardForDropdown(contact) {
  const name = contact.lastName
    ? `${contact.firstName} ${contact.lastName}`
    : contact.firstName;
  return `
    <label onclick="addBackgroundForDropwdown()" id="contact-option-add-task${contact.id}" class="contact-option">
      <div class="flexbox-for-dropdown-contacts-add-task">
        <div id="circle-initials-in-dropdown${contact.id}"></div>
        <span class="contact-name-dropdown" id="contact-name-${contact.id}">${name}</span>
      </div>
      <input id="contact-checkbox-${contact.id
    }" type="checkbox" class="contact-checkbox" data-contact-id="${contact.id || ""
    }">
    </label>
  `;
}

/** Returns the HTML template for a contact initials circle in the dropdown. 
 * @param {string} className - CSS class for styling the circle.
 * @param {string} initials - Contact initials to display.
 * @param {string} color - Background color for the circle.
 * @returns {string} HTML string for a styled initials circle.
*/
function getContactCircleTemplateDropwdown(className, initials, color) {
  return `
    <div class="${className}" style="background-color:${color}">
      <h6 class="initials-in-dropdown">${initials}</h6>
    </div>
  `;
}

/** Returns the HTML template for a generic contact initials circle. 
 *  @param {string} className - CSS class used to style the circle.
 * @param {string} initials - Contact initials to display inside the circle.
 * @returns {string} HTML string representing a contact avatar element.
*/
function getContactCircleTemplate(className, initials) {
  return `
    <div class="${className}">
      <h6>${initials}</h6>
    </div>
  `;
}

/** Returns the HTML template for an empty to-do state. */
function getEmptyTodoTemplate() {
  return `<div class="no-tasks-to-do">No tasks To do</div>`;
}

/** Returns the HTML template for an empty in-progress state. */
function getEmptyInProgressTemplate() {
  return `<div class="no-tasks-in-progress">No tasks To do</div>`;
}

/** Returns the HTML template for an assigned contact in the big task view. 
 * @param {string} circleClass - CSS class used to style the contact circle.
 * @param {string} initials - Contact initials displayed inside the circle.
 * @param {string} name - Full contact name displayed next to the circle.
 * @returns {string} HTML string representing an assigned contact entry in the detailed task view.
 */
function getAssignedContactBigTemplate(circleClass, initials, name) {
  return `
    <div class="task-board-big-first-contact-big">
      <span class="${circleClass}">${initials}</span>
      <p class="task-board-big-first-contact-name-big">${name}</p>
    </div>
  `;
}

/** Returns the HTML template for an assigned contact in the small task view.
 *  @param {string} circleClass - CSS class used to style the contact circle.
 * @param {string} initials - Contact initials displayed inside the circle.
 * @returns {string} HTML string representing a compact assigned contact avatar.
 */
function getAssignedContactLittleTemplate(circleClass, initials) {
  return `
    <div class="task-board-big-first-contact-big">
      <span class="${circleClass}">${initials}</span>
    </div>
  `;
}

/** Returns the HTML template for an unchecked subtask. 
 * @param {string|number} taskKey - Unique identifier of the parent task.
 * @param {number} i - Subtask index used for unique element IDs.
 * @param {string} category - Task category used for Firebase path.
 * @param {string} titel - Task title used for Firebase updates.
 * @param {string} text - Subtask text content.
 * @returns {string} HTML string representing an unchecked subtask item.
*/
function getSubtaskUncheckedTemplate(taskKey, i, category, titel, text) {
  return `
    <div class="subtasks-board-first-task task-margin-bottom-subtask" id="subtasks-board-first-task${taskKey}${i}">
      <input onclick="saveSubtaskStatus('${taskKey}', '${category}', '${titel}', '${i}'); subtaskCounter('${taskKey}')"
        class="checkbox-board-subtasks${taskKey} checkbox-style-big-task"
        id="checkbox-board-subtasks${taskKey}${i}"
        type="checkbox">
      <span class="checkbox-subtask-text">${text}</span>
    </div>
  `;
}

/** Returns the HTML template for a checked subtask. 
 * @param {string|number} taskKey - Unique identifier of the parent task.
 * @param {number} i - Subtask index used for unique element IDs.
 * @param {string} category - Task category used for Firebase updates.
 * @param {string} titel - Task title used for Firebase updates.
 * @param {string} text - Subtask text content.
 * @returns {string} HTML string representing a checked subtask item.
*/
function getSubtaskCheckedTemplate(taskKey, i, category, titel, text) {
  return `
    <div class="subtasks-board-first-task task-margin-bottom-subtask" id="subtasks-board-first-task${taskKey}${i}">
      <input onclick="saveSubtaskStatus('${taskKey}', '${category}', '${titel}', '${i}'); subtaskCounter('${taskKey}')"
        checked
        class="checkbox-board-subtasks${taskKey} checkbox-style-big-task"
        id="checkbox-board-subtasks${taskKey}${i}"
        type="checkbox">
      <span class="checkbox-subtask-text">${text}</span>
    </div>
  `;
}

/** Returns the HTML template for an assigned contact in edit mode. 
 *  @param {string|number} taskKey - Unique identifier of the task being edited.
 * @param {string} circleClass - CSS class used to style the contact circle.
 * @param {string} initials - Contact initials displayed inside the circle.
 * @returns {string} HTML string representing an assigned contact avatar in edit mode.
*/
function getAssignedContactEditTemplate(taskKey, circleClass, initials) {
  return `
    <div id="contact-in-edit-template${taskKey}" class="contact-in-edit-template">
      <span class="${circleClass}">${initials}</span>
    </div>
  `;
}

/** Returns the HTML template for a contact card inside the edit dropdown. 
 * @param {Object} contact - Contact object containing id and name data.
 * @param {string|number} taskKey - Unique identifier of the task being edited.
 * @param {string} initials - Contact initials shown in the avatar circle.
 * @param {string} name - Full display name of the contact.
 * @param {string} color - Background color for the avatar circle.
 * @returns {string} HTML string representing a selectable contact row in edit mode.
*/
function contactCardDropdownEditTemplate(contact, taskKey, initials, name, color) {
  return `
    <label onclick="toggleContactEditBackground('${contact.id}', '${taskKey}')" 
           class="contact-option-edit" 
           id="contact-option-edit${contact.id}${taskKey}">

      <span id="circles-edit${contact.id}${taskKey}" 
            class="circles-edit" 
            style="background-color:${color}">
        ${initials}
      </span>

      <div class="name-checkbox-flexbox">
        <span class="contact-name-edit" 
              id="contact-name-edit${contact.id}${taskKey}">
          ${name}
        </span>

        <input id="contact-checkbox-${contact.id}${taskKey}" 
              type="checkbox" 
              class="contact-checkbox-edit" 
              data-contact-id="${contact.id || ""}"
              data-contact-name="${name}">
      </div>

    </label>
  `;
}

/** Returns the HTML template for a circle shown in edit mode. 
 * @param {string} circleClass - CSS class used to style the circle.
 * @param {string} initials - Contact initials displayed inside the circle.
 * @returns {string} HTML string representing an edit-mode contact circle.
*/
function getEditCircleTemplate(circleClass, initials) {
  return `
    <div class="${circleClass}">${initials}</div>
  `;
}

/** Returns the HTML template for editing a subtask input in task edit mode. 
 * @param {string|number} taskKey - Unique identifier of the task.
 * @param {number|string} i - Index of the subtask used for element IDs.
 * @param {string} subtaskText - Current text of the subtask being edited.
 * @returns {string} HTML string representing an editable subtask input row.
*/
function getEditSubtaskInputTemplate(taskKey, i, subtaskText) {
  return `
    <div class="flexbox-inputfield-subtask-edit">
      <svg onclick="cancelEditSubtask('${taskKey}', '${i}')" 
          id="subtask-delete-icon-edit${taskKey}${i}" 
          class="subtask-delete-icon-edit" 
          width="24" height="24" viewBox="0 0 24 24" fill="none" 
          xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_314135_4497" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
          <rect width="22" height="22" fill="#D9D9D9"/>
        </mask>
        <g mask="url(#mask0_314135_4497)">
          <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"/>
        </g>
      </svg>

      <div id="subtask-inputfield-edit-seperator${taskKey}${i}" class="subtask-inputfield-edit-seperator"></div>

      <svg onclick="confirmChangeForEditSubtask('${taskKey}', '${i}', '${subtaskText}')" 
          id="subtask-confirm-icon-edit${taskKey}${i}" 
          class="subtask-confirm-icon-edit" 
          width="24" height="25" viewBox="0 0 24 25" fill="none" 
          xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_314253_4333" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
          <rect y="0.5" width="25" height="25" fill="#D9D9D9"/>
        </mask>
        <g mask="url(#mask0_314253_4333)">
          <path d="M9.55057 15.65L18.0256 7.175C18.2256 6.975 18.4631 6.875 18.7381 6.875C19.0131 6.875 19.2506 6.975 19.4506 7.175C19.6506 7.375 19.7506 7.6125 19.7506 7.8875C19.7506 8.1625 19.6506 8.4 19.4506 8.6L10.2506 17.8C10.0506 18 9.81724 18.1 9.55057 18.1C9.28391 18.1 9.05057 18 8.85057 17.8L4.55057 13.5C4.35057 13.3 4.25474 13.0625 4.26307 12.7875C4.27141 12.5125 4.37557 12.275 4.57557 12.075C4.77557 11.875 5.01307 11.775 5.28807 11.775C5.56307 11.775 5.80057 11.875 6.00057 12.075L9.55057 15.65Z" fill="#2A3647"/>
        </g>
      </svg>

      <input class="subtask-edit-inputfield" 
            id="subtask-edit-inputfield${taskKey}${i}" 
            type="text" value="${subtaskText}">
    </div>
  `;
}

/** Returns the HTML template for an assigned initials circle. 
 * @param {string} circleClass - CSS class used for styling the avatar circle.
 * @param {string} initials - Contact initials displayed inside the circle.
 * @returns {string} HTML string representing an assigned contact avatar.
*/
function getAssignedCircleTemplate(circleClass, initials) {
  return `
    <div class="${circleClass}">
      <h6>${initials}</h6>
    </div>
  `;
}
