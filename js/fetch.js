form.addEventListener("submit", function (e) {
  e.preventDefault();

  let title = document.getElementById("title").value;
  let body = document.getElementById("body").value;
  let author = document.getElementById("author").value;
  author.className = "author";

  let newPost = `Title: ${title} Body: ${body} Author: ${author}`;

  if (newPost !== "") {
    data.push({
      id: counter++,
      task: newPost,
    });
    localStorage.setItem("posts", JSON.stringify(data));
    title = "";
    renderTodos();

    //   fetch("https://jsonplaceholder.typicode.com/posts", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       title: title,
    //       author: author,
    //       body: body,
    //     }),
    //     headers: {
    //       "Content-Type": "application/json; charset=UTF-8",
    //     },
    //   })
    //     .then(function (response) {
    //       return response.json();
    //     })
    //     .then(function (data) {
    //       console.log(data);
    //     });
  }
});
