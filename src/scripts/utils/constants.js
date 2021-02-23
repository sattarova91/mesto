
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

export {
  validatorSelectors,
  popupAddOpenButton,
  popupEditOpenButton,
  popupUpdateAvatarButton,
  FADE_EFFECT_TIMEOUT
};
