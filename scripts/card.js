import {Popup} from './Popup.js';

class CardPopup extends Popup {
  open(title, img) {
    this._element.querySelector('.popup-open-img__title').textContent = title;
    this._element.querySelector('.popup-open-img__card-image').src = img;
    super.open();
  }
}

const popupOpenImg = new CardPopup('.popup-open-img');

export class Card {
  constructor(card, cardSelector) {
    this._name = card.name;
    this._link = card.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.elements__item')
    .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.elements__delete-button').addEventListener('click', () => {
      this._handleDeleteClick();
    });
    this._element.querySelector('.elements__like-button').addEventListener('click', () => {
      this._handeLikeClick();
    });
    this._element.querySelector('.elements__img').addEventListener('click', () => {
      this._handleImgClick();
    });
  }

  _handleImgClick() {
    popupOpenImg.open(this._name, this._link);
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handeLikeClick() {
    this._element.querySelector('.elements__like-button').classList.toggle('elements__like-button_liked');
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.elements__title').textContent = this._name;
    this._element.querySelector('.elements__img').src = this._link;
    return this._element;
  }
}
