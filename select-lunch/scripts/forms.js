
export const fasterTimeDelivery = document.getElementById('faster-id');
export const certainTimeDeliveryRadioBtn = document.getElementById('by-the-time-id');
export const certainTimeInput = document.getElementsByClassName('by-time-delivery-section')[0];
export const selectSoupElement = document.getElementById('choose-soup-id');
export const selectMainDishElement = document.getElementById('choose-main-dish-id');
export const selectDrinkElement = document.getElementById('choose-drink-id');

export const formTag = document.querySelector('form');



certainTimeDeliveryRadioBtn.addEventListener("change", (e) => {certainTimeInput.classList = ['show']; });
certainTimeDeliveryRadioBtn.required = true;
fasterTimeDelivery.addEventListener('change', (e) => certainTimeInput.classList = ['hide']);