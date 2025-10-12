export const notificationObject = createNotificationObject();

// создание объекта уведомления
function createNotificationObject() {
    const notificationContainer = document.createElement('div');
    notificationContainer.id = 'notification';

    const divContainer = document.createElement('div');
    notificationContainer.appendChild(divContainer);

    const paragraph = document.createElement('p');
    paragraph.id = 'notification-text';
    divContainer.appendChild(paragraph);

    const btnNotification = document.createElement('button');
    btnNotification.id = 'notification-button', btnNotification.type='button';
    divContainer.appendChild(btnNotification);
    return notificationContainer;
}


// показ уведомления на экране
export function showNotification(object, type, btnText = "OK👌") {
    if (type === 'empty-cart') {
        var text = 'Ничего не выбрано. Выберите блюда для заказа';
    }
    else if (type === 'no-drink') {
        var text = 'Выберите напиток';
    }
    else if (type === 'no-main-dish-or-salad') {
        var text = 'Выберите главное блюдо/салат';
    }
    else if (type === 'no-soup-or-main-dish') {
        var text = 'Выберите суп или главное блюдо';
    }
    else if ('no-main-dish') {
        var text = 'Выберите главное блюдо';
    }

    object.children[0].children[0].innerText = text;
    object.children[0].children[1].innerText = btnText;
    object.classList = ['show'];
}

// инициализация событий уведомления
function initEventsOnNotification(object) {
    object.children[0].children[1].addEventListener('click', (event) => {notificationObject.classList = ['hide'];} );
}

document.querySelector('body').prepend(notificationObject);
initEventsOnNotification(notificationObject);
