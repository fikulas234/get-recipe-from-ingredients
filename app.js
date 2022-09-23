const recipes = [
  {
    title: 'Strawberry Banana Smothie',
    ingredients: ['Strawberries', 'Banana', 'Greek yogurt', 'Milk'],
    detailedIngredients: [
      ['2 cups fresh strawberries, halved'],
      ['1 banana, quartered and frozen'],
      ['1/2 cup Greek yogurt'],
      ['1/2 cup milk'],
    ],
    instructions:
      'Add all ingredients to a high powered blender and blend until smooth.',
    img: 'strawberry-banana.webp',
    idMeal: 1,
  },

  {
    title: 'Mango Smoothie',
    ingredients: ['Mangoe', 'Banana', 'Milk', 'Yogurt'],
    detailedIngredients: [
      ['2 fresh mangoes or 2 cups of frozen mango'],
      [
        '1 small frozen banana (or half of a large banana), you can use unfrozen if using frozen mango',
      ],
      ['1/2 cup milk, dairy or dairy-free'],
      ['1/2 cup yogurt, dairy or dairy-free'],
    ],
    instructions:
      'Add all ingredients to a high-powered blender and blend until creamy.',
    img: 'mango-smoothie.webp',
    idMeal: 2,
  },

  {
    title: 'Mandarin Breakfast Smoothie',
    ingredients: [
      'Milk',
      'Yogurt',
      'Mandarin Oranges',
      'Banana',
      'Ground Flaxseeds',
      'Vanilla Extract',
    ],
    detailedIngredients: [
      ['1 ½ cups milk, dairy or dairy-free'],
      ['1 cup yogurt, dairy or dairy-free'],
      ['4 mandarin oranges, peeled'],
      ['4 mandarin oranges, peeled'],
      ['2 tablespoons ground flaxseeds'],
      ['1 teaspoon vanilla extract'],
    ],
    instructions:
      'Add all of the ingredients to a high powered blender, and blend until smooth.',
    img: 'mandarin-breakfast.webp',
    idMeal: 3,
  },

  {
    title: 'Peach Breakfast Smoothie',
    ingredients: [
      'Peach',
      'Milk',
      'Yogurt',
      'Vanilla Extract',
      'Cinnamon',
      'Ginger',
      'Chia ',
    ],
    detailedIngredients: [
      ['3 peaches, pitted and quartered'],
      ['1 1/2 cups milk, dairy or dairy-free'],
      ['1 cup yogurt, dairy or dairy-free'],
      ['1 tsp vanilla extract'],
      ['sprinkle of cinnamon'],
      ['sprinkle of ground ginger'],
      ['2 tbsp chia seeds, divided'],
    ],
    instructions:
      'Add all ingredients except the chia seeds to a high-powered blender. Blend on high until smooth and creamy. Then divide the peach smoothie between two Le Parfait jars or Mason jars. Add one tablespoon of chia seeds, add the lid and shake until well combined.',
    img: 'peach-breakfast.webp',
    idMeal: 4,
  },
];

////////////////////////////////

const searchBtn = document.querySelector('.search__btn');
const searchLabel = document.querySelector('.search__input');
const containerRecipe = document.querySelector('.found-recipes');
const ingredientsBtn = document.querySelector('.your-ingredients-container');
const ingredientsSection = document.querySelector('.your-ingredients-section');
const mealList = document.getElementById('meal');
const seeRecipe = document.querySelector('.see__details');
const detailsContent = document.querySelector('.see-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');
const overlay = document.querySelector('.overlay');
const suggestion = document.querySelector('.try');

let getIngredient = [];

// Functions
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

  getIngredient.forEach(function (ingr) {
    let ingrs = [];

    if (ingrs.indexOf(ingr) === -1) {
      ingrs.push(ingr);
      const arrIngrs = `<button>
      <span>${ingrs}</span>
      </button>`;
      ingredientsBtn.insertAdjacentHTML('afterbegin', arrIngrs);
    }
    console.log(ingrs);
  });

  recipes.forEach(function (rec) {
    const intersection = rec.ingredients.filter(ingr =>
      getIngredient.includes(ingr)
    );

    const title = rec.title;
    const ingredient = rec.ingredients;
    const img = rec.img;
    const id = rec.idMeal;

    if (intersection.length > 0) {
      const html = `
    <div class="recipe-container">
    <div class="img"><img src="img/${img}" alt="" /></div>
    <div class="recipe__item">
    <p>
    <h3 class="recipe__title">${title}</h3>
        <span>ingredients:</span>
        <ul class="ingredients__list">
          ${ingredient}
        </ul>
      </p>
      <a href="#" data-id="${id}" class="see-details-btn">See details</a>
    </div>
    </div>`;
      containerRecipe.insertAdjacentHTML('afterbegin', html);
    }

    // console.log('Intersection:', intersection);
    // console.log('ingredients:', ingredient);
  });
  // console.log('Ingredients:', getIngredient);
  searchLabel.value = '';
  suggestion.classList.add('hidden');
  ingredientsSection.classList.remove('remove');
};

const getMealRecipe = function (e) {
  e.preventDefault();
  if (e.target.classList.contains('see-details-btn')) {
    let mealItem = Number(e.target.dataset.id);
    recipeModal(mealItem);
    // console.log(mealItem);
  }
};

const recipeModal = function (id) {
  const foundMeal = recipes.find(rec => rec.idMeal === id);
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
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  seeRecipe.classList.remove('showRecipe');
  overlay.classList.add('hidden');
};

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && seeRecipe.classList.contains('showRecipe')) {
    closeModal();
  }
});

// Event listeners
mealList.addEventListener('click', getMealRecipe);
searchBtn.addEventListener('click', getRecipesList);
recipeCloseBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

////////////////////////////////
