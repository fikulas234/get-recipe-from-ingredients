import { recipes } from './recipes.js';

////////////////////////////////

const searchBtn = document.querySelector('.search__btn');
const searchLabel = document.querySelector('.search__input');
const containerRecipe = document.querySelector('.found-recipes');
const ingredientsContainer = document.querySelector(
  '.your-ingredients-container'
);
// const ingredientsSection = document.querySelector('.your-ingredients-container');
const mealList = document.querySelector('.meal');
const seeRecipe = document.querySelector('.see__details');
const detailsContent = document.querySelector('.see-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');
const overlayBlur = document.querySelector('.overlay');

// Event listeners
mealList.addEventListener('click', getMealRecipe);
searchBtn.addEventListener('click', getRecipesList);
recipeCloseBtn.addEventListener('click', closeModal);
overlayBlur.addEventListener('click', closeModal);
ingredientsContainer.addEventListener('click', removeIngredient);

let getIngredient = [];

// Functions
function ingredientsPush() {
  if (!searchLabel.value) return;

  containerRecipe.innerHTML = '';
  ingredientsContainer.innerHTML = '';

  if (!getIngredient.includes(searchLabel.value)) {
    getIngredient.push(
      searchLabel.value.charAt(0).toUpperCase() + searchLabel.value.slice(1)
    );
  }

  currentIngredients(getIngredient);
}

function getRecipesList(e) {
  e.preventDefault();

  ingredientsPush();

  recipes.forEach(function (rec) {
    const foundIngredients = rec.ingredients.filter(ingr =>
      getIngredient.includes(ingr)
    );

    if (foundIngredients.length > 0) {
      let ingredientItems = rec.ingredients
        .map(ingredient => `<li>${ingredient}</li>`)
        .join('');

      foundIngredients.forEach(function (ingr) {
        ingredientItems = ingredientItems.replace(
          ingr,
          `<strong>${ingr}</strong>`
        );
      });

      let html = `
    <div class="recipe-container">
    <div class="img"><img src="img/${rec.img}" alt="" /></div>
    <div class="recipe__item">
    <h3 class="recipe__title">${rec.title}</h3>
        <span class="ingredients-span">Ingredients:</span>
        <ul class="ingredients__list">
          ${ingredientItems}
        </ul>
      <a href="#" data-id="${rec.idMeal}" class="see-details-btn">See details</a>
    </div>
    </div>
    `;

      containerRecipe.insertAdjacentHTML('afterbegin', html);
    } else {
      containerRecipe.innerHTML = '';
    }
  });
  searchLabel.value = '';
}

function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains('see-details-btn')) {
    const mealId = Number(e.target.dataset.id);
    recipeModal(mealId);
  }
}

const recipeModal = function (mealId) {
  const foundMeal = recipes.find(rec => rec.idMeal === mealId);
  const html = `
  <h2>${foundMeal.title}</h2>
        <h3>Ingredients:</h3>
        <ul class="detailed-instruction-list">
          <li>${foundMeal.detailedIngredients.join('<br/>')}</li>
        </ul>
        <h3>Instructions:</h3>
        <p>${foundMeal.instructions}</p>
        <img src="img/${foundMeal.img}" alt="">
  `;
  detailsContent.innerHTML = html;
  seeRecipe.classList.add('showRecipe');
  overlayBlur.classList.remove('hidden');
};

function closeModal() {
  seeRecipe.classList.remove('showRecipe');
  overlayBlur.classList.add('hidden');
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && seeRecipe.classList.contains('showRecipe')) {
    closeModal();
  }
});

function currentIngredients(curIngrs) {
  curIngrs.forEach(function (ingr, i) {
    const addedIngredients = `<button data-num="${i}" class="ingrBtn">
      <span>${ingr}</span>
      </button>`;
    ingredientsContainer.insertAdjacentHTML('beforeend', addedIngredients);
    i++;
  });
}

function removeIngredient(e) {
  if (
    e.target.parentElement.parentElement.classList.contains(
      'your-ingredients-container'
    )
  ) {
    const index = e.target.dataset.num;
    getIngredient.splice(index, 1);
    ingredientsContainer.innerHTML = '';
    currentIngredients(getIngredient);
    getRecipesList(e);
  }
}

////////////////////////////////
// const word = w => w === 'Milk';
/* recipes.forEach(rec =>
  console.log(rec.ingredients.some(word => word === searchLabel.value))
); */
