import {loadCards} from './card.js';

const token =  '75517d06-b879-461d-b656-080fd61e6a64';
const servUrl = 'https://nomoreparties.co/v1/plus-cohort-25'; 

function getUserProfile() {
    return  fetch(`${servUrl}/users/me`, {
    headers: {
      authorization: token
    }
  });
}

function saveUserProfile(newName, newAbout) {
    const res = fetch(`${servUrl}users/me`, {
        method: 'PATCH',
        headers: setHeader,
        body: JSON.stringify({
            name: newName,
            about: newAbout
        })
    });
    return getResponeData(res);
}

function getCardsList() {
    const res = fetch(`${serverUrl}/cards`, {
        headers: token
    });
    return getResponeData(res);
}

function createNewCard(newName, newLink) {
    const res = fetch(`${serverUrl}/cards`, {
        method: 'POST',
        headers: token,
        body: JSON.stringify({
            name: newName,
            link: newLink
        })
    });
    return getResponeData(res);
}
      
export {getUserProfile, saveUserProfile, getCardsList, createNewCard};