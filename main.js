//? вытаскиваем элементы
const todoContainer = document.querySelector("#todo-container");
const addForm = document.querySelector(".add-todo");
const addInput = document.querySelector(".add-input");
const addInput2 = document.querySelector(".add-input2");
const addInput3 = document.querySelector(".add-input3");
const addInput4 = document.querySelector(".add-input4");

const resetBtn = document.querySelector(".reset-btn");
const editModal = document.querySelector("#edit-modal");
const closeModalBtn = document.querySelector("#close-modal");
const editInput = document.querySelector("#edit-input");
const editInput2 = document.querySelector("#edit-input2");
const editInput3 = document.querySelector("#edit-input3");
const editInput4 = document.querySelector("#edit-input4");

const editCancel = document.querySelector("#edit-cancel");
const editSubmit = document.querySelector(".edit-submit");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

render();

function render() {
  todoContainer.innerHTML = "";

  todos.forEach((item) => {
    todoContainer.innerHTML += `<div class="todo-item">
    <img class = "image" src="${item.url}" alt="">
        <span>${item.name}</span>
        <span>${item.surname}</span>

        <span>${item.phone}</span>
        <div>
          <button id="${item.id}" class="edit-btn">Edit</button>
          <button id="${item.id}" class="delete-btn">Delete</button>
        </div>
      </div>`;
  });
}

addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    !addInput.value.trim() ||
    !addInput2.value.trim() ||
    !addInput3.value.trim() ||
    !addInput4.value.trim()
  ) {
    return;
  }

  const todo = {
    id: Date.now(),
    name: addInput.value,
    surname: addInput2.value,
    url: addInput3.value,
    phone: addInput4.value,
  };

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
  console.log(todos);

  addInput.value = "";
  addInput2.value = "";
  addInput3.value = "";
  addInput4.value = "";

  render();
});

resetBtn.addEventListener("click", () => {
  localStorage.removeItem("todos");

  todos = [];

  render();
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    todos = todos.filter((item) => item.id != e.target.id);

    localStorage.setItem("todos", JSON.stringify(todos));

    render();
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    editModal.style.visibility = "visible";

    const todoToEdit = todos.find((item) => item.id == e.target.id);

    editInput.value = todoToEdit.name;
    editInput2.value = todoToEdit.surname;
    editInput3.value = todoToEdit.url;
    editInput4.value = todoToEdit.phone;

    editInput.focus();

    editSubmit.id = e.target.id;
  }
});

closeModalBtn.addEventListener("click", () => {
  editModal.style.visibility = "hidden";
});

editCancel.addEventListener("click", () => {
  editModal.style.visibility = "hidden";
});

editSubmit.addEventListener("click", (e) => {
  if (
    !editInput.value.trim() ||
    !editInput2.value.trim() ||
    !editInput3.value.trim() ||
    !editInput4.value.trim()
  ) {
    return;
  }

  todos = todos.map((item) => {
    if (item.id == e.target.id) {
      item.name = editInput.value;
      item.surname = editInput2.value;
      item.url = editInput3.value;
      item.phone = editInput4.value;
    }
    return item;
  });

  localStorage.setItem("todos", JSON.stringify(todos));
  render();

  editCancel.click();
});
