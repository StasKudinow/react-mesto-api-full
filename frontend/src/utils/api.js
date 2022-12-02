class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._checkResponse)
  }

  addCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  putLike(id) {
    return fetch(`${this._baseUrl}cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  setAvatar(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(this._checkResponse)
  }

  changeLikeCardStatus(id, isLiked) {
    return isLiked ? this.deleteLike(id) : this.putLike(id);
  }
}

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-49/',
  headers: {
    authorization: '776fa51b-f2c4-44dc-b3e7-060fea23d99a',
    'Content-Type': 'application/json'
  },
});

export default api;