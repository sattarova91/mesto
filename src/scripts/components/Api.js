class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  //////////// userAPI

  getCurrentUser() {
    return this._get('users/me');
  }

  //////////// cardAPI

  getInitialCards() {
    return this._get('cards');
  }

  addCard({name, link}) {
    return this._post('cards', {name, link});
  }

  deleteCard(id) {
    return this._delete(`cards/${id}`);
  }

  likeCard(id) {
    return this._put(`cards/likes/${id}`);
  }

  ////////////



  _get(url) {
    return fetch(`${this._baseUrl}/${url}`, {
      method: 'GET',
      headers: this._headers
    }).then(res => {return res.json();});
  }

  _post(url, data) {
    return fetch(`${this._baseUrl}/${url}`, {
      method: 'POST',
      headers: this._headers,
      'Content-Type': 'application/json',
      body: JSON.stringify(data)
    }).then(res => {return res.json();});
  }

  _delete(url) {
    return fetch(`${this._baseUrl}/${url}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  _put(url, data) {
    return fetch(`${this._baseUrl}/${url}`, {
      method: 'PUT',
      headers: this._headers,
      'Content-Type': 'application/json',
      body: JSON.stringify(data)
    }).then(res => {return res.json();});
  }


}
// return Promise.reject(`Ошибка: ${res.status}`);


export const API = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    authorization: 'bde13069-7cbc-4063-9ad5-2d5660d9e188',
    'Content-Type': 'application/json'
  }
});




