let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  const form = document.querySelector(".add-toy-form")
  form.addEventListener("submit", addNewToy)
  getToysFromDB()
  addLike()
});
 
function getToysFromDB(){
  fetch ("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(data => data.forEach(toy => getToyToDom(toy)))
}

function getToyToDom(toy){
  const toyCollection = document.getElementById("toy-collection")
  const div = document.createElement("div")
  div.classList.add("card")
  const h2 = document.createElement("h2")
  h2.textContent = toy.name
  const img = document.createElement("img")
  img.src = toy.image
  img.classList.add("toy-avatar")
  const p = document.createElement("p")
  p.textContent = `${toy.likes} likes`
  const button = document.createElement("button")
  button.classList.add("like-btn")
  button.textContent = "Like"
  button.id = toy.id
  div.append(h2, img, p, button)
  toyCollection.append(div)
}

function addNewToy(event){
  event.preventDefault()
  // console.log("event", event)
  const [name, image] = event.target
  fetch ("http://localhost:3000/toys",{
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      name: name.value,
      image: image.value,
      likes: 0
    })
  })
    .then(resp => resp.json())
    .then(data => getToyToDom(data))
    name.value = ""
    image.value = ""
}
//like button partially completed
// function addLike(){
//   const button = document.getElementsByClassName('#like-btn')
//   button.addEventListener("click", (event) => {
//     event.preventDefault()
//     fetch(`http://localhost:3000/${toy.id}`),{
//       method: "PATCH",
//       header: {
//         "content-type": "application/json"
//       },
//       body: JSON.stringify({
//         likes: toy.likes +1
//       })
//     }
//       .then(resp => resp.json())
//       .then(data => {
        
//       })
//   })
// }