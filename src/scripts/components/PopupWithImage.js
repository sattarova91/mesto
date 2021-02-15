import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._element.querySelector('.popup-open-img__card-image');
    this._title = this._element.querySelector('.popup-open-img__title');
  }
  open(title, img) {
    this._title.textContent = title;
    this._image.src = img;
    this._image.alt = title;

    super.open();
  }
}
