export class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
    this.setEventListeners();
  }

  setEventListeners() {
    this._element.addEventListener('click', (evt) => {
      this._handleOverlayClick(evt);
    });
    this._element.querySelector('.popup__close').addEventListener('click', () => {
      this._handleCloseClick();
    });
  }

  _handleOverlayClick(evt) {
    if (evt.target == this._element) {
      this.close();
    }
  }

  _handleCloseClick() {
    this.close();
  }

  open() {
    this._element.classList.toggle('popup_is-opened');
  }

  close() {
    this._element.classList.toggle('popup_is-opened');
    let fields = this._element.querySelector('.popup__field');
    if (fields) {
      fields = Array.from(fields);
      fields.forEach(field => {
        field.value = '';
      });
    }
  }
}

