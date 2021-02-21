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
    this._element.querySelector('.elements__like-button').addEventListener('click', () => {
      this.handeLikeClick();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data.name, this._data.link);
    });
  }


  handleDeleteClick() {
    this._element.remove();
  }

  handeLikeClick() {
    this._element.querySelector('.elements__like-button').classList.toggle('elements__like-button_liked');
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.elements__title').textContent = this._data.name;
    this._cardImage = this._element.querySelector('.elements__img');
    this._cardImage.alt = this._data.name;
    this._cardImage.src = this._data.link;
    this._setEventListeners();
    return this._element;
  }
}
