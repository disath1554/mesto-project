// popups
const editProfilePopup = document.getElementById('popup_edit_profile');
const addCardPopup = document.getElementById('popup_add_card');
const viewImagePopup = document.getElementById('popup_view_image');
// form profile
const editForm =  editProfilePopup.querySelector('form');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__subtitle');
const editProfileButton = document.querySelector('.profile__button-edit');
const saveProfileButton = editProfilePopup.querySelector('.popup__form-button-save');
const closeProfileEditButton = editProfilePopup.querySelector('.popup__button-close');
// form add cards
const addForm =  addCardPopup.querySelector('form');
const addCardButton = document.querySelector('.profile__button-add');
const createCardButton = addCardPopup.querySelector('.popup__form-button-save');
const closeCardAddButton = addCardPopup.querySelector('.popup__button-close');
// popup image
const imgView = viewImagePopup.querySelector('.popup__view-image');
const imgTitle = viewImagePopup.querySelector('.popup__view-image-title');     
const closePopupImageButton = viewImagePopup.querySelector('.popup__button-close');
//
const cardsContainer = document.querySelector('.places');
const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.places__place-card');
//
const popupItems = [editProfilePopup, addCardPopup, viewImagePopup];
//
const placeCardsList = [
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
//
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    popup.classList.add('popup_closed');
}

function openPopup(popup) {
    popup.classList.remove('popup_closed');
    popup.classList.add('popup_opened');
}

function viewImage(name, url) {
    imgView.src = url;
    imgView.alt = name;
    imgTitle.textContent = name;
    openPopup(viewImagePopup);
} 

function createCard(obj) {
    const cardItem = cardElement.cloneNode(true);
    cardItem.querySelector('.places__place-title-text').textContent = obj.name;
    cardItem.querySelector('.places__place-image').style.backgroundImage = `url(${obj.link})`;
    
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
        viewImage(obj.name, obj.link);
    });

    return cardItem;
}

function loadCards() {
    placeCardsList.forEach(function(obj){
        cardsContainer.append(createCard(obj));
    });
} 
document.addEventListener("DOMContentLoaded", loadCards);

function editProfile() {
    editForm.username.value = `${profileName.textContent}`;
    editForm.aboutself.value = `${profileAbout.textContent}`;
    openPopup(editProfilePopup);
}

function handleFormEditSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = `${editForm.username.value}` + '\u00A0';;
    profileAbout.textContent = `${editForm.aboutself.value}`;
    closePopup(editProfilePopup);
}

function handleFormAddSubmit(evt) {
    evt.preventDefault();
    const card = {}
    card['name'] = `${addForm.titlecard.value}`;
    card['link'] = `${addForm.refcard.value}`;
    cardsContainer.prepend(createCard(card));
    evt.target.reset()
    closePopup(addCardPopup);
}

function addCard(item) {
    cardsContainer.prepend(item);
    closePopup(addCardPopup);
}

editProfileButton.addEventListener('click', function(){
    editProfile();
});

editForm.addEventListener('submit', handleFormEditSubmit);

addCardButton.addEventListener('click', function(){
    openPopup(addCardPopup);
});
addForm.addEventListener('submit', handleFormAddSubmit);

closeProfileEditButton.addEventListener('click', function(){
    closePopup(editProfilePopup);
});

closeCardAddButton.addEventListener('click', function(){
    closePopup(addCardPopup);
});

closePopupImageButton.addEventListener('click', function(){
    closePopup(viewImagePopup);
});

document.addEventListener('click', function(evt){
    if (evt.target.classList.contains('popup')){
        return closePopup(evt.target);
    }

    if (evt.target.classList.contains('popup__view-image')){ 
        return closePopup(viewImagePopup);
    }    

    if (evt.target.name == 'profiledit') { 
        return closePopup(editProfilePopup); 
    }
    
    if ((evt.target.name == 'newplace') ||
        (evt.target.classList.contains('popup__container')) ||
        (evt.target.classList.contains('popup__form-heading'))){ 
            popupItems.forEach((item) => closePopup(item));  
    }   
});

document.addEventListener('keyup', function(evt){
    if (evt.key == 'Escape') {
        popupItems.forEach((item) => closePopup(item));    
    }
});


// Находим форму в DOM
const formElement = document.querySelector('.form__edit')
// Находим поля формы в DOM
const nameInput = // Воспользуйтесь инструментом .querySelector()
const jobInput = // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 