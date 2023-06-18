import '../pages/index.css';

import {getUserProfile} from './api.js';
import {updateUserProfile, updateUserAvatar, initModals} from './modal.js';
import {enableValidation} from './validate.js';
import {initCardsList} from './card.js';
import {renderError} from './utils.js';


window.onload = 
    function () {
        const settingsValid = {
            formSelector: '.form',
            inputSelector: '.form__input',
            submitButtonSelector: '.form__button',
            inactiveButtonClass: 'form__button_disable',
            inputErrorClass: 'form__input_type_error',
            errorClass: 'form__error_visible'
        };
        getUserProfile()
        .then((res) => {
            updateUserProfile(res.name, res.about);
            updateUserAvatar(res.avatar);
            initCardsList(res._id);
            initModals(settingsValid);
            enableValidation(settingsValid);
        })
        .catch((err) => {
            renderError(`Ошибка: ${err}`);
        });
};  


    