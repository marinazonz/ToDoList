"use strict";

const userName = document.querySelector("#userName");
const newToDoForm = document.querySelector("#new-todo-form");
const divListToDo = document.querySelector(".list");
const divItemToDo = document.querySelector(".todo-item");
const divItemContent = document.querySelector(".todo-conten");

window.onload = function () {
    //Get user name from storage
    const userNameStored = JSON.parse(localStorage.getItem("username")) || "";
    userName.value = userNameStored;

    //Render saved todolist
    if (toDoList) {
        renderTodos();
    }
};

//get todo list from the storage
const toDoList = JSON.parse(localStorage.getItem("todos")) || [];

//Store user name
userName.addEventListener("change", function (e) {
    //console.log(e.target.value);
    localStorage.setItem("username", JSON.stringify(e.target.value));
});

//Add and store a new toDo
newToDoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const todo = {
        content: e.target.elements.content.value,
        category: e.target.elements.category.value,
        done: false,
        createdAt: new Date().getTime(),
    };

    toDoList.push(todo);

    localStorage.setItem("todos", JSON.stringify(toDoList));

    //reset filds
    e.target.reset();

    //render todo list
    renderTodos();
});

//render Todo List
const renderTodos = function () {
    divListToDo.innerHTML = "";

    toDoList.forEach((todo) => {
        const html = `<div class="todo-item">
                    <label>
                        <input type="checkbox" id="inputCheckbox" />
                        <span class="bubble ${
                            todo.category === "business"
                                ? "business"
                                : "personal"
                        }"></span>
                    </label>

                    <div class="todo-content">
                        <input
                            type="text"
                            value='${todo.content}'
                            readonly
                        />
                    </div>

                    <div class="actions">
                            <button class="edit">Edit</button>
                            <button class="delete">Delete</button>
                    </div>
                </div>`;

        divListToDo.insertAdjacentHTML("afterbegin", html);

        const btnEditTodolist = document.querySelector(".edit");
        const btnDeleteTodolist = document.querySelector(".delete");

        //Delete todolist item
        btnDeleteTodolist.addEventListener("click", deletetodoListItem);

        //Edit todolist item
        btnEditTodolist.addEventListener("click", edittodoListItem);
    });
};

const deletetodoListItem = function (e) {
    const element = e.path[2];
    element.remove();

    const deletedElement = e.path[2].children[1].childNodes[1].value;
    const newToDoList = toDoList.filter(
        (data) => data.content != deletedElement
    );

    localStorage.setItem("todos", JSON.stringify(newToDoList));
};

const edittodoListItem = function (e) {
    const input = e.path[2].children[1].childNodes[1];
    // const input = e.target;
    input.removeAttribute("readonly");
    input.focus();

    const spanBubble = e.path[2].children[0].children[1];

    if (spanBubble.classList.contains("personal")) {
        input.style.color = "#ea40a4";
        input.style.fontSize = "1.5rem";
        input.style.transition = "0.2s ease-in-out";
    } else {
        input.style.color = "#3a82ee";
        input.style.fontSize = "1.5rem";
        input.style.transition = "0.2s ease-in-out";
    }
    setTimeout(function () {
        input.style.color = "var(--dark)";
        input.style.fontSize = "1.125rem";
    }, 400);

    input.addEventListener("blur", (e) => {
        input.setAttribute("readonly", true);
        console.log(e.target.value);
        console.log(e);

        //make localStorage works
        //check correct pathes
        //localStorage.setItem("todos", JSON.stringify(toDoList));
    });
};
