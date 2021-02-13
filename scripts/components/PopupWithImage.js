import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  open(title, img) {
    this._element.querySelector('.popup-open-img__title').textContent = title;
    this._element.querySelector('.popup-open-img__card-image').src = img;
    super.open();
  }
}
