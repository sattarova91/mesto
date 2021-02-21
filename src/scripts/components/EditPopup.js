import PopupWithForm from './PopupWithForm.js';

export default class EditPopup extends PopupWithForm {
  open({name, about}) {
    this._element.querySelector('#name-field').value = name;
    this._element.querySelector('#job-field').value = about;
    super.open();
  }
}
