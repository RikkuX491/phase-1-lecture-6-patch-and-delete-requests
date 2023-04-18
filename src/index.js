const foodIdElement = document.getElementById('food-id')

fetch("http://localhost:3000/foods")
.then(response => response.json())
.then(foods => {
    foods.forEach(food => {
        addFoodImageToMenu(food)
        addOptionElement(food)
    })
})

fetch("http://localhost:3000/foods/1")
.then(response => response.json())
.then(food => {
    displayFoodDetails(food)
})

function addFoodImageToMenu(food){
    const restaurantMenu = document.getElementById('restaurant-menu')
    const foodDiv = document.createElement('div')
    const foodImage = document.createElement('img')
    foodImage.src = food.image
    foodImage.addEventListener('click', () => {
        displayFoodDetails(food)
    })
    const deleteButton = document.createElement('button')
    deleteButton.textContent = "DELETE"
    deleteButton.addEventListener('click', () => {
        // DELETE request
        fetch(`http://localhost:3000/foods/${food.id}`, {
            method: "DELETE"
        })
        alert(`Food #${food.id}: ${food.name} deleted!`)
    })
    foodDiv.append(foodImage, deleteButton)
    restaurantMenu.appendChild(foodDiv)
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
    foodIdElement.appendChild(optionElement)
}

const updateFoodForm = document.getElementById('update-food-form')
updateFoodForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const foodNameValue = document.getElementById('new-name').value
    const foodImageLinkValue = document.getElementById('new-image').value
    const foodDescriptionValue = document.getElementById('new-description').value

    let updatedFood = {}

    if(foodNameValue !== ""){
        updatedFood = {...updatedFood, name: foodNameValue}
    }
    if(foodImageLinkValue !== ""){
        updatedFood = {...updatedFood, image: foodImageLinkValue}
    }
    if(foodDescriptionValue !== ""){
        updatedFood = {...updatedFood, description: foodDescriptionValue}
    }

    let counter = 0
    for(key in updatedFood){
        counter++
    }

    if(counter > 0){
        // PATCH request
        fetch(`http://localhost:3000/foods/${foodIdElement.value}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(updatedFood)
        })

        alert("Content updated!")
    }
    else{
        alert("There is nothing to update. Please enter some information to update.")
    }
})
