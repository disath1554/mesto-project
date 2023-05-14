const editProfilePopup = document.querySelectorAll('.popup')[0];
const addCardPopup = document.querySelectorAll('.popup')[1];
// forms edit add
const editForm =  editProfilePopup.querySelector('form');
const addForm =  addCardPopup.querySelector('form');
// close form
const closeProfileEditButton = editProfilePopup.querySelector('.popup__button-close');
const closeCardAddButton = addCardPopup.querySelector('.popup__button-close');
// open popup edit add
const editProfileButton = document.querySelector('.profile__button-edit');
const addCardButton = document.querySelector('.profile__button-add');
// save create form
const saveProfileButton = editProfilePopup.querySelector('.popup__form-button-save');
const createCardButton = addCardPopup.querySelector('.popup__form-button-save');
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
    profile_name.textContent = `${inputs[0].value} `;
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
closeCardAddButton.addEventListener('click', closeAddCard);
addCardButton.addEventListener('click', AddCard);