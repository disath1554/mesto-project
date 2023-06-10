
export const  closePopup = (popup) => {
    const form = popup.querySelector('form');
    if (form) {
        form.reset();
        /*resetInputError(form);*/
    }
    popup.classList.remove('popup_opened');
    popup.classList.add('popup_closed');
};

export const openPopup = (popup) => {
    popup.classList.remove('popup_closed');
    popup.classList.add('popup_opened');
};

document.addEventListener('click', function(evt){
    const popupList = Array.from(document.querySelectorAll('popup'));

    if (evt.target.classList.contains('popup')){
        return closePopup(evt.target);
    }

    if (evt.target.classList.contains('popup__view-image')){ 
        return closePopup(evt.target.closest('.popup'));
    }
    
    if (evt.target.classList.contains('popup__button-close')){ 
        return closePopup(evt.target.closest('.popup'));
    }

    if (evt.target.name == 'profiledit') { 
        return closePopup(evt.target.closest('.popup')); 
    }
    
    if ((evt.target.name == 'newplace') ||
        (evt.target.classList.contains('popup__container')) ||
        (evt.target.classList.contains('popup__form-heading'))){ 
            popupList.forEach((item) => closePopup(item));  
    }   
});

document.addEventListener('keyup', function(evt){
    const popupList = Array.from(document.querySelectorAll('popup')); 
    popupList.forEach((formElement) => {
    if (evt.key == 'Escape') {
        formElement.forEach((item) => closePopup(item));    
    }
    });
}); 