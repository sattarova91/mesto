export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return this._data;
  }

  setUserInfo(data) {
    this._data = data;
    this._nameElement.textContent = this._data.name;
    this._aboutElement.textContent = this._data.about;
    this._avatarElement.src = this._data.avatar;
  }
}
