export default class Card {
  constructor(card, cardSelector, handleCardClick) {
    this._name = card.name;
    this._link = card.link;
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
      this._handleDeleteClick();
    });
    this._element.querySelector('.elements__like-button').addEventListener('click', () => {
      this._handeLikeClick();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handeLikeClick() {
    this._element.querySelector('.elements__like-button').classList.toggle('elements__like-button_liked');
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.elements__title').textContent = this._name;
    this._cardImage = this._element.querySelector('.elements__img');
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._setEventListeners();
    return this._element;
  }
}
