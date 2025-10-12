import { allDishes } from "./dishes.js";
import {containersForTypesDishes, renderDishes, fitlersContainers, createDishElement} from './showDishes.js'
import  {SUserChoice} from './choose-dishes.js';
const sortElementsOnButton = document.getElementById("sortButton");



function sortContainer(container, filter) {
    console.log(`container.getAttribute('typesOfDishes') = ${container.getAttribute('typesOfDishes')}`);
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    if (filter == 'all') {
        for (const dish of allDishes) {
            if (dish.category == container.getAttribute('typesOfDishes')) {
                container.appendChild(createDishElement(dish.keyword, dish.image, dish.price, dish.name, dish.count, dish.kind));
            }
        }
    }
    else {
        for (const dish of allDishes) {
            if (dish.kind == filter && dish.category == container.getAttribute('typesOfDishes')) {
                container.appendChild(createDishElement(dish.keyword, dish.image, dish.price, dish.name, dish.count, dish.kind));
            }
        }
    }
}

function clickedOption(option) {
    option.classList = ['filter-option-enable'];
    const container = option.parentElement;
    console.log(option);
    for (const obj of container.children) {
        if (obj != option) obj.classList = [];
    }
}


function callback(e) {
    const sourceEvent = e.target;
    clickedOption(sourceEvent);
    const targetForFiltering = sourceEvent.parentElement.parentElement.children[2].firstChild;
    console.dir(targetForFiltering);
    const filterValue = sourceEvent.getAttribute('filter');
    

    switch (filterValue) {
        case 'all':
            sortContainer(targetForFiltering, 'all');
            break;
        case 'fish':
            sortContainer(targetForFiltering, 'fish');
            break;
        case 'meat':
            sortContainer(targetForFiltering, 'meat');
            break;
        case 'veg':
            sortContainer(targetForFiltering, 'veg');
            break;
        case 'hot-drinks':
            sortContainer(targetForFiltering, 'hot-drinks');
            break;
        case 'cold-drinks':
            sortContainer(targetForFiltering, 'cold-drinks');
            break;
        case 'small':
            sortContainer(targetForFiltering, 'small');
            break;
        case 'medium':
            sortContainer(targetForFiltering, 'medium');
            break;
        case 'big':
            sortContainer(targetForFiltering, 'big');
            break;
    }
}

function createEvents(containersWithFilters) {
    for (const containerKey in containersWithFilters) {
        const container = containersWithFilters[containerKey];
        const childElements = container.children;
        clickedOption(childElements[0]);
        for (const filter of childElements) {
            filter.addEventListener('click', callback);
        }
    }
}

function main() {
    createEvents(fitlersContainers);
}

main();