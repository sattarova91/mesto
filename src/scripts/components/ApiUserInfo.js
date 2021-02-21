import UserInfo from './UserInfo.js';
import {API} from '../utils/constants.js';

export default class ApiUserInfo extends UserInfo {
  constructor(selectors) {
    super(selectors);
    API.getCurrentUser().then((data) => {
      this._data = data;
      this.setUserInfo(this._data);
    });
  }

  getUserInfo() {
    return this._data;
  }

  setUserInfo(data) {
    API.updateCurrentUser(data).then((data) => {
      this._data = data;
      super.setUserInfo(this._data);
    });
  }

  updateUserAvatar(avatar) {
    API.updateCurrentUserAvatar(avatar).then((data) => {
      this._data = data;
      super.setUserInfo(this._data);
    });
  }



}
