const lists$ = document.querySelector("#lists");
const filter$ = document.querySelector("#filter");
let USERS = [];

async function start() {
  lists$.innerHTML = `<p>Loading...</p>`;
  try {
    const resp = await fetch("https://jsonplaceholder.typicode.com//users");
    const data = await resp.json();
    USERS = data;
    render(data);
  } catch (err) {
    lists$.style.color = "red";
    lists$.innerHTML = err.message;
  }
}

const render = (users = []) => {
  if (users.length === 0) {
    lists$.innerHTML = `<p>No matches found</p>`;
  } else {
    const html = users.map(toHTML).join("");
    lists$.innerHTML = html;
  }
};

const toHTML = (user) => {
  return `
    <li class="list-group-item">${user.name}</li>
    `;
};

filter$.addEventListener("input", (event) => {
  const value = event.target.value.toLowerCase();
  const filterUsers = USERS.filter((user) =>
    user.name.toLowerCase().includes(value)
  );
  render(filterUsers);
});

start();
