//https://www.w3schools.com/howto/howto_js_todolist.asp
//https://www.geeksforgeeks.org/create-a-drag-and-drop-sortable-list-using-html-css-javascript/

//appendChild a dropdown list for einsienhower matrix, and based on that color coding
//https://www.w3schools.com/html/tryit.asp?filename=tryhtml_elem_select
//https://www.w3schools.com/html/html5_webstorage.asp

let nodeList = document.getElementsByTagName("LI");
for (let i = 0; i < nodeList.length; i++) {
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    nodeList[i].appendChild(span);
}

let close = document.getElementsByClassName("close");
for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

let list = document.querySelector('ul');
list.addEventListener('click', function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle('checked');
    }
}, false);

document.querySelectorAll('LI').forEach(li => li.draggable = true);

function newElement() {
    let li = document.createElement('li');
    let taskEntered = document.getElementById('taskEntered').value;
    let t = document.createTextNode(taskEntered);
    li.appendChild(t);
    if (taskEntered === '') {
        alert("Please enter your task");
    }
    else {
        document.getElementById('taskList').appendChild(li);
    }
    document.getElementById('taskEntered').value = "";

    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }    

    li.draggable = "true";
}

taskEntered.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        newElement();
    }
});

//draggable feature

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
        draggedItem.style.display = ""; //default
    }, 0);
});

draggableList.addEventListener("dragover", e => {
    e.preventDefault(); //allows draggedItem to be dropped
    const afterElement = getDragAfterElement(draggableList, e.clientY);
    if (afterElement === null) {
        draggableList.appendChild(draggedItem);
    }
    else {
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
        }
        else {
            return closest;
        }
    },
    { offset: Number.NEGATIVE_INFINITY, }
    ).element;
};