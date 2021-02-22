import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, callbacks) {
    super(popupSelector);
    this._confirmCallback = callbacks.confirm;
  }

  open(context) {
    this._context = context;
    super.open();
  }

  close() {
    this._context = undefined;
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._element.querySelector('.popup__save-button').addEventListener('click', () => {
      this._confirmCallback(this._context);
      this.close();
    });
  }
}
