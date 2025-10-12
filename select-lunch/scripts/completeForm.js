import { allDishes } from "./dishes.js";
import { notificationObject, showNotification } from "./notification.js";

const formTag = document.querySelector('form');

function createInputDishContainer(dishes) {
    const inputDishContainer = document.createElement('div');
    inputDishContainer.id = "input-container";
    let dishTypes = {};
    for (const dish of dishes) {
        if (!Object.hasOwn(dishTypes, dish.category)) {
            dishTypes[dish.category] = document.createElement('select');
            dishTypes[dish.category].name = dish.category, dishTypes[dish.category].id = dish.category;
        }
    }

    for (const dishType in dishTypes) {
        inputDishContainer.appendChild(dishTypes[dishType]);
    }

    return inputDishContainer;
}

function callbackSubmit(event) {
    const formData = new FormData(formTag);
    // если корзина вообще пустая
    if (!formData.has('soups') && !formData.has('main-dish') && !formData.has('salads') && !formData.has(`drinks`) && !formData.has('desserts')) {
        showNotification(notificationObject, 'empty-cart');
    }
    // если выборан все, кроме напитка
    else if (formData.has('soups') && formData.has('main-dish') && formData.has('salads') && !formData.has(`drinks`) && formData.has('desserts'))
        showNotification(notificationObject, 'no-drink');
    // если выбран суп, но не выбраны главное блюдо/салат/стартер
    else if (formData.has('soups') && (!formData.has('main-dish') || !formData.has('salads')))
        showNotification(notificationObject, 'no-main-dish-or-salad');
    // если выбран суп, но не выбрано главное блюдо/салат/стартер
    else if (formData.has('salads') && (!formData.has('soup') || !formData.has('main-dish')))
        showNotification(notificationObject, 'no-soup-or-main-dish');
    // если выбран напиток/десерт
    else if (formData.has('drinks'))
        showNotification(notificationObject, 'no-main-dish');
}

export function putDishToOption(dishObject, formTag=document.querySelector('form')) {
    const selectTag = formTag.querySelector(`[name=${dishObject.category}]`);
    const optionTag = document.createElement('option');
    optionTag.value=dishObject.keyword;
    optionTag.selected = true;
    selectTag.appendChild(optionTag);
}

function main() {
    formTag.addEventListener('submit', callbackSubmit);
    formTag.appendChild(createInputDishContainer(allDishes));
}

main();
