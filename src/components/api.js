import {loadCards} from './card.js';

const serverUrl = 'https://nomoreparties.co/v1/plus-cohort-25';
const setHeader = {
      token: '75517d06-b879-461d-b656-080fd61e6a64',
      'Content-Type': 'application/json'
    };
  

function getResponeData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}

async function getUserProfile() {
    const res = await fetch(`${serverUrl}/users/me`, {
        headers: setHeader
    });
    return getResponeData(res);
}

async function saveUserProfile(newName, newAbout) {
    const res = await fetch(`${serverUrl}/users/me`, {
        method: 'PATCH',
        headers: setHeader,
        body: JSON.stringify({
            name: newName,
            about: newAbout
        })
    });
    return getResponeData(res);
}

async function getCardsList() {
    const res = await fetch(`${serverUrl}/cards`, {
        headers: setHeader
    });
    return getResponeData(res);
}

async function createNewCard(newName, newLink) {
    const res = await fetch(`${serverUrl}/cards`, {
        method: 'POST',
        headers: setHeader,
        body: JSON.stringify({
            name: newName,
            link: newLink
        })
    });
    return getResponeData(res);
}
      

function getCardsList() {
    return  fetch('https://nomoreparties.co/v1/plus-cohort-25/cards', {
    headers: {authorization: token}
    });
}



export {initMain, getUserProfile, saveUserProfile, getCardsList, createNewCard};