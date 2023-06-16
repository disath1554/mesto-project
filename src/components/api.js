const token =  '75517d06-b879-461d-b656-080fd61e6a64';
const serverUrl = 'https://nomoreparties.co/v1/plus-cohort-25'; 

function getUserProfile() {
    return  fetch(`${serverUrl}/users/me`, {
    headers: {
      authorization: token
    }
  });
}

function getCardsList() {
    return fetch(`${serverUrl}/cards`, {
        headers: {
            authorization: token
          }
    });
}

function saveUserProfile(newName, newAbout) {
    return fetch(`${serverUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            name: newName,
            about: newAbout
        })
    });
}

function saveUserAvatar(newImage) {
    return fetch(`${serverUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: token, 'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            avatar: newImage
        })
    });
}

function createNewCard(newName, newLink) {
    return fetch(`${serverUrl}/cards`, {
        method: 'POST',
        headers: {
            authorization: token,'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            name: newName,
            link: newLink
        })
    });
}


export {getUserProfile, saveUserProfile, getCardsList, createNewCard, saveUserAvatar};