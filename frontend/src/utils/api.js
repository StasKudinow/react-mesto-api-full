export const BASE_URL = 'https://api.staskudinow.mesto.nomoredomains.club';

const checkResponse = (res) => {
  if(res.ok) {
    return res.json();
  } else {
    return Promise.reject(res.status);
  }
};

export const getUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    }
  })
  .then(checkResponse)
};

export const getInitialCards = () => {
  return fetch(`${BASE_URL}/cards`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    }
  })
  .then(checkResponse)
};

export const setUserInfo = (data) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  })
  .then(checkResponse)
};

export const addCard = (data) => {
  return fetch(`${BASE_URL}/cards`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  })
  .then(checkResponse)
};

export const deleteCard = (id) => {
  return fetch(`${BASE_URL}/cards/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    }
  })
  .then(checkResponse)
};

export const putLike = (id) => {
  return fetch(`${BASE_URL}/cards/${id}/likes`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    }
  })
  .then(checkResponse)
};

export const deleteLike = (id) => {
  return fetch(`${BASE_URL}/cards/${id}/likes`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    }
  })
  .then(checkResponse)
};

export const setAvatar = (data) => {
  return fetch(`${BASE_URL}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: data.avatar
    })
  })
  .then(checkResponse)
};

export const changeLikeCardStatus = (id, isLiked) => {
    return isLiked ? deleteLike(id) : putLike(id);
};