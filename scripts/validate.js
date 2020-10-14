const  formValidatorSelectors = {
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__field-error_active'
};

class FormValidator {
  constructor(selectors, form) {
    this._selectors = selectors;
    this._form = form;
    this._button = this._form.querySelector(this._selectors.submitButtonSelector);
    this._fieldList = Array.from(this._form.querySelectorAll(this._selectors.inputSelector));
  };

  _setEventListeners() {
    this._fieldList.forEach((field) => {
      field.addEventListener('input', (evt) => {
        this._handleFieldInput(evt);
      });
    });
  };

  _handleFieldInput(evt) {
    this._processValidity(evt.target);
    this._toggleButtonState();
  };

  enableValidation() {
    this._setEventListeners();
  };

  validate() {
    this._fieldList.forEach((field) => {
      this._processValidity(field);
    });
    this._toggleButtonState();
  }

  _processValidity(field) {
    if (field.validity.valid) {
      this._hideFieldError(field);
    } else {
      this._showFieldError(field, field.validationMessage);
    }
  };

  _showFieldError(field, errorMessage) {
    const errorElement = this._form.querySelector(`#${field.id}-error`);
    errorElement.classList.add(this._selectors.inputErrorClass);
    errorElement.textContent = errorMessage;
  };

  _hideFieldError(field) {
    const errorElement = this._form.querySelector(`#${field.id}-error`);
    errorElement.classList.remove(this._selectors.inputErrorClass);
    errorElement.textContent = "";
  };

  _toggleButtonState () {
    if (this._hasInvalidField()) {
      this._button.setAttribute('disabled', true);
      this._button.classList.add(this._selectors.inactiveButtonClass);
    } else {
      this._button.removeAttribute('disabled');
      this._button.classList.remove(this._selectors.inactiveButtonClass);
    }
  };

  _hasInvalidField () {
    return this._fieldList.some((field) => {
      return !field.validity.valid;
    });
  };
}

formList = Array.from(document.querySelectorAll('.popup__form'));
formList.forEach((form) => {
  const validator = new FormValidator(formValidatorSelectors, form);
  validator.enableValidation();
});
