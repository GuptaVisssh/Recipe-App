const searchBox = document.querySelector(".searchBox")
const searchBtn = document.querySelector(".searchBtn")
const recipeContainer = document.querySelector(".recipeContainer")


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

            recipeContainer.appendChild(recipeDiv)
        });

       




        console.log(resData.meals[1]);
        
        
    } catch (error) {
        console.log("Error in recipe data", error);
    }    
}


searchBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput)
})