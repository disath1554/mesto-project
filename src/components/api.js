import {loadCards} from './card.js';

const setUrl = {
    serv: 'https://mesto.nomoreparties.co/v1/plus-cohort-25',
    head: {
      token: '75517d06-b879-461d-b656-080fd61e6a64',
      'Content-Type': 'application/json'
    }
  }

function renderError(err) {
    alert(err);
}

function getData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}

export function getUserProfile() {
    return fetch(`${setUrl}/users/me`, {
      headers: setUrl.head
    })
      .then(res => getData(res));
}



function renderUserProfile(res) {
        const profileName = document.querySelector('.profile__name');
        const profileAbout = document.querySelector('.profile__subtitle');
        profileName.textContent = res.name;
        profileAbout.textContent = res.about;
        loadImage(res.avatar)
            .then(() => {;})
            .catch((err) => {
            renderError(`Ошибка: ${err}`);
  });
}


function loadImage(imageUrl, arg='avatar') {
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
  } 



function loadUserProfile() {
    getUserProfile()
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .then((res) => {
      renderUserProfile(res);
    })
    .catch((err) => {
      renderError(`Ошибка: ${err}`);
    });
}        

function getCardsList() {
    return  fetch('https://nomoreparties.co/v1/plus-cohort-25/cards', {
    headers: {authorization: token}
    });
}

function loadCardsList() {
    getCardsList()
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .then((res) => {
      loadCards(res);
    })
    .catch((err) => {
      renderError(`Ошибка: ${err}`);
    });
}       



function initMain() {
    loadUserProfile();
    loadCardsList();
}

export {initMain};