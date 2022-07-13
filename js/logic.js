let form = document.getElementById("form");

let LocalData = JSON.parse(localStorage.getItem("posts")) || [];
let data = LocalData;

let list = document.createElement("div");
list.id = "list";
list.className = "list";

let searchIn = document.createElement("div");
searchIn.className = "serachIn";
let searchInput = document.createElement("input");
searchInput.className = "searchInput";
searchInput.addEventListener("input", searchHandler);

function searchHandler() {
  if (searchInput.value === "") {
    data = LocalData;
    renderTodos();
  } else {
    const searchedArray = LocalData.filter((item) =>
      item.task.toLowerCase().includes(searchInput.value.toLocaleLowerCase()) 
    );
    data = searchedArray;
    renderTodos();
  }
}

let search = document.createElement("img");
search.className = "search";
search.src = "./image/search.png";

searchIn.append(searchInput, search);
form.append(searchIn);
form.append(list);

let last_id = LocalData.length && LocalData[LocalData.length - 1].id + 1;
let counter = LocalData ? last_id : 0;

const createTodoItem = ({ task, id }) => {
  let li = document.createElement("div");
  li.className = "li";

  let input = document.createElement("input");
  input.className = "task";
  input.value = `${task}`;
  input.disabled = true;

  let edit = document.createElement("div");
  edit.innerHTML = "Edit";
  edit.className = "edit";

  edit.addEventListener("click", () => {
    if (edit.innerText.toLowerCase() == "edit") {
      input.disabled = false;
      edit.innerText = "Save";
    } else {
      input.disabled = true;
      edit.innerText = "edit";
      const find = data.findIndex((item) => item.id === id);
      data[find] = { ...data[find], task: input.value };
      localStorage.setItem("posts", JSON.stringify([...data]));
    }
  });

  let deleteBtn = document.createElement("img");
  deleteBtn.id = `${id}`;
  deleteBtn.className = "deleteBtn";
  deleteBtn.src = "./image/rubbish.png";
  deleteBtn.addEventListener("click", onDelete);

  list.append(li);
  li.append(input);
  li.append(edit);
  li.append(deleteBtn);
};

function renderTodos() {
  list.innerHTML = "";
  data.map((tododItem) => {
    createTodoItem(tododItem);
  });
}

function onDelete(e) {
  let itemId = Number(e.target.id);
  let filteredArray = data.filter((el) => el.id !== itemId);
  data = filteredArray;
  localStorage.setItem("posts", JSON.stringify(data));
  renderTodos();
}

renderTodos();
