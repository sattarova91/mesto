import {popupOpenImg, popupOpen} from './utils.js';

export class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.elements__title').textContent = this._name;
    this._element.querySelector('.elements__img').src = this._link;
    this._element.querySelector('.elements__img').alt = this._name;

    this._likeButton = this._element.querySelector('.elements__like-button');
    this._deleteButton = this._element.querySelector('.elements__delete-button');
    this._cardImg = this._element.querySelector('.elements__img');

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handleLikeClick);
    this._deleteButton.addEventListener('click', (evt) => {
      this._handleDeleteClick(evt);
    });
    this._cardImg.addEventListener('click', () => {
      this._handleImgClick();
    });
  }

  _handleLikeClick(evt) {
    evt.target.classList.toggle('elements__like-button_liked');
  }

  _handleDeleteClick(evt) {
    evt.target.parentElement.remove();
    this._element = null;
  }

  _handleImgClick() {
    popupOpenImg.querySelector('.popup-open-img__card-image').src = this._link;
    popupOpenImg.querySelector('.popup-open-img__title').textContent = this._name;
    popupOpen(popupOpenImg);
  }
}




