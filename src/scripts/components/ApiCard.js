import Card from './Card.js';
import {API, CURRENT_USER} from '../utils/constants.js';

export default class ApiCard extends Card {
  _isOwnLiked() {
    return this._data.likes.some((like) => {
      return like._id == CURRENT_USER.getUserInfo()._id;
    });
  }

  handleDeleteClick() {
    API.deleteCard(this._data._id).then(() => {
      super.handleDeleteClick();
    });
  }

  handeLikeClick() {
    if(this._isOwnLiked()) {
      API.unlikeCard(this._data._id).then(() => {
        super.handeLikeClick();
      });
    } else {
      API.likeCard(this._data._id).then(() => {
        super.handeLikeClick();
      });
    }
  }

  generateCard() {
    const element = super.generateCard();
    if(this._isOwnLiked()) {
      this.like();
    }
    return element;
  }

}
