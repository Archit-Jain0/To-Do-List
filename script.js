let draggedItem = null;

// Add a new task to the To-Do list
function addTask() {
  const taskInput = document.getElementById("new-task");
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  const taskList = document.getElementById("to-do-list");

  // Create a new list item (task)
  const listItem = document.createElement("li");
  listItem.textContent = taskText;
  listItem.draggable = true;
  listItem.classList.add("task-todo"); // Add default class

  // Add drag and drop event listeners
  listItem.addEventListener("dragstart", dragStart);
  listItem.addEventListener("dragend", dragEnd);

  taskList.appendChild(listItem);

  // Clear the input field
  taskInput.value = "";
}

// Drag and Drop Functions
function dragStart(e) {
  draggedItem = this; // Store the reference of the dragged item
  e.dataTransfer.effectAllowed = "move"; // Set the drag effect
}

function dragEnd() {
  draggedItem = null; // Clear the reference when dragging ends
}

// Allow dropping
function allowDrop(e) {
  e.preventDefault(); // Prevent default behavior
}

// Handle dropping of items
function drop(e) {
  e.preventDefault(); // Prevent default behavior
  if (draggedItem) {
    const targetList = this.querySelector("ul"); // Get the target list
    const targetId = this.id; // Get the target column ID

    // Update the class based on the target column
    if (targetId === "to-do") {
      draggedItem.className = "task-todo";
    } else if (targetId === "in-progress") {
      draggedItem.className = "task-in-progress";
    } else if (targetId === "done") {
      draggedItem.className = "task-done";
    }

    targetList.appendChild(draggedItem); // Append the dragged item to the new list
  }
}

// Handle deletion
function deleteTask(e) {
  e.preventDefault();
  if (draggedItem) {
    draggedItem.remove(); // Remove the dragged item from the DOM
  }
}

// Add event listeners to the columns for drop functionality
document.querySelectorAll(".column").forEach((column) => {
  column.addEventListener("dragover", allowDrop);
  column.addEventListener("drop", drop);
});
