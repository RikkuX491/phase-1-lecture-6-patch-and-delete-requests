const foodIDElement = document.getElementById('food-id')

fetch("http://localhost:3000/foods")
.then(response => response.json())
.then(foods => {
    foods.forEach(food => {
        addFoodImageToMenu(foods, food)
        createOptionElement(food)
    })
})

fetch("http://localhost:3000/foods/1")
.then(response => response.json())
.then(food => {
    displayFoodDetails(food)
})

function addFoodImageToMenu(foods, food){
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
        fetch(`http://localhost:3000/foods/${food.id}`, {
            method: "DELETE"
        })
        .then(() => {
            foods = foods.filter(f => {
                return f.id !== food.id
            })
        })
    })
    foodDiv.appendChild(foodImage)
    foodDiv.appendChild(deleteButton)
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

function createOptionElement(food){
    const optionElement = document.createElement('option')
    optionElement.value = food.id
    optionElement.textContent = `${food.id}: ${food.name}`
    foodIDElement.appendChild(optionElement)
}

// Start coding here
// foodIDElement.addEventListener('change', (event) => {
//     console.log(event.target.value)
// })

const updateFoodForm = document.getElementById('update-food-form')
updateFoodForm.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const foodNameValue = document.getElementById('new-name').value
    const foodImageValue = document.getElementById('new-image').value
    const foodDescriptionValue = document.getElementById('new-description').value

    let updatedFood = {}
    if(foodNameValue !== ""){
        updatedFood = {...updatedFood, name: foodNameValue}
    }
    if(foodImageValue !== ""){
        updatedFood = {...updatedFood, image: foodImageValue}
    }
    if(foodDescriptionValue !== ""){
        updatedFood = {...updatedFood, description: foodDescriptionValue}
    }

    let counter = 0
    for(key in updatedFood){
        counter++
    }
    if(counter > 0){
        fetch(`http://localhost:3000/foods/${foodIDElement.value}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(updatedFood)
        })
    }
    else{
        alert("There is nothing to update. Please enter some values.")
    }
})