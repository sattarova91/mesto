export default class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._infoElement = document.querySelector(infoSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  setUserInfo({name,  info, avatar}) {
    this._nameElement.textContent = name;
    this._infoElement.textContent = info;
    this._avatarElement.src = avatar;
  }
}
