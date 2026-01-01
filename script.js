//https://www.w3schools.com/html/html5_webstorage.asp

 const goalInputElement = document.getElementById('goal-input');
 const nextActionInputElement = document.getElementById('next-action-input');

// -- Display and add functionality to elements for existing tasks --

// Add close button to existing tasks
/*const nodeList = document.getElementsByTagName("LI");
for (let i = 0; i < nodeList.length; i++) {
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    nodeList[i].appendChild(span);
}

// Add functionality to close buttons to delete tasks on click
const close = document.getElementsByClassName("close");
for (let i = 0; i < close.length; i++) {
    close[i].addEventListener('click', function(e) {
        const div = e.target.parentElement;
        div.style.display = "none";
    });
}

// Mark tasks as completed on click
const list = document.querySelector('ul');
list.addEventListener('click', function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle('checked');
    }
}, false);

// Enable draggable feature for list items
document.querySelectorAll('LI').forEach(li => li.draggable = true);*/

// -- Implement functionality to create new tasks

// Function to create new tasks
function createNewTask() {
    const tr = document.createElement('tr');

    const goalInput = goalInputElement.value;
    const nextActionInput = nextActionInputElement.value;
    if (goalInput == '' || nextActionInput == '') {
        alert("Please enter your task completely");
        return;
    }

    const goalTd = document.createElement('td');
    goalTd.textContent = goalInput;
    const nextActionTd = document.createElement('td');
    nextActionTd.textContent = nextActionInput;

    goalInputElement.value = "";
    nextActionInputElement.value = "";

    const closeButton = document.createElement("button");
    closeButton.textContent = "\u00D7";
    closeButton.classList.add("close-btn");

    const closeButtonTd = document.createElement("td");
    closeButtonTd.append(closeButton);

    closeButton.addEventListener('click', function (e) {
        const tr = e.target.parentElement;
        tr.style.display = "none";
    });

    tr.draggable = "true";

    tr.append(goalTd, nextActionTd, closeButtonTd);
    document.getElementById('task-table').appendChild(tr);
}

// Add event listener to create task when enter key is pressed

const handleEnter = (e) => {
    if (e.key === "Enter") {
        createNewTask();
    }
}

goalInputElement.addEventListener("keydown", handleEnter);
nextActionInputElement.addEventListener("keydown", handleEnter);

// -- Implement draggable feature --

const draggableList = document.getElementById('taskList');
let draggedItem = null;

draggableList.addEventListener("dragstart", e => {
    draggedItem = e.target;
    draggedItem.classList.add("dragging");
    setTimeout(() => {
        draggedItem.style.display = "none";
    }, 0);
});

draggableList.addEventListener("dragend", e => {
    draggedItem.classList.remove("dragging");
    setTimeout(() => {
        draggedItem.style.display = "";
    }, 0);
});

draggableList.addEventListener("dragover", e => {
    e.preventDefault();
    const afterElement = getDragAfterElement(draggableList, e.clientY);
    if (afterElement === null) {
        draggableList.appendChild(draggedItem);
    } else {
        draggableList.insertBefore(draggedItem, afterElement);
    }
});

const getDragAfterElement = (container, y) => {
    const draggableElements = [...container.querySelectorAll("li:not(.dragging)"),];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child, };
        } else {
            return closest;
        }
    },
    { offset: Number.NEGATIVE_INFINITY, }
    ).element;
};