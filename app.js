"use strict";

const userName = document.querySelector("#userName");
const newToDoForm = document.querySelector("#new-todo-form");
const divListToDo = document.querySelector(".list");
const divItemToDo = document.querySelector(".todo-item");
const btnEditTodolist = document.querySelector(".edit");
const btnDeleteTodolist = document.querySelector(".delete");

window.onload = function () {
    //Get user name from storage
    const userNameStored = JSON.parse(localStorage.getItem("username")) || "";
    userName.value = userNameStored;

    //Render saved todolist
    renderTodos();
};

//get todo list from the storage
const toDoList = JSON.parse(localStorage.getItem("todos")) || [];

//Store user name
userName.addEventListener("change", function (e) {
    //console.log(e.target.value);
    localStorage.setItem("username", JSON.stringify(e.target.value));
});

//Store and render toDo List
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

const renderTodos = function () {
    divListToDo.innerHTML = "";

    toDoList.forEach((todo) => {
        const html = `<div class="todo-item">
                    <label>
                        <input type="checkbox" />
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

        //Delete todolist item
        //btnDeleteTodolist.addEventListener("click", deletetodoListItem);
    });
};

const deletetodoListItem = function (e) {
    console.log(e);
};
