import {saveUserProfile, saveUserAvatar, createNewCard} from './api.js'
import {openPopup, closePopup, loadImage, renderError} from './utils.js';
import {createCard} from './card.js';
import {hideInputError, checkInputValidity, toggleButtonState} from './validate.js';


const editProfile = (formElement, profileName, profileAbout) => {
    formElement.username.value = `${profileName.textContent}`;
    formElement.aboutself.value = `${profileAbout.textContent}`;
    openPopup(formElement.closest('.popup'));
};

const handleFormEditSubmit = (evt, formElement, profileName, profileAbout) => {
    evt.preventDefault();
    const formButton = formElement.querySelector('.form__button');
    formButton.textContent = "Сохранение...";
    saveUserProfile(`${formElement.username.value}`, `${formElement.aboutself.value}`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } return Promise.reject(res.status);
            })
        .then((res) =>{
            profileName.textContent = `${formElement.username.value}`;
            profileAbout.textContent = `${formElement.aboutself.value}`;
            closePopup(formElement.closest('.popup'));
        })
        .catch((err) => {
            renderError(`Ошибка FormEditSubmit: ${err}`);
        })
        .finally(() => {
            formButton.textContent = "Сохранить";
        }); 
};

const handleFormAddSubmit = (evt, formElement, cardsContainer) => {
    evt.preventDefault();
    const formButton = formElement.querySelector('.form__button');
    const newCardname = `${formElement.titlecard.value}`;
    const newCardlink = `${formElement.refcard.value}`;
    
    formButton.textContent = "Сохранение...";
    createNewCard(newCardname, newCardlink)
    .then((res) => {
        if (res.ok) {
            return res.json();
        } return Promise.reject(res.status);
        })
    .then((res) =>{
        cardsContainer.prepend(createCard(res, true));
        formElement.reset()
        closePopup(formElement.closest('.popup'));
    })
    .catch((err) => {
        renderError(`Ошибка FormAddSubmit: ${err}`);
    })
    .finally(() => {
        formButton.textContent = "Сохранить";
    });
};

const updateUserProfile = (res) => {
    const profileName = document.querySelector('.profile__name');
    const profileAbout = document.querySelector('.profile__subtitle');
    profileName.textContent = res.name;
    profileAbout.textContent = res.about;
};

const updateUserAvatar = (link) => {
    loadImage(link)
    .then(() => {;})
    .catch((err) => {
        renderError(`Ошибка: ${err}`);
    });
};

const handleFormEditAvatarSubmit = (evt, formElement) => {
    evt.preventDefault();
    const formButton = formElement.querySelector('.form__button');
    const newImage = `${formElement.refava.value}`;
    
    formButton.textContent = "Сохранение..."
    saveUserAvatar(newImage)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } return Promise.reject(res.status);
            })
        .then((res) =>{
            renderError(newImage);
            updateUserAvatar(newImage);
            closePopup(formElement.closest('.popup'));
        })
        .catch((err) => {
            renderError(`Ошибка FormEditAvatarSubmit: ${err}`);
        })
        .finally(() => {
            formElement.reset()
            formButton.textContent = "Сохранить"
        });   
};
  
const initModals = (settingsValid) => {
    const editProfilePopup = document.getElementById('popup_edit_profile');
    const editForm =  editProfilePopup.querySelector('form');
    const addCardPopup = document.getElementById('popup_add_card');
    const addForm =  addCardPopup.querySelector('form');
    const editProfileButton = document.querySelector('.profile__button-edit');
    const addCardButton = document.querySelector('.profile__button-add');
    const profileName = document.querySelector('.profile__name');
    const profileAbout = document.querySelector('.profile__subtitle');
    const editAvatarPopup = document.getElementById('popup_avatar_edit');
    const avatarForm =  editAvatarPopup.querySelector('form');
    const editAvatarButton = document.querySelector('.profile__button-avatar-edit');

    const resetInputError = (formElement, settingsValid) => {
        const inputList = Array.from(formElement.querySelectorAll(settingsValid.inputSelector));
        const buttonElement = formElement.querySelector(settingsValid.submitButtonSelector);
        inputList.forEach((inputElement) => {
            hideInputError(settingsValid, formElement, inputElement);
        });
        toggleButtonState(settingsValid, inputList, buttonElement);
    };

    const initProfileButton = (formElement, settingsValid) => { 
        const inputList = Array.from(formElement.querySelectorAll(settingsValid.inputSelector));
        const buttonElement = formElement.querySelector(settingsValid.submitButtonSelector); 
        inputList.forEach((inputElement) => {
            checkInputValidity(settingsValid, formElement, inputElement);
        toggleButtonState(settingsValid, inputList, buttonElement);
        });
    };
    // button click
    editProfileButton.addEventListener('click', function(){
        resetInputError(editForm, settingsValid); 
        editProfile(editForm, profileName, profileAbout);
        initProfileButton(editForm, settingsValid);
    });
    
    addCardButton.addEventListener('click', function(){
        resetInputError(addForm, settingsValid);
        openPopup(addCardPopup);
    });
    
    editAvatarButton.addEventListener('click', function() {
        resetInputError(avatarForm, settingsValid);
        openPopup(editAvatarPopup);
    });
    // forms submit
    editForm.addEventListener('submit', (evt) => {
        handleFormEditSubmit(evt, editForm, profileName, profileAbout);
    });

    addForm.addEventListener('submit', (evt) => {
        const cardsContainer = document.querySelector('.places');
        handleFormAddSubmit(evt, addForm, cardsContainer);
    });

    avatarForm.addEventListener('submit', (evt) => {
        handleFormEditAvatarSubmit(evt, avatarForm);
    });
};

export {updateUserProfile, updateUserAvatar, initModals}