"use strict";

const greeting = document.querySelector(".greeting");
const newToDoForm = document.querySelector("#new-todo-form");
const divListToDo = document.querySelector(".list");
const divItemToDo = document.querySelector(".todo-item");
const divItemContent = document.querySelector(".todo-conten");

//date
const date = new Date();

window.onload = function () {
    //greeting
    greetingTime();

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
                            id="inputValue"
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
        const bubble = document.querySelector(".bubble");

        //Delete todolist item
        btnDeleteTodolist.addEventListener("click", deletetodoListItem);

        //Edit todolist item
        btnEditTodolist.addEventListener("click", edittodoListItem);
    });
};

const deletetodoListItem = function (e) {
    let current = document.querySelector(".delete");
    const element = current.parentNode.parentNode;
    //console.log(e.path[2].children[1].childNodes[1].value);

    let input = document.querySelector("#inputValue");

    element.remove();

    const deletedElement = input.value;

    const newToDoList = toDoList.filter(
        (data) => data.content != deletedElement
    );

    localStorage.setItem("todos", JSON.stringify(newToDoList));
};

const edittodoListItem = function (e) {
    let current = document.querySelector(".edit");

    console.log(current.parentNode);

    //const input = current.parentNode.previousElementSibling.firstElementChild;
    const input = e.path[2].children[1].childNodes[1];
    // const input = e.target;
    input.removeAttribute("readonly");
    input.focus();

    const spanBubble = e.path[2].children[0].children[1];
    // console.log(current.parentElement.previousElementSibling.previousElementSibling.lastElementChild)

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
        //check correct pathes for edit
        //localStorage.setItem("todos", JSON.stringify(toDoList));
    });
};

const greetingTime = function () {
    let time = date.getHours();
    console.log(time);

    greeting.innerHTML = "";
    const html = `<h2 class="title">
                        Good ${
                            time >= 12 && time <= 18
                                ? "afternoon"
                                : time > 18 && time <= 24
                                ? "evening"
                                : "morning"
                        },
                            <input
                                type="text"
                                id="userName"
                                placeholder="write your name here"
                            />
                    </h2>`;
    greeting.insertAdjacentHTML("afterbegin", html);

    const userName = document.querySelector("#userName");

    //Store user name
    userName.addEventListener("change", function (e) {
        //console.log(e.target.value);
        localStorage.setItem("username", JSON.stringify(e.target.value));
    });
};
