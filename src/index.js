let toyCollection = document.querySelector("#toy-collection")
let toyForm = document.querySelector(".add-toy-form")
let allToys = []

document.addEventListener("DOMContentLoaded", () => {
  fetchToys()

  document.addEventListener("click", (e) => {
    console.log(e.target.className)
    if (e.target.className == "like-btn") {
      let likes = e.target.parentElement.querySelector("p")
      let id = e.target.parentElement.dataset.id
      addLike(likes, id)
    }
  })

  toyForm.addEventListener("submit", toyFormSubmit)

}) //DOMContentLoaded

function addLike(newLike, toyId) {
  changeLike = ++newLike.innerText.split(" ")[0]
  newLike.innerText = `${changeLike} Likes`
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({likes: changeLike})
  })
  .then(resp => resp.json())
  .then(function(toy) {
  })
}

function toyFormSubmit(e) {
  e.preventDefault()
  let name = toyForm.querySelector("#name").value
  let image = toyForm.querySelector("#image").value
  createToy(name, image)
}

function createToy(toyName, toyImage, toyId) {
  fetch('http://localhost:3000/toys', {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({name: toyName, image: toyImage, likes: 0})
  })
  .then(resp => resp.json())
  .then(function(toy) {
    allToys.push(toy)
    addToyToPage(toy)
  })

}

function fetchToys() {
  toyCollection.innerHTML = ""
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(function(toys) {
    allToys = toys
    addToysToPage(toys)
  })
}

function addToysToPage(toys) {
  toys.forEach(toy => {
    addToyToPage(toy)
  })
}

function addToyToPage(toy) {
  toyCollection.innerHTML += `
  <div class="card" data-id=${toy.id}>
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  </div>
  `
}















































// const toyCollection = document.querySelector('#toy-collection')
//
// document.addEventListener("DOMContentLoaded", () => {
//   getFetch()
//
//
//   const createButton = document.querySelector(".submit")
//   .addEventListener("click", e => {
//     e.preventDefault();
//     let toyName = document.querySelector("#name").value
//     let toyImage = document.querySelector("#image").value
//     createToy(toyName, toyImage);
//   })
// }); //DOMContentLoaded
//
// function idButtons() {
//   let buttons = document.getElementsByClassName('like-btn');
//   for (let item of buttons) {
//     item.addEventListener("click", e => {
//       addALike(e.target.dataset.id, e.target.dataset.likes)
//     })
//   }
// }
//
// const allToys = []
// let addToy = false
//
// function getFetch() {
//   toyCollection.innerHTML = ""
//   fetch('http://localhost:3000/toys')
//   .then(toys => toys.json())
//   .then(function(parsed) {
//     for (var toy in parsed) {
//       allToys.push(parsed[toy]);
//       toyCollection.innerHTML += `
//       <div class="card">
//         <h2>${parsed[toy].name}</h2>
//         <img src="${parsed[toy].image}" class="toy-avatar" />
//         <p>${parsed[toy].likes} Likes </p>
//         <button class='like-btn' data-likes="${parsed[toy].likes}" data-id="${parsed[toy].id}" id="like-btn-${parsed[toy].id}">Like <3</button>
//       </div>`
//     }
//   })
//   .then(idButtons)
// }
//
// function createToy(toyName, toyImage) {
//   fetch("http://localhost:3000/toys", {
//     method: "POST",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify({name: toyName, image: toyImage, likes: 0})
//   })
//   .then(response => response.json())
//   .then(function(toy) {
//     allToys.push(toy)
//     getFetch()
//   })
// }
//
// function addALike(toyId, toyLikes) {
//   fetch(`http://localhost:3000/toys/${toyId}`, {
//     method: "PATCH",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify({likes: parseInt(toyLikes) + 1})
//   })
//   .then(response => response.json())
//   .then(function(toy) {
//     allToys.push(toy)
//     getFetch()
//   })
// }
//
// const addBtn = document.querySelector('#new-toy-btn')
