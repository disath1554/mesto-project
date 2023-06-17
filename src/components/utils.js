// utils

function loadImage(imageUrl) {
    return new Promise((resolve, reject) => {
     const image = document.createElement('img');
     image.src = imageUrl;
     image.onerror = reject;
     image.onload = resolve;
   });
}

const resetForm = (popup) => {
    const inputList = Array.from(popup.querySelectorAll(".form__input"));
    inputList.forEach((inputElement) => {
        inputElement.value ="";
    }); 
};

const renderError = (err) => {
    console.log(err);
};

const contentShow = () => {
    const hiddenBlock = document.querySelector('.content');
    hiddenBlock.classList.remove('content_hide');
};

const setEscEventListener = (evt) => {
        if (evt.key === 'Escape') {
            const popupList = Array.from(document.querySelectorAll('.popup'));
            popupList.forEach((popupItem) => {
                if (popupItem.classList.contains('popup_opened')) {
                    closePopup(popupItem);
                }  
            });  
        }    
};
   
const closePopup = (popupItem) => {
    document.removeEventListener('keyup', setEscEventListener);
    resetForm(popupItem);
    popupItem.classList.remove('popup_opened');
    popupItem.classList.add('popup_closed');
    
};

const openPopup = (popupItem) => {
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

export {openPopup, closePopup, loadImage, contentShow, renderError};
