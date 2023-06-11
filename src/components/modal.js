import { openPopup, closePopup } from './utils.js';
import {createCard} from './card.js';
import {hideInputError, checkInputValidity, toggleButtonState} from './validate.js';

const editProfile = (formElement, profileName, profileAbout) => {
    formElement.username.value = `${profileName.textContent}`;
    formElement.aboutself.value = `${profileAbout.textContent}`;
    openPopup(formElement.closest('.popup'));
};

const handleFormEditSubmit = (evt, formElement, profileName, profileAbout) => {
    evt.preventDefault();
    profileName.textContent = `${formElement.username.value}`;
    profileAbout.textContent = `${formElement.aboutself.value}`;
    closePopup(formElement.closest('.popup'));
};

const handleFormAddSubmit = (evt, formElement, cardsContainer) => {
    evt.preventDefault();
    const card = {}
    card['name'] = `${formElement.titlecard.value}`;
    card['link'] = `${formElement.refcard.value}`;
    cardsContainer.prepend(createCard(card));
    formElement.reset()
    closePopup(formElement.closest('.popup'));
};

export const initModals = (settingsValid) => {
    const editProfilePopup = document.getElementById('popup_edit_profile');
    const editForm =  editProfilePopup.querySelector('form');
    const addCardPopup = document.getElementById('popup_add_card');
    const addForm =  addCardPopup.querySelector('form');
    const editProfileButton = document.querySelector('.profile__button-edit');
    const addCardButton = document.querySelector('.profile__button-add');
    const profileName = document.querySelector('.profile__name');
    const profileAbout = document.querySelector('.profile__subtitle');


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

    editProfileButton.addEventListener('click', function(){
        resetInputError(editForm, settingsValid); 
        editProfile(editForm, profileName, profileAbout);
        initProfileButton(editForm, settingsValid);
    });

    addCardButton.addEventListener('click', function(){
        resetInputError(addForm, settingsValid);
        openPopup(addCardPopup);
    });
    
    editForm.addEventListener('submit', (evt) => {
        handleFormEditSubmit(evt, editForm, profileName, profileAbout);
    });

    addForm.addEventListener('submit', (evt) => {
        const cardsContainer = document.querySelector('.places');
        handleFormAddSubmit(evt, addForm, cardsContainer);
    });
};