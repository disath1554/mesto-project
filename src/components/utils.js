// utils

const loadImage = (imageUrl, arg='avatar') => {
    if (arg === 'avatar') {
      return new Promise((resolve, reject) => {
          const image = document.querySelector('.profile__image');
          image.src = imageUrl;
          image.onerror = reject;
          image.onload = resolve;
      });
    }
    return new Promise((resolve, reject) => {
      const new_image = document.createElement('img');
      new_image.src = imageUrl;
      new_image.onerror = reject;
      new_image.onload = resolve;
    });
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

export {openPopup, closePopup, loadImage};
