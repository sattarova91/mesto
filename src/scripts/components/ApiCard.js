import Card from './Card.js';
import {API} from '../utils/constants.js';

export default class ApiCard extends Card {
  handeLikeClick() {
    if(this.isOwnLiked()) {
      API.unlikeCard(this._data._id).then(() => {
        this._data.likes.splice(this.ownLikePos(), 1);
        this.updateData(this._data);
        super.handeLikeClick();
      });
    } else {
      API.likeCard(this._data._id).then((newData) => {
        this.updateData(newData);
        super.handeLikeClick();
      });
    }
  }

  delete() {
    API.deleteCard(this._data._id).then(() => {
      super.delete();
    });
  }
}
