import '../pages/index.css';

import {getUserProfile} from './api.js';
import {updateUserProfile, updateUserAvatar} from './modals.js';
import {enableValidation} from './validate.js';


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
            updateUserProfile(res);
            updateUserAvatar(res.link);
            enableValidation(validationConfig);
    });
};


    