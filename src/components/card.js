import {openPopup} from './utils.js'

const cardsContainer = document.querySelector('.places');
const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.places__place-card');

const viewImage = (name, url) => {
    const viewImagePopup = document.getElementById('popup_view_image');
    const imgView = viewImagePopup.querySelector('.popup__view-image');
    const imgTitle = viewImagePopup.querySelector('.popup__view-image-title'); 
    
    imgView.src = url;
    imgView.alt = name;
    imgTitle.textContent = name;
    openPopup(viewImagePopup);
};

export const createCard = (card, isMyCard) => {
    const cardItem = cardElement.cloneNode(true);
    cardItem.querySelector('.places__place-title-text').textContent = card.name;
    cardItem.querySelector('.places__place-image').style.backgroundImage = `url(${card.link})`;
    
    const deleteButton = cardItem.querySelector('.places__place-delete');
    if (isMyCard) {
        deleteButton.addEventListener('click', function() {
            const listItem = deleteButton.closest('.places__place-card');
            listItem.remove();
          });
    } else {
        deleteButton.style.visibility = "hidden"; 
    }
          
    const likeButton = cardItem.querySelector('.places__place-like');
    likeButton.addEventListener('click', function() {
        likeButton.classList.toggle('places__place-like_active');
    });
    
    const imageContainer = cardItem.querySelector('.places__place-image');
    imageContainer.addEventListener('click', function() {
        viewImage(card.name, card.link);
    });

    return cardItem;
};


export function loadCards(placeCardsList) {
    const limit = 6;
    for (let i=0; i<limit;i+=1){
        cardsContainer.append(createCard(placeCardsList[i], false));
    }   
}



