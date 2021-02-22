export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  //////////// userAPI

  getCurrentUser() {
    return this._get('users/me');
  }

  updateCurrentUser({ name, about }) {
    return this._patch('users/me', {name, about});
  }

  updateCurrentUserAvatar(avatar) {
    return this._patch('users/me/avatar', {avatar: avatar});
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

  unlikeCard(id) {
    return this._delete(`cards/likes/${id}`);
  }

  ////////////

  _patch(url, data) {
    return this._fetch('PATCH', url, data);
  }

  _get(url) {
    return this._fetch('GET', url);
  }

  _post(url, data) {
    return this._fetch('POST', url, data);
  }

  _delete(url) {
    return this._fetch('DELETE', url);
  }

  _put(url, data) {
    return this._fetch('PUT', url, data);
  }

  _fetch(method, url, data = undefined) {
    return fetch(`${this._baseUrl}/${url}`, {
      method: method,
      headers: this._headers,
      'Content-Type': 'application/json',
      body: JSON.stringify(data)
    }).then(res => {return res.json();}).catch((err) => {
      console.log(err);
    });
  }
}




