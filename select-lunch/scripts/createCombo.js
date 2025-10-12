
import {lunchs} from './lunchs.js'
const mainContainer = document.querySelector('main'); // выбираем тэг <main>
let lunchSection = null;

// создание <section id="combos">
function createLunchSection(identificator) {
    let lunchSection = document.createElement('section');
    lunchSection.id = identificator;
    return lunchSection;
}

// создаём div<class="lunch">
function createLunchBlock(className) {
    const parentElement = lunchSection;
    const lunchBlock = document.createElement('div');
    lunchBlock.className = 'lunch';
    return lunchBlock;
}

/* создаём <div class='dish'>
            <img src=iconPath/>
            <p>${name}</p>
           </div> */
function createDishBlock(name, iconPath, spanText=null) {
    const dishBlock = document.createElement('div');
    dishBlock.className = 'dish';

    const imgTag = document.createElement('img');
    imgTag.src = iconPath;
    dishBlock.appendChild(imgTag);

    const paragraphTag = document.createElement('p');
    paragraphTag.innerText = name;
    dishBlock.appendChild(paragraphTag);
    
    if (spanText) {
        const span = document.createElement('span');
        span.innerText = spanText;
        dishBlock.appendChild(span);

        const applySpanStyle = () => {
            const paragraphStyle = window.getComputedStyle(paragraphTag);
            const paragraphFontSize = parseFloat(paragraphStyle.fontSize);
            if (paragraphFontSize > 0) {
                span.style.fontSize = (paragraphFontSize - 2) + 'px';
            } else {
                requestAnimationFrame(applySpanStyle);
            }
        };

        requestAnimationFrame(applySpanStyle);
    }
    return dishBlock;
}   
function main() {
    lunchSection = createLunchSection('lunchSection');

    const h2Header = document.createElement('h2');
    h2Header.innerText = 'Доступные для заказа комбо';
    lunchSection.appendChild(h2Header);

    const lunchSectionDiv = createLunchSection('combos');
    lunchSection.appendChild(lunchSectionDiv);

    let lunchBlocks = [];
    for (const block of lunchs) {
        let lunchBlock = createLunchBlock('lunch');
        for (const dish of block) {
            const dishBlock = createDishBlock(dish.name, dish.iconPath, dish.span);
            lunchBlock.appendChild(dishBlock);
        }
        lunchBlocks.push(lunchBlock);
    }
    lunchBlocks.forEach( (element) => {lunchSectionDiv.appendChild(element);});

    mainContainer.prepend(lunchSection);
}

main();