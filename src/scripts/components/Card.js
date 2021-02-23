export default class Card {
  constructor(currentUserId, data, cardSelector, listeners) {
    this._currentUserId = currentUserId;
    this._data = data;
    this._cardSelector = cardSelector;
    this._listeners = listeners;
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
    this._deleteButton.addEventListener('click', () => {
      this._listeners.handleDeleteClick();
    });
    this._likeButton.addEventListener('click', () => {
      this._listeners.handeLikeClick();
    });
    this._cardImage.addEventListener('click', () => {
      this._listeners.handleCardClick(this._data.name, this._data.link);
    });
  }

  _toggleLike() {
    if(this.isOwnLiked()) {
      this._likeButton.classList.add('elements__like-button_liked');
    } else {
      this._likeButton.classList.remove('elements__like-button_liked');
    }
  }

  ////////////////////////////

  delete() {
    this._element.remove();
  }

  ownLikePos() {
    return this._data.likes.findIndex((like) => {
      return like._id == this._currentUserId;
    });
  }

  isOwnLiked() {
    return this.ownLikePos() != -1;
  }

  isOwnCard() {
    return this._data.owner._id == this._currentUserId;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._title = this._element.querySelector('.elements__title');

    this._deleteButton = this._element.querySelector('.elements__delete-button');
    if (this.isOwnCard()) {
      this._deleteButton.classList.remove('elements__delete-button_hidden');
    } else {
      this._deleteButton.classList.add('elements__delete-button_hidden');
    }

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
    this._toggleLike();
  }
}
