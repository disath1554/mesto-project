import {getCardsList} from './api.js';
import {openPopup, renderError} from './utils.js'

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
    if (!isMyCard) {
    likeButton.addEventListener('click', function() {
        likeButton.classList.toggle('places__place-like_active');
    });
    
    const count = card.likes.length;
    const likeCount = cardItem.querySelector('.places__place-like-count');
    likeCount.textContent = `${count}`;
    const imageContainer = cardItem.querySelector('.places__place-image');
    imageContainer.addEventListener('click', function() {
        viewImage(card.name, card.link);
    });

    return cardItem;
};

function initCardsList(userId) {
    getCardsList()
    .then((res) => {
        if (res.ok) {
            return res.json();
        } return Promise.reject(res.status);
        })
    .then((res) =>{
        loadCards(res, userId);
    })
    .catch((err) => {
        renderError(`Ошибка initCardsList: ${err}`);
    });
}

function loadCards(placeCardsList, userId) {
    const limit = 6;
    for (let i=0; i<limit;i+=1){
        const isMyCard = (userId === placeCardsList[i].owner._id);
        cardsContainer.append(createCard(placeCardsList[i], isMyCard));
    }   
}

export {loadCards, initCardsList};