const greeting = document.querySelector(".greeting");
const newToDoForm = document.querySelector("#new-todo-form");
const divListToDo = document.querySelector(".list");
const divItemToDo = document.querySelector(".todo-item");
const divItemContent = document.querySelector(".todo-content");
const date = new Date();
const time = date.getHours();

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

    toDoList.unshift(todo);

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
        const todoEl = document.createElement("div");
        todoEl.classList.add("todo-item");
        todoEl.innerHTML = `
                    <label>
                        <input type="checkbox" class="inputCheckbox" />
                        <span class="bubble ${
                            todo.category === "business"
                                ? "business"
                                : "personal"
                        }"></span>
                    </label>

                    <div class="todo-content">
                        <input
                            class="inputField"
                            type="text"
                            value='${todo.content}'
                            readonly
                        />
                    </div>

                    <div class="actions">
                            <button class="edit">Edit</button>
                            <button class="delete">Delete</button>
                    </div>`;

        divListToDo.appendChild(todoEl);

        const btnEditTodolist = todoEl.querySelector(".edit");
        const btnDeleteTodolist = todoEl.querySelector(".delete");
        const inputCheckbox = todoEl.querySelector(".inputCheckbox");

        //Delete todolist item
        btnDeleteTodolist.addEventListener("click", deletetodoListItem);

        //Edit todolist item
        btnEditTodolist.addEventListener("click", edittodoListItem);

        //todo item done
        inputCheckbox.addEventListener("click", todoItemDone);

        //render changing in done items
        if (todo.done != false) {
            todoEl.classList.add("done");
            inputCheckbox.checked = true;
        } else {
            todoEl.classList.remove("done");
        }
    });
};

const deletetodoListItem = function () {
    let current = document.querySelector(".delete");
    const element = current.parentNode.parentNode;

    let input = document.querySelector(".inputField");

    element.remove();

    const deletedElement = input.value;

    const newToDoList = toDoList.filter(
        (data) => data.content != deletedElement
    );

    localStorage.setItem("todos", JSON.stringify(newToDoList));
};

const edittodoListItem = function (e) {
    const todoParent = e.target.closest(".todo-item");

    const todoIndex = Array.prototype.indexOf.call(
        todoParent.parentNode.children,
        todoParent
    );

    const input = todoParent.querySelector(".inputField");

    input.removeAttribute("readonly");
    input.focus();

    const spanBubble = todoParent.querySelector(".bubble");

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

    input.addEventListener("blur", () => {
        input.setAttribute("readonly", true);
        const updatedTodo = toDoList[todoIndex];
        updatedTodo.content = input.value;
        toDoList[todoIndex] = updatedTodo;
        localStorage.setItem("todos", JSON.stringify(toDoList));
    });
};

const greetingTime = function () {
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

const todoItemDone = function (e) {
    const el = e.target.closest(".todo-item");

    const todoIndex = Array.prototype.indexOf.call(el.parentNode.children, el);
    const updatedTodo = toDoList[todoIndex];

    if (updatedTodo.done != false) {
        el.classList.remove("done");
        updatedTodo.done = false;
    } else {
        el.classList.add("done");
        updatedTodo.done = true;
    }
    console.log(updatedTodo);
    toDoList[todoIndex] = updatedTodo;
    console.log(toDoList[todoIndex]);
    localStorage.setItem("todos", JSON.stringify(toDoList));
};
