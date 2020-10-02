const hasInvalidField = (fieldList) => {
  return fieldList.some((field) => {
    return !field.validity.valid;
  });
};

const toggleButtonState = (selectors, fieldList, button) => {
  if (hasInvalidField(fieldList)) {
    button.setAttribute('disabled', true);
    button.classList.add(selectors.inactiveButtonClass);
  } else {
    button.removeAttribute('disabled');
    button.classList.remove(selectors.inactiveButtonClass);
  }
};

const showFieldError = (selectors, container, field, errorMessage) => {
  const errorElement = container.querySelector(`#${field.id}-error`);
  errorElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
};

const hideFieldError = (selectors, container, field) => {
  const errorElement = container.querySelector(`#${field.id}-error`);
  errorElement.classList.remove(selectors.inputErrorClass);
  errorElement.textContent = "";
};

const processValidity = (selectors, container, field) => {
  if (field.validity.valid) {
    hideFieldError(selectors, container, field);
  } else {
    showFieldError(selectors, container, field, field.validationMessage);
  }
};

const enableFormValidation = (selectors, form) => {
  const fieldList = Array.from(form.querySelectorAll(selectors.inputSelector));
  const button = form.querySelector(selectors.submitButtonSelector);

  fieldList.forEach((field) => {
    field.addEventListener('input', () => {
      processValidity(selectors, form, field);
      toggleButtonState(selectors, fieldList, button);
    });
  });
}

function enableValidation(selectors) {
  formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((form) => {
    enableFormValidation(selectors, form);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__field-error_active'
});
