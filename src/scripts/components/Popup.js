import {FADE_EFFECT_TIMEOUT} from '../utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
    this.setEventListeners();
    //проблема с удалением листенера и потерей контекста
    this._handleEsc = this._handleEsc.bind(this);
    this._element.style.transition = `visibility .${FADE_EFFECT_TIMEOUT}s,opacity .${FADE_EFFECT_TIMEOUT*2}s ease-in-out`;
  }

  setEventListeners() {
    this._element.addEventListener('click', (evt) => {
      this._handleOverlayClick(evt);
    });
    this._element.querySelector('.popup__close').addEventListener('click', () => {
      this._handleCloseClick();
    });
  }

  _handleOverlayClick(evt) {
    if (evt.target == this._element) {
      this.close();
    }
  }

  _handleCloseClick() {
    this.close();
  }

  _handleEsc(evt) {
    if(evt.key == 'Escape') {
      this.close();
    }
  }

  open() {
    document.addEventListener('keydown', this._handleEsc);
    this._element.classList.toggle('popup_is-opened');
  }

  close() {
    document.removeEventListener('keydown', this._handleEsc);

    this._element.classList.toggle('popup_is-opened');
  }
}

