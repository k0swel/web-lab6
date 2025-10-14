import { allDishes } from "./dishes.js";
import { notificationObject, showNotification } from "./notification.js";
import { formTag } from "./forms.js";
import { cart } from "./choose-dishes.js";
import {showHideAllCartElements} from './choose-dishes.js';

// создание контейнера с select блюд
function createInputDishContainer(dishes) {
    const inputDishContainer = document.createElement('div');
    inputDishContainer.id = "input-container";
    let dishTypes = {};
    for (const dish of dishes) {
        if (!Object.hasOwn(dishTypes, dish.category)) {
            dishTypes[dish.category] = document.createElement('select');
            dishTypes[dish.category].name = dish.category;
            dishTypes[dish.category].id = dish.category;
            inputDishContainer.appendChild(dishTypes[dish.category]);

        }
    }
    return inputDishContainer;
}


function callbackReset(event) {
    event.preventDefault();
    for (const dish of cart) {
        removeDishFromSelectTag(dish); // удаляем блюдо из тега <form>.
    }
    cart.clear();
    showHideAllCartElements('hide');
    
    const inputTags = document.querySelectorAll('input, textarea');
    inputTags.forEach( (tag) => tag.value = '');
}

function callbackSubmit(event) {
    event.preventDefault();
    const formData = new FormData(formTag);

    for (const dish of cart) {
        formData.append(dish.category, dish.keyword);
        setSelectedDishInSelectTag(dish)
    }


    // если корзина вообще пустая
    if (!formData.has('soups') && !formData.has('main-dish') && !formData.has('salads') && !formData.has(`drinks`) && !formData.has('desserts')) {
        showNotification(notificationObject, 'empty-cart');
        return;
    }
    // если выборан все, кроме напитка
    else if (formData.has('soups') && formData.has('main-dish') && formData.has('salads') && !formData.has(`drinks`) && formData.has('desserts')) {
        showNotification(notificationObject, 'no-drink');
        return;
    }
    // если выбран суп, но не выбраны главное блюдо/салат/стартер
    else if ( formData.has('soups') && !(formData.has('main-dish') || formData.has('salads') )  ) {
        showNotification(notificationObject, 'no-main-dish-or-salad');
        return;
    }
    // Выбран салат/стартер, но не выбраны суп/главное блюдо	
    else if (formData.has('salads') && !(formData.has('soup') || formData.has('main-dish'))) {
        showNotification(notificationObject, 'no-soup-or-main-dish');
        return;
    }
    // если выбран напиток/десерт
    else if ( (formData.has('drinks') || formData.has('desserts') ) && !formData.has('main-dish')) {
        showNotification(notificationObject, 'no-main-dish');
        return;
    }    
    formTag.submit();
}

export function setSelectedDishInSelectTag(dishObject, formTag=document.querySelector('form')) {
    const selectTag = formTag.querySelector(`select[name=${dishObject.category}]`);
    selectTag.appendChild(new Option('', dishObject.keyword, false, true));
}

function removeDishFromSelectTag(dishObject, formTag=document.querySelector('form')) {
    const optionTag = formTag.querySelector(`option[value="${dishObject.keyword}"]`);
    try {
    optionTag.remove();
    }
    catch (error) {
        console.log(error);
    }
}

function main() {
    formTag.addEventListener('submit', callbackSubmit);
    formTag.addEventListener('reset', callbackReset);
    document.querySelector(`form`).appendChild(createInputDishContainer(allDishes));
}

main();
