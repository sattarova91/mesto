import PopupWithForm from './PopupWithForm.js';

export default class EditPopup extends PopupWithForm {
  open({name, info}) {
    this._element.querySelector('#name-field').value = name;
    this._element.querySelector('#job-field').value = info;
    super.open();
  }
}
