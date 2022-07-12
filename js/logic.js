let form = document.getElementById("form");

let LocalData = JSON.parse(localStorage.getItem("posts"));
let data = LocalData ? [...LocalData] : [];

let list = document.createElement("ul");
list.id = "list";
form.append(list);

let last_id = LocalData && LocalData[LocalData.length - 1].id + 1;
let counter = LocalData ? last_id : 0;

const createTodoItem = ({ task, id }) => {
  let li = document.createElement("li");
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
  deleteBtn.src = src = "./image/rubbish.png";
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
