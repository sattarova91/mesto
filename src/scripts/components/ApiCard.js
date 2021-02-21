import Card from './Card.js';
import {API} from '../utils/constants.js';

export default class ApiCard extends Card {
  unlike() {
    API.unlikeCard(this._data._id).then(() => {
      //super.unlike();
    });
  }

  like() {
    API.likeCard(this._data._id).then((newData) => {
      this.updateData(newData);
      //super.like();
    });
  }

  handleDeleteClick() {
    API.deleteCard(this._data._id).then(() => {
      super.handleDeleteClick();
    });
  }
}
