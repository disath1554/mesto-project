/* Массив карточек для альтернативной загрузки */
const aphizImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', import.meta.url);
const chAreaImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg', import.meta.url);        
const ivanImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg', import.meta.url);          
const kamImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', import.meta.url);  
const hwAreaImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg', import.meta.url);         
const baykalImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg', import.meta.url);           

const placeCardsList = [
    { name: 'Архыз', link: aphizImage },
    { name: 'Челябинская область', link: chAreaImage },
    { name: 'Иваново', link: ivanImage },
    { name: 'Камчатка', link: kamImage },
    { name: 'Холмогорский район', link: hwAreaImage },
    { name: 'Байкал', link: baykalImage }
  ];

/* настройки валидации (не исп.) */
const settingsValid = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_disable',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__error_visible'
};

/* модель карточки  (не исп.)*/
const cardModel = {
  "likes": [],
  "_id": "",
  "name": "",
  "link": "",
  "owner": {
    "name": "",
    "about": "",
    "avatar": "",
    "_id": "",
    "cohort": ""
  },
  "createdAt": "" // date
}

export {placeCardsList, settingsValid, cardModel};