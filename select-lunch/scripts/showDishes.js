import { allDishes } from "./dishes.js";
const headerTag = document.getElementsByTagName('header')[0];
const mainTag = document.getElementsByTagName('main')[0];
const sectionSoupsTag = document.getElementById('section-soups');
const sectionMainDishesTag = document.getElementById(`section-main-dishes`);
const sectionSaladsTag = document.getElementById(`section-salads`);
const sectionDrinksTag = document.getElementById('section-drink');
const sectionDesertsTag = document.getElementById('section-deserts');

export const containersForTypesDishes = {
    'soups': createDishContainer('soups'),
    'main-dish': createDishContainer('main-dish'),
    'salads': createDishContainer('salads'),
    'drinks': createDishContainer('drinks'),
    'desserts': createDishContainer('desserts')
}

export const fitlersContainers = {
    'soups': createContainerWithFilters('soups'),
    'main-dish': createContainerWithFilters('main-dish'),
    'salads': createContainerWithFilters('salad|starters'),
    'drinks': createContainerWithFilters('drinks'),
    'desserts':  createContainerWithFilters('dessert')
}

function createContainerWithFilters(category) {
    let container = document.createElement('div');
    container.classList = ['container-filters'];
    let allElements = document.createElement('a');
    allElements.setAttribute('filter', 'all');

    allElements.innerText = 'Все';
    container.appendChild(allElements);
    if (category == 'soups' || category == 'main-dish' || category == 'salad|starters') {
        let fishItems = document.createElement('a');
        fishItems.innerHTML = 'рыбный';
        fishItems.setAttribute('filter', 'fish');

        let meatItems = document.createElement('a');
        meatItems.innerText = 'мясной';
        meatItems.setAttribute('filter', 'meat');

        let vegItems = document.createElement('a');
        vegItems.innerText = 'вегетарианский';
        vegItems.setAttribute('filter', 'veg');

        container.appendChild(fishItems),container.appendChild(meatItems),container.appendChild(vegItems);
    }
    if (category == 'drinks') {
        let hotItems = document.createElement('a');
        hotItems.innerText = 'горячие напитки';
        hotItems.setAttribute('filter', 'hot-drinks');

        let coldItems = document.createElement('a');
        coldItems.innerText = 'холодные напитки';
        container.appendChild(hotItems),container.appendChild(coldItems);
        coldItems.setAttribute('filter', 'cold-drinks');
    }
    if (category == 'dessert') {
        let smallItems = document.createElement('a');
        smallItems.innerText = 'маленькие порции';
        smallItems.setAttribute('filter', 'small');

        let mediumItems = document.createElement('a');
        mediumItems.innerText = 'средние порции';
        mediumItems.setAttribute('filter', 'medium');

        let bigItems = document.createElement('a');
        bigItems.innerText = 'большие порции';
        container.appendChild(smallItems),container.appendChild(mediumItems),container.appendChild(bigItems);
        bigItems.setAttribute('filter', 'big');
    }
    return container;
}

function createDishContainer(category) {
    const dishContainerUp = document.createElement('div');
    dishContainerUp.classList = ['dish-container-center'];
    const dishContainerDown = document.createElement('div');
    dishContainerDown.setAttribute('typesOfDishes', category);
    dishContainerDown.classList = ['dish-container'];
    dishContainerUp.appendChild(dishContainerDown);
    return dishContainerUp;
}

function appendContainerToSections() {
    sectionSoupsTag.appendChild(containersForTypesDishes['soups']);
    sectionMainDishesTag.appendChild(containersForTypesDishes['main-dish']);
    sectionDrinksTag.appendChild(containersForTypesDishes['drinks']);
    sectionSaladsTag.appendChild(containersForTypesDishes['salads']);
    sectionDesertsTag.appendChild(containersForTypesDishes['desserts']);
}



export function createDishElement(keyword, image, price, name, weight, kind) {
    const dishElement = document.createElement('div');
    dishElement.classList = ['dish-element'];

    const imageElement = document.createElement('img');
    imageElement.setAttribute('loading', 'eager');
    imageElement.src = image;
    imageElement.classList = ['image-dish'];
    dishElement.appendChild(imageElement);
    
    const nameElement = document.createElement('p');
    nameElement.classList = ['name-dish'];
    nameElement.innerText = name;
    dishElement.appendChild(nameElement);


    const priceElement = document.createElement('p');
    priceElement.classList = ['price-dish'];
    priceElement.innerText = `${price} руб.`;
    dishElement.appendChild(priceElement);

    const weightElement = document.createElement('p')
    weightElement.classList = ['weight-dish'];
    weightElement.innerText = weight.replace(`g`, ` гр.`).replace(`ml`, ` мл.`);
    dishElement.appendChild(weightElement);

    const btnAddToCart = document.createElement(`button`);
    btnAddToCart.classList = [`btn-add-to-buy-list`];
    btnAddToCart.innerText = `Добавить в корзину`;
    btnAddToCart.setAttribute("data-dish", keyword);
    btnAddToCart.setAttribute('title', 'Добавить в корзину');
    dishElement.appendChild(btnAddToCart);

    dishElement.setAttribute("data-kind", kind);
    return dishElement;
}

export function renderDishes(dishesArray) {
    for (const dish of dishesArray) {
        const dishElement = createDishElement(dish['keyword'], dish[`image`], dish[`price`], dish[`name`], dish[`count`], dish['kind']);
        if (dish[`category`] == `soups`) {
            containersForTypesDishes['soups'].firstChild.appendChild(dishElement);
        }
        else if (dish[`category`] == `main-dish`) {
            containersForTypesDishes['main-dish'].firstChild.appendChild(dishElement);
        }
        else if (dish[`category`] == `drinks`) {
            containersForTypesDishes[`drinks`].firstChild.appendChild(dishElement);
        }
        else if (dish['category'] == 'salads') {
            containersForTypesDishes['salads'].firstChild.appendChild(dishElement);
        }
        else if (dish['category'] == 'desserts') {
            containersForTypesDishes['desserts'].firstChild.appendChild(dishElement);
        }
    }
}

function main() {
    mainTag.style = `margin: ${headerTag.offsetHeight + 25}px 2rem;`;
    appendContainerToSections();
    sectionSoupsTag.insertBefore(fitlersContainers.soups, containersForTypesDishes.soups)
    sectionMainDishesTag.insertBefore(fitlersContainers["main-dish"], containersForTypesDishes["main-dish"]);
    sectionDrinksTag.insertBefore(fitlersContainers.drinks, containersForTypesDishes.drinks);
    sectionSaladsTag.insertBefore(fitlersContainers.salads, containersForTypesDishes.salads);
    sectionDesertsTag.insertBefore(fitlersContainers.desserts, containersForTypesDishes.desserts);

    renderDishes(allDishes);

}

main();