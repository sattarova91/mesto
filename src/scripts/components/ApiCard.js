import Card from './Card.js';
import {API} from './Api.js';


export default class ApiCard extends Card {
  handleDeleteClick() {
    API.deleteCard(this._data._id).then(() => {
      super.handleDeleteClick();
    });
  }

  handeLikeClick() {
    API.getCurrentUser().then((res) => {console.log(res)});
    console.log(this._data);
  //   API.likeCard(this._data._id).then(() => {
  //     super.handeLikeClick();
  //   });
  }
}
