import Popup from './Popup.js';
import {FADE_EFFECT_TIMEOUT} from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbacks) {
    super(popupSelector);
    this._submitCallback = callbacks.submit;
    this._validateCallback = callbacks.validate;
  }

  setEventListeners() {
    super.setEventListeners();
    this._element.querySelector('.popup__form').addEventListener('submit', (evt) => {
      this._handleSubmit(evt);
    });
  }

  _handleSubmit(evt) {
    evt.preventDefault();

    this._submitCallback(this._getInputValues());

    this.close();
  }

  open() {
    this._validateCallback();
    super.open();
  }


  close() {
    super.close();
    setTimeout(
      () => {
        this._element.querySelector('.popup__form').reset();
      },
      FADE_EFFECT_TIMEOUT*100
    );
  }

  _getInputValues() {
    this._inputList = this._element.querySelectorAll('.popup__field');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }
}
