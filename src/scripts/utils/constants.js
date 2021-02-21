import ApiUserInfo from '../components/ApiUserInfo.js';
import Api from '../components/Api.js';

const validatorSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.button[type="submit"]',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__field-error_active'
};

const popupAddOpenButton = document.querySelector('.profile__add-button');
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupUpdateAvatarButton = document.querySelector('.profile__avatar-edit-button');
const FADE_EFFECT_TIMEOUT = 2;

const API = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    authorization: 'bde13069-7cbc-4063-9ad5-2d5660d9e188',
    'Content-Type': 'application/json'
  }
});

const CURRENT_USER = new ApiUserInfo({
  nameSelector: '.profile__info-name',
  aboutSelector: '.profile__info-job',
  avatarSelector: '.profile__avatar'
});



export {
  validatorSelectors,
  popupAddOpenButton,
  popupEditOpenButton,
  popupUpdateAvatarButton,
  FADE_EFFECT_TIMEOUT,
  CURRENT_USER,
  API
};
