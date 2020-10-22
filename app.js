// varaiabler
const formEl = document.querySelector("#loginForm");
const userListEl = document.querySelector(".usersList");
const showUserButtonEl = document.querySelector(".showUsersButton");
const apiUrl = "https://reqres.in";
const userInfoContainer = document.querySelector(".userInfoContainer");
const errorMessageEl = document.querySelector("#loginErrorMessage");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(apiUrl + "/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: formEl["email"].value,
      password: formEl["password"].value,
    }),
  })
    .then((res) => res.json())
    .then((jsondata) => {
      if (jsondata.error) {
        document.querySelector("#loginErrorMessage").innerText = jsondata.error;
        errorMessageEl.innerText = jsondata.error;
        errorMessageEl.classList.remove("hide");
        showUserButtonEl.classList.add("hide");
      } else {
        const shoeUsersButtonEl = document.querySelector(".showUserbutton");
        showUserButtonEl.classList.remove("hide");
        errorMessageEl.classList.add("hide");
      }
    });
});
// event som händer när man klickar för att vissa och hämta namn listan 
showUserButtonEl.addEventListener("click", (e) => {
  fetch(apiUrl + "/api/users")
    .then((res) => res.json())
    .then((data) => {
      const users = data.data;
      const userList = users
        .map((user) => { // skappa ny li för att skappa namn listan
          return `<li class ="user" data-userid = ${user.id}>${user.first_name} ${user.last_name}</li>`;
        })
        .join("");
      userListEl.innerHTML = userList;
    });
});
userListEl.addEventListener("click", (e) => {
  const userId = e.target.dataset.userid;

  // fetch single user
  fetch(`${apiUrl}/api/users/${userId}`)
    .then((res) => res.json())
    .then((user) => {
      userInfoContainer.innerHTML = "";

      const name = document.createElement("p");
      name.innerText = user.data.first_name + " " + user.data.last_name;
      userInfoContainer.appendChild(name);

      const avatarImg = document.createElement("img");
      avatarImg.src = user.data.avatar;
      userInfoContainer.appendChild(avatarImg);

      const email = document.createElement("p");
      email.innerText = user.data.email;
      userInfoContainer.append(email);
    });
});
