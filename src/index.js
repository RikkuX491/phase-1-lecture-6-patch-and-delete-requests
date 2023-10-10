let foodsArray
let foodToUpdate

let currentlySelectedFoodID

const selectElement = document.getElementById('food-id')
selectElement.addEventListener('change', (event) => {
    currentlySelectedFoodID = event.target.value

    foodToUpdate = foodsArray.find(food => {
        return food.id === Number(currentlySelectedFoodID)
    })
})

fetch("http://localhost:3000/foods")
.then(response => response.json())
.then(foods => {
    foodsArray = foods

    currentlySelectedFoodID = foods[0].id
    foodToUpdate = foodsArray.find(food => {
        return food.id === Number(currentlySelectedFoodID)
    })

    foods.forEach(food => {
        addFoodImageToMenu(food)
        addOptionElement(food)
    })

    displayFoodDetails(foods[0])
})

// fetch("http://localhost:3000/foods/1")
// .then(response => response.json())
// .then(food => {
//     displayFoodDetails(food)
// })

function addFoodImageToMenu(food){
    const restaurantMenu = document.getElementById('restaurant-menu')
    const divElement = document.createElement('div')
    const foodImage = document.createElement('img')
    foodImage.src = food.image
    foodImage.addEventListener('click', () => {
        displayFoodDetails(food)
    })

    const deleteButton = document.createElement('button')
    deleteButton.textContent = "DELETE"
    deleteButton.addEventListener('click', (event) => {
        event.target.parentNode.remove()

        fetch(`http://localhost:3000/foods/${food.id}`, {
            method: "DELETE"
        })
    })

    divElement.appendChild(foodImage)
    divElement.appendChild(deleteButton)
    restaurantMenu.appendChild(divElement)
}

function displayFoodDetails(food){
    const foodImage = document.querySelector('.detail-image')
    foodImage.src = food.image

    const foodName = document.querySelector('.name')
    foodName.textContent = food.name

    const foodDescription = document.querySelector('#description-display')
    foodDescription.textContent = food.description
}

function addOptionElement(food){
    const optionElement = document.createElement('option')
    optionElement.value = food.id
    optionElement.textContent = `${food.id}: ${food.name}`
    selectElement.appendChild(optionElement)
}

const updateFoodForm = document.getElementById('update-food-form')
updateFoodForm.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const newNameInputElement = document.getElementById('new-name')
    const newImageInputElement = document.getElementById('new-image')
    const newDescriptionInputElement = document.getElementById('new-description')
    
    let foodInfoForUpdate = {}

    if(newNameInputElement.value !== ""){
        foodInfoForUpdate = {name: newNameInputElement.value}
    }
    if(newImageInputElement.value !== ""){
        foodInfoForUpdate = {...foodInfoForUpdate, image: newImageInputElement.value}
    }
    if(newDescriptionInputElement.value !== ""){
        foodInfoForUpdate = {...foodInfoForUpdate, description: newDescriptionInputElement.value}
    }

    fetch(`http://localhost:3000/foods/${currentlySelectedFoodID}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(foodInfoForUpdate)
    })

    foodsArray = foodsArray.map(food => {
        if(food.id === foodToUpdate.id){
            return {...foodToUpdate, ...foodInfoForUpdate}
        }
        else{
            return food
        }
    })
    
    const restaurantMenu = document.getElementById('restaurant-menu')
    restaurantMenu.innerHTML = ""
    selectElement.innerHTML = ""

    foodsArray.forEach(food => {
        addFoodImageToMenu(food)
        addOptionElement(food)
    })
})