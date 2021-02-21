import {CURRENT_USER} from '../utils/constants.js';

export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
      this.handleDeleteClick();
    });
    this._likeButton.addEventListener('click', () => {
      this.handeLikeClick();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data.name, this._data.link);
    });
  }

  ////////////////////////////
  handleDeleteClick() {
    this._element.remove();
  }

  handeLikeClick() {
    if(this.isOwnLiked()) {
      this.unlike();
    } else {
      this.like();
    }
  }
  ////////////////////////////

  like() {
    this._likeButton.classList.toggle('elements__like-button_liked');
  }

  unlike() {
    const likePos = this._data.likes.findIndex((like) => {
      return like._id == CURRENT_USER.getUserInfo()._id;
    });
    this._data.likes.splice(likePos, 1);
  }

  isOwnLiked() {
    return this._data.likes.some((like) => {
      return like._id == CURRENT_USER.getUserInfo()._id;
    });
  }

  isOwnCard() {

  }

  generateCard() {
    this._element = this._getTemplate();
    this._title = this._element.querySelector('.elements__title');
    this._likeButton = this._element.querySelector('.elements__like-button');
    this._likeCounter = this._element.querySelector('.elements__like-counter');
    this._cardImage = this._element.querySelector('.elements__img');
    this.updateData(this._data);
    this._setEventListeners();
    return this._element;
  }

  updateData(newData) {
    this._data = newData;
    this._cardImage.alt = this._data.name;
    this._cardImage.src = this._data.link;
    this._title.textContent = this._data.name;
    this._likeCounter.textContent = this._data.likes.length;
    if(this.isOwnLiked()) {
      this.like();
    }
  }
}
