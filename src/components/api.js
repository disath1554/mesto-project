const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-25',
    headers: {
      authorization: '75517d06-b879-461d-b656-080fd61e6a64',
      'Content-Type': 'application/json'
    }
}

function _getResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

export function getUserProfile() {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
      .then(res => _getResponse(res));
}  

export function getCardsList() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
      })
        .then(res => _getResponse(res));
}

export function saveUserProfile(newName, newAbout) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          name: newName,
          about: newAbout
        })
      })
        .then(res => _getResponse(res));
}

export function saveUserAvatar(newImage) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          avatar: newImage
        })
      })
        .then(res => _getResponse(res));
}

export function createNewCard(newName, newLink) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
          name: newName,
          link: newLink
        })
      })
        .then(res => _getResponse(res));
}

export function deleteCard(id) {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers
      })
}

export function putLikeCard(id) {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers
      })
        .then(res => _getResponse(res));
}

export function deleteLikeCard(id) {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.headers
      })
        .then(res => _getResponse(res));
}    

