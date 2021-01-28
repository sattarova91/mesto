import {Card} from './Card.js';
import {Popup} from './Popup.js';
import {FormValidator} from './FormValidator.js';

const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.button[type="submit"]',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__field-error_active'
};

////////////////////////////////////////////
const editFormValidator = new FormValidator(selectors, document.querySelector('.popup-edit'));
editFormValidator.enableValidation();

class EditPopup extends Popup {
  constructor(popupSelector, titleSelector, JobSelector) {
    super(popupSelector);
    this._titleElement = document.querySelector(titleSelector);
    this._jobElement = document.querySelector(JobSelector);
  }

  setEventListeners() {
    super.setEventListeners();
    this._element.querySelector('.popup__form').addEventListener('submit', (evt) => {
      this._handleSubmit(evt);
    });
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._titleElement.textContent = this._element.querySelector('#name-field').value;
    this._jobElement.textContent = this._element.querySelector('#job-field').value;
    this.close();
  }

  open() {
    this._element.querySelector('#name-field').value = this._titleElement.textContent;
    this._element.querySelector('#job-field').value = this._jobElement.textContent;
    editFormValidator.validate();
    super.open();
  }
}

const popupEdit = new EditPopup('.popup-edit', '.profile__info-name', '.profile__info-job');
const popupEditOpenButton = document.querySelector('.profile__edit-button');

popupEditOpenButton.addEventListener('click', function() {
  popupEdit.open();
});

////////////////////////////////////////////
const addFormValidator = new FormValidator(selectors, document.querySelector('.popup-add'));
addFormValidator.enableValidation();


class AddPopup extends Popup {
  setEventListeners() {
    super.setEventListeners();
    this._element.querySelector('.popup__form').addEventListener('submit', (evt) => {
      this._handleSubmit(evt);
    });
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    const card = {
      name : this._element.querySelector('#title-field').value,
      link : this._element.querySelector('#link-field').value
    };
    addCard(card);
    this.close();
  }

  open() {
    this._element.querySelector('#title-field').value = '';
    this._element.querySelector('#link-field').value = '';
    addFormValidator.validate();
    super.open();
  }

}

const popupAdd = new AddPopup('.popup-add');
const popupAddOpenButton = document.querySelector('.profile__add-button');

popupAddOpenButton.addEventListener('click', function() {
  popupAdd.open();
});

////////////////////////////////////////////
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elements = document.querySelector('.elements');

function addCard(card) {
  const c = new Card(card, '.card__template');
  elements.prepend(c.generateCard());
}

initialCards.reverse().forEach(
  (card) => {
    addCard(card);
  }
);
