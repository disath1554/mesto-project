const editProfilePopup = document.querySelectorAll('.popup')[0];
const addCardPopup = document.querySelectorAll('.popup')[1];
const viewImagePopup = document.querySelectorAll('.popup')[2];
// forms edit add
const editForm =  editProfilePopup.querySelector('form');
const addForm =  addCardPopup.querySelector('form');
// close form
const closeProfileEditButton = editProfilePopup.querySelector('.popup__button-close');
const closeCardAddButton = addCardPopup.querySelector('.popup__button-close');
const closePopupImageButton = viewImagePopup.querySelector('.popup__button-close');
// open popup edit add
const editProfileButton = document.querySelector('.profile__button-edit');
const addCardButton = document.querySelector('.profile__button-add');
// save create form
const saveProfileButton = editProfilePopup.querySelector('.popup__form-button-save');
const createCardButton = addCardPopup.querySelector('.popup__form-button-save');
//
const cardsContainer = document.querySelector('.places');
//
let initialId = 0; // далее из БД
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

//init placesCard
function initPlacesCard() {
    let res = [];
    initialCards.forEach(function(obj, index){
        let copy = Object.assign({}, obj);
        initialId += 1;
        copy['id'] = 'id-0' + `${initialId}`;
        copy['like'] = false;
        res.push(copy);       
    });
    return res;
}
// load cards
const placesCard = initPlacesCard();

function loadCards() {
    placesCard.forEach(function(obj){
        loadCard(obj, 0);
    });   
}
document.addEventListener("DOMContentLoaded", loadCards);
// like card
function likeCard(evt) {
    evt.target.classList.toggle('places__place-like_active');
    let parentEvent = evt.target.parentElement;
    let titleName = parentEvent.querySelector('.places__place-title-text').textContent;
    placesCard.forEach(function(obj){
        if (obj['name'] == titleName) {
            obj['like'] = !(obj['like']);
        }
    });
}
// delete card
function deleteCard(evt) {
    let removeEvent = evt.target.parentElement.parentElement;
    let titleName = removeEvent.querySelector('.places__place-title-text').textContent;
    console.log(removeEvent.id)
    removeEvent.remove()
    //+ check len cards
}
// 
function viewImage(evt) {
    let elem = evt.target.parentElement.parentElement;
    let imgLink = elem.querySelector('.places__place-image').style.backgroundImage;
    let imgTitle = elem.querySelector('.places__place-title-text').textContent;
    //
    let imgElement =  viewImagePopup.querySelector('.popup__view-image');    
    imgElement.src = `${imgLink.slice(5, -2)}`;
    imgElement.alt = imgTitle;
    let titleElement =  viewImagePopup.querySelector('.popup__view-image-title');
    titleElement.textContent = imgTitle;
    //console.log(imgElement);
    viewImagePopup.classList.remove('popup_closed');
    viewImagePopup.classList.add('popup_opened');
 }
//
//add cards html
function loadCard(obj, mode) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__place-card').cloneNode(true);
    cardElement.id = obj.id;
    cardElement.querySelector('.places__place-title-text').textContent = obj.name;
    cardElement.querySelector('.places__place-image').style.backgroundImage = `url(${obj.link})`;
    
    // addEventListener like delete
    cardElement.querySelector('.places__place-like').addEventListener('click', likeCard)
    cardElement.querySelector('.places__place-delete').addEventListener('click', deleteCard)
    cardElement.querySelector('.places__place-image').addEventListener('click', viewImage)
    // + check obj.like
    //
    if (mode == 1){
        cardsContainer.prepend(cardElement);
        } else {
            cardsContainer.append(cardElement);
    }   
  }
//
function editProfile() {
    let profileName = document.querySelector('.profile__name');
    let profileAbout = document.querySelector('.profile__subtitle');
    let inputs = editProfilePopup.querySelectorAll('.popup__form-item-input');

    inputs[0].setAttribute('value', `${profileName.textContent}`);
    inputs[1].setAttribute('value', `${profileAbout.textContent}`);

    editProfilePopup.classList.remove('popup_closed');
    editProfilePopup.classList.add('popup_opened');
}
//
function closeEditProfile() {
    editProfilePopup.classList.remove('popup_opened');
    editProfilePopup.classList.add('popup_closed');
}
//
function handleFormEditSubmit(evt) {
    evt.preventDefault();
    //
    let inputs = editForm.querySelectorAll('input');
    //
    let profile_name = document.querySelector('.profile__name');
    let profile_about = document.querySelector('.profile__subtitle');
    profile_name.textContent = `${inputs[0].value}` + '\u00A0';
    profile_about.textContent = `${inputs[1].value}`;
    closeEditProfile();
}
//
editProfileButton.addEventListener('click', editProfile);
closeProfileEditButton.addEventListener('click', closeEditProfile);
editForm.addEventListener('submit', handleFormEditSubmit);
//
function AddCard() {
    addCardPopup.classList.remove('popup_closed');
    addCardPopup.classList.add('popup_opened');
}
//
function closeAddCard() {
    addCardPopup.classList.remove('popup_opened');
    addCardPopup.classList.add('popup_closed');
}
//
function handleFormAddSubmit(evt) {
    evt.preventDefault();
    //
    let inputs = addForm.querySelectorAll('input');
    //
    let obj = {}
    initialId += 1;
    obj['id'] = 'id-0' + `${initialId}`;
    obj['name'] = `${inputs[0].value}`;
    obj['link'] = `${inputs[1].value}`;
    obj['like'] = false;
    placesCard.unshift(obj);
    loadCard(obj, 1);
    closeAddCard();
}
//
closeCardAddButton.addEventListener('click', closeAddCard);
addCardButton.addEventListener('click', AddCard);
addForm.addEventListener('submit', handleFormAddSubmit);
//
function viewPopupImage() {
    viewImagePopup.classList.remove('popup_closed');
    viewImagePopup.classList.add('popup_opened');
}
//
function closePopupImage() {
    viewImagePopup.classList.remove('popup_opened');
    viewImagePopup.classList.add('popup_closed');
}
closePopupImageButton.addEventListener('click', closePopupImage);




