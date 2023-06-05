// popups
const editProfilePopup = document.getElementById('popup_edit_profile');
const addCardPopup = document.getElementById('popup_add_card');
const viewImagePopup = document.getElementById('popup_view_image');
// form profile
const editForm =  editProfilePopup.querySelector('form');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__subtitle');
const editProfileButton = document.querySelector('.profile__button-edit');
const saveProfileButton = editProfilePopup.querySelector('.form__button');
const closeProfileEditButton = editProfilePopup.querySelector('.popup__button-close');
// form add cards
const addForm =  addCardPopup.querySelector('form');
const addCardButton = document.querySelector('.profile__button-add');
const createCardButton = addCardPopup.querySelector('.form__button');
const closeCardAddButton = addCardPopup.querySelector('.popup__button-close');
// popup image
const imgView = viewImagePopup.querySelector('.popup__view-image');
const imgTitle = viewImagePopup.querySelector('.popup__view-image-title');     
const closePopupImageButton = viewImagePopup.querySelector('.popup__button-close');
//
const cardsContainer = document.querySelector('.places');
const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.places__place-card');
//
const popupItems = [editProfilePopup, addCardPopup, viewImagePopup];
//

//
const placeCardsList = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
/*Valid*/
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
};
  
const hideInputError =  (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
    if (inputElement.validity.valueMissing) {
        inputElement.setCustomValidity(inputElement.dataset.errorEmpty);
  } else if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add('form__button_disable');
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove('form__button_disable');
    }
}; 

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const buttonElement = formElement.querySelector('.form__button');
    toggleButtonState(inputList, buttonElement);
    
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
        });
    });
}; 

const resetInputError = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement);
    });
};

const enableValidation = () => {
    formList = Array.from(document.querySelectorAll('.form')); 
     formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement);
  }); 
};
//
function closePopup(popup) {
    const form = popup.querySelector('form');
    if (form) {
        form.reset();
        resetInputError(form);
    }
    popup.classList.remove('popup_opened');
    popup.classList.add('popup_closed');
}

function openPopup(popup) {
    popup.classList.remove('popup_closed');
    popup.classList.add('popup_opened');
}

function viewImage(name, url) {
    imgView.src = url;
    imgView.alt = name;
    imgTitle.textContent = name;
    openPopup(viewImagePopup);
} 

function createCard(obj) {
    const cardItem = cardElement.cloneNode(true);
    cardItem.querySelector('.places__place-title-text').textContent = obj.name;
    cardItem.querySelector('.places__place-image').style.backgroundImage = `url(${obj.link})`;
    
    const deleteButton = cardItem.querySelector('.places__place-delete');
    deleteButton.addEventListener('click', function() {
        const listItem = deleteButton.closest('.places__place-card');
        listItem.remove();
      });
      
    const likeButton = cardItem.querySelector('.places__place-like');
    likeButton.addEventListener('click', function() {
        likeButton.classList.toggle('places__place-like_active');
    });
    
    const imageContainer = cardItem.querySelector('.places__place-image');
    imageContainer.addEventListener('click', function() {
        viewImage(obj.name, obj.link);
    });

    return cardItem;
}

function loadCards() {
    placeCardsList.forEach(function(obj){
        cardsContainer.append(createCard(obj));
    });
} 
document.addEventListener("DOMContentLoaded", loadCards);

function editProfile() {
    editForm.username.value = `${profileName.textContent}`;
    editForm.aboutself.value = `${profileAbout.textContent}`;
    enableValidation();
    openPopup(editProfilePopup);
}

function handleFormEditSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = `${editForm.username.value}`;
    profileAbout.textContent = `${editForm.aboutself.value}`;
    closePopup(editProfilePopup);
}

function handleFormAddSubmit(evt) {
    evt.preventDefault();
    const card = {}
    card['name'] = `${addForm.titlecard.value}`;
    card['link'] = `${addForm.refcard.value}`;
    cardsContainer.prepend(createCard(card));
    evt.target.reset()
    closePopup(addCardPopup);
}

function addCard(item) {
    cardsContainer.prepend(item);
    closePopup(addCardPopup);
}

editProfileButton.addEventListener('click', function(){
    editProfile();
});

editForm.addEventListener('submit', handleFormEditSubmit);

addCardButton.addEventListener('click', function(){
    enableValidation();
    openPopup(addCardPopup);
});
addForm.addEventListener('submit', handleFormAddSubmit);

closeProfileEditButton.addEventListener('click', function(){
    closePopup(editProfilePopup);
});

closeCardAddButton.addEventListener('click', function(){
    closePopup(addCardPopup);
});

closePopupImageButton.addEventListener('click', function(){
    closePopup(viewImagePopup);
});

document.addEventListener('click', function(evt){
    if (evt.target.classList.contains('popup')){
        return closePopup(evt.target);
    }

    if (evt.target.classList.contains('popup__view-image')){ 
        return closePopup(viewImagePopup);
    }    

    if (evt.target.name == 'profiledit') { 
        return closePopup(editProfilePopup); 
    }
    
    if ((evt.target.name == 'newplace') ||
        (evt.target.classList.contains('popup__container')) ||
        (evt.target.classList.contains('popup__form-heading'))){ 
            popupItems.forEach((item) => closePopup(item));  
    }   
});

document.addEventListener('keyup', function(evt){
    if (evt.key == 'Escape') {
        popupItems.forEach((item) => closePopup(item));    
    }
});



