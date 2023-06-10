// utils

const setEscEventListener = (evt) => {
        if (evt.key === 'Escape') {
            const popupList = Array.from(document.querySelectorAll('.popup'));
            popupList.forEach((popupItem) => closePopup(popupItem));  
        }    
};
   
export const  closePopup = (popupItem) => {
    document.removeEventListener('keyup', setEscEventListener);
    popupItem.classList.remove('popup_opened');
    popupItem.classList.add('popup_closed');
    
};

export const openPopup = (popupItem) => {
    popupItem.classList.remove('popup_closed');
    popupItem.classList.add('popup_opened');
    document.addEventListener('keyup', setEscEventListener);
};


document.addEventListener('click', function(evt){
    if (evt.target.classList.contains('popup')){
        return closePopup(evt.target);
    }

    if (evt.target.classList.contains('popup__view-image')){ 
        return closePopup(evt.target.closest('.popup'));
    }
    
    if (evt.target.classList.contains('popup__button-close')){ 
        return closePopup(evt.target.closest('.popup'));
    }
});

