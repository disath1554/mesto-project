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

export const createCard = (card) => {
    const cardItem = cardElement.cloneNode(true);
    cardItem.querySelector('.places__place-title-text').textContent = card.name;
    cardItem.querySelector('.places__place-image').style.backgroundImage = `url(${card.link})`;
    
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
        viewImage(card.name, card.link);
    });

    return cardItem;
};


export function loadCards(placeCardsList) {
    placeCardsList.forEach(function(item){
        cardsContainer.append(createCard(item));
    });
}


