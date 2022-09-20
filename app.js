// const recipe1 = {
//   title: 'Recipe 1',
//   ingredients: ['Milk', 'Ice-cream', 'Blueberry', 'Dough'],
// };

// const recipe2 = {
//   title: 'Recipe 2',
//   ingredients: ['Milk', 'Egg', 'Apple', 'Dough'],
// };

// const recipe3 = {
//   title: 'Recipe 3',
//   ingredients: ['Orange juice', 'Cookies', 'Apple', 'Cheeze'],
// };

// const recipe4 = {
//   title: 'Recipe 3',
//   ingredients: ['Yogurt', 'Cookies', 'Banana', 'Milk'],
// };

// const recipes = [recipe1, recipe2, recipe3, recipe4];

const recipes = [
  {
    title: 'Recipe 1',
    ingredients: ['Milk', 'Ice-cream', 'Blueberry', 'Dough'],
  },

  {
    title: 'Recipe 2',
    ingredients: ['Milk', 'Egg', 'Apple', 'Dough'],
  },

  {
    title: 'Recipe 3',
    ingredients: ['Orange juice', 'Cookies', 'Apple', 'Cheeze'],
  },

  {
    title: 'Recipe 4',
    ingredients: ['Yogurt', 'Cookies', 'Banana', 'Milk'],
  },
];

////////////////////////////////

const searchBtn = document.querySelector('.search__btn');
const searchLabel = document.querySelector('.search__input');
const containerRecipe = document.querySelector('.found-recipes');

let getIngredient = [];

const getRecipesList = function (e) {
  e.preventDefault();

  containerRecipe.innerHTML = '';

  if (
    getIngredient.indexOf(
      searchLabel.value[0].toUpperCase() +
        searchLabel.value.slice(1).toLowerCase()
    ) === -1
  ) {
    getIngredient.push(
      searchLabel.value[0].toUpperCase() +
        searchLabel.value.slice(1).toLowerCase()
    );
  }

  // getIngredient = searchLabel.value;

  const recipe = recipes.filter(recipe =>
    recipe.ingredients.includes(...getIngredient)
  );
  // const intersection = array1.filter(el => array2.includes(el));

  recipe.forEach(function (rec) {
    const title = rec.title;
    const ingredient = rec.ingredients;

    // ingredient.style.color = 'blue';

    const html = `
    <div class="recipe-container">
    <div class="img"><img src="img/ziti-style.webp" alt="" /></div>
    <div class="recipe__item">
    <p>
    <h3>${title}</h3>
        <span>ingredients:</span>
        <ul class="ingredients__list">
          ${ingredient}
        </ul>
      </p>
    </div>
    </div>`;
    containerRecipe.insertAdjacentHTML('afterbegin', html);
  });
  console.log(getIngredient);
  console.log(recipe);
};

// Functions

// Event listeners
searchBtn.addEventListener('click', getRecipesList);

// var array1 = ['bat', 'cat', 'dog', 'sun', 'hut', 'gut'];
// var array2 = ['cat', 'sum', 'fun', 'run', 'hut'];

// const intersection = array1.filter(el => array2.includes(el));
// console.log(intersection);
