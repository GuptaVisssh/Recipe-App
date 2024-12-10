const searchBox = document.querySelector(".searchBox")
const searchBtn = document.querySelector(".searchBtn")
const recipeContainer = document.querySelector(".recipeContainer")
const recipeCloseButton = document.querySelector(".recipe-close-button")
const recipeDetails = document.querySelector(".recipe-details")


const fetchRecipes = async(query) =>{
    try {
        recipeContainer.innerHTML = `<h2>fetching recipes....</h2>`
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        const resData = await data.json()

        recipeContainer.innerHTML=""
        resData.meals.forEach(meal => {
            const recipeDiv = document.createElement("div")
            recipeDiv.classList.add("recipeItem")
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}">
                <h2>${meal.strMeal}</h2>
                <p><span>${meal.strArea}</span> Dish</p>
                <p>Belongs to <span>${meal.strCategory} </span> Category</p>
            `
            const button = document.createElement('button')
            button.classList.add('viewBtn')
            button.innerText='View Recipe'

            // Adding eventListener button 
            button.addEventListener('click',()=>{
                openRecipePopup(meal)
            })


            recipeContainer.appendChild(recipeDiv)
            recipeDiv.appendChild(button)
        });  

    } catch (error) {
        console.log("Error in recipe data", error);
    }    
}



// ! Fetching ingredients and measurements

const fetchIngredients =(meal)=>{
    let ingredientsList = "";
    for (let i=1; i<=20;i++){
        const ingredient = meal[`strIngredient${i}`]
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break
        }
    }
    return ingredientsList;
}


const openRecipePopup =(meal)=>{   
    recipeDetails.innerHTML=  `
    <h2>${meal.strMeal}</h2>
    <h3 class="ingredients">Ingredients: </h3>
    <ul>${fetchIngredients(meal)}</ul>
    <div>
        <h3 class="instructions">Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    
    `

    recipeDetails.parentElement.style.display = 'block'
}

searchBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput)
})

recipeCloseButton.addEventListener('click', ()=>{
    recipeDetails.parentElement.style.display = "none"
})