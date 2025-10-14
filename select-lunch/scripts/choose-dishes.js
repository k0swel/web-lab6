import { allDishes } from './dishes.js';

export let cart = new Set();
let dishTags = {
    'soups': document.getElementById('dishSoup'),
    'main-dish': document.getElementById('dishMainDish'),
    'drinks': document.getElementById('dishDrink'),
    'salads': document.getElementById('dishSalad'),
    'desserts': document.getElementById('dishDessert')
};
let paragraphtotalPayTag = document.getElementById('paragraph-total-pay');
let btnReset = document.getElementById('btn-reset');
let btnSubmit = document.getElementById('btn-submit');

export class SUserChoice {
    constructor(value, name, price, category) {
        this.keyword = value;
        this.name = name;
        this.price = price;
        this.category = category;
    }
}

// Оптимизированная функция для подсчета блюд по категориям
function getCartCountByCategory() {
    const counts = {
        'soups': 0,
        'main-dish': 0,
        'drinks': 0,
        'salads': 0,
        'desserts': 0
    };
    
    for (const element of cart) {
        if (counts.hasOwnProperty(element.category)) {
            counts[element.category]++;
        }
    }
    
    return counts;
}

function callbackOnClick(event) {
    const tagData = event.target.getAttribute('data-dish');
    console.log(`tagData`);
    console.log(tagData);
    
    const currentDish = allDishes.find(object => object.keyword === tagData);
    if (!currentDish) return;
    
    const purpose = new SUserChoice(tagData, currentDish.name, currentDish.price, currentDish.category);
    const cartCounts = getCartCountByCategory();
    
    if (cartCounts[purpose.category] > 0) {
        for (const element of cart) {
            if (element.category === purpose.category) {
                cart.delete(element);
                break; 
            }
        }
    }
    cart.add(purpose);
    addElementsToPageAndCalculateTotalPay(purpose);
}


export function showHideAllCartElements(action) {
    switch (action) {
        case 'show':
            Object.values(dishTags).forEach(tag => {
                if (tag && tag.parentElement) {
                    tag.parentElement.classList.remove('hide');
                    tag.parentElement.classList.add('show');
                }
            });
            break;
        case 'hide':
            Object.values(dishTags).forEach(tag => {
                if (tag && tag.parentElement) {
                    tag.innerText = "Не выбрано";
                    tag.parentElement.classList.remove('show');
                    tag.parentElement.classList.add('hide');
                }
            });
            paragraphtotalPayTag.parentNode.classList = ['hide'];
            const paragraphNothingChoose = document.querySelector('#paragraph-nothing-choice');
            paragraphNothingChoose.classList = ['show'];
            break;
    }
}

function addElementsToPageAndCalculateTotalPay(element) {
    if (dishTags[element.category]) {
        dishTags[element.category].innerText = `${element.name} ${element.price} руб.`;
    }
    
    if (cart.size > 0) {
        showHideAllCartElements('show');
        document.getElementById('paragraph-nothing-choice').classList = ['hide'];
        paragraphtotalPayTag.parentNode.classList = ['show'];
    }
    else if (cart.size == 0) {
        showHideAllCartElements('hide');
        document.getElementById('paragraph-nothing-choice').classList = ['show'];
        paragraphtotalPayTag.parentNode.classList = ['hide'];
    }
    
    let totalSum = 0;
    cart.forEach(object => totalSum += object.price);
    paragraphtotalPayTag.innerHTML = `Общая стоимость = ${totalSum} руб.`;
}

function registerEventsOnButtons() {
    const btnsAddToCart = document.getElementsByClassName('btn-add-to-buy-list');
    for (const btn of btnsAddToCart) {
        btn.addEventListener('click', callbackOnClick);
    }

}

function main() {
    registerEventsOnButtons();
}

main();