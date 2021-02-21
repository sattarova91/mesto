import UserInfo from './UserInfo.js';
import {API} from './Api.js';

export default class ApiUserInfo extends UserInfo {
  constructor(selectors) {
    super(selectors);
    API.getCurrentUser().then((data) => {
      this._data = data;
      this.setUserInfo({ name: data.name, info: data.about , avatar: data.avatar});
    });
  }

  getUserInfo() {
    return {
      name: this._data.name,
      info: this._data.about,
      avatar: this._data.avatar
    }
  }
}
