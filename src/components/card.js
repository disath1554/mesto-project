import {getCardsList, deleteCard, putLikeCard, deleteLikeCard} from './api.js';
import {openPopup, renderError} from './utils.js';

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

const likeItCard = (id, likeButton, likeCountItem) => {
    const isLike = likeButton.classList.contains("places__place-like_active");
    
    if (isLike) {
        deleteLikeCard(id)
        .then((res) =>{
            const likeCount = res.likes.length;
            likeCountItem.textContent = likeCount;
            likeButton.classList.toggle('places__place-like_active');
        })
        .catch((err) => {
            renderError(`Ошибка deleteLikeCard: ${err}`);
        }); 
    } else {
        putLikeCard(id)
        .then((res) =>{
            const likeCount = res.likes.length;
            likeCountItem.textContent = likeCount;
            likeButton.classList.toggle('places__place-like_active');
        })
        .catch((err) => {
            renderError(`Ошибка addLikeCard: ${err}`);
        });
    }  
};

const deleteImageCard = (id, listItem) => {
    deleteCard(id)
    .then(() =>{
        listItem.remove();
    })
    .catch((err) => {
        renderError(`Ошибка deleteCard: ${err}`);
    });
};

export const createCard = (card, isMyCard=true, isMeLike=false) => {
    const cardId = card._id;
    const cardItem = cardElement.cloneNode(true);
    cardItem.querySelector('.places__place-title-text').textContent = card.name;
    cardItem.querySelector('.places__place-image').style.backgroundImage = `url(${card.link})`;
    
    const deleteButton = cardItem.querySelector('.places__place-delete');
    if (isMyCard) {
        deleteButton.addEventListener('click', function() {
            const listItem = deleteButton.closest('.places__place-card');
            deleteImageCard(cardId, listItem);
          });
    } else {
        deleteButton.style.visibility = "hidden"; 
    }
    const count = card.likes.length;
    const likeCountItem = cardItem.querySelector('.places__place-like-count');
    likeCountItem.textContent = `${count}`;
         
    const likeButton = cardItem.querySelector('.places__place-like');
    if (isMeLike) {
        likeButton.classList.add('places__place-like_active');
    } 
    
    likeButton.addEventListener('click', function() {
    likeItCard(cardId, likeButton, likeCountItem);
    }); //if (!isMyCard), ecли нельзя лайкать свои карточки
    
    const imageContainer = cardItem.querySelector('.places__place-image');
    imageContainer.addEventListener('click', function() {
        viewImage(card.name, card.link);
    });

    return cardItem;
};

function initCardsList(userId) {
    getCardsList()
    .then((res) =>{
        loadCards(res, userId);
    })
    .catch((err) => {
        renderError(`Ошибка initCardsList: ${err}`);
    });
}

function loadCards(placeCardsList, userId) {
    placeCardsList.forEach(item => {
        const  isMeLike = (item.likes && item.likes.some(like => like._id === userId));
        const isMyCard = (userId === item.owner._id);        
        cardsContainer.append(createCard(item, isMyCard, isMeLike));
    });   
}   

export {loadCards, initCardsList};