import {fadeEffectTimeOut} from './constants.js';


export const popupOpenImg = document.querySelector('.popup-open-img');
export const popupList = Array.from(document.querySelectorAll('.popup'));


function addCssFadeEffect(element, num) {
  element.style.transition = `visibility .${num}s,opacity .${num*2}s ease-in-out`;
}
popupList.forEach((popup) => {
  addCssFadeEffect(popup, fadeEffectTimeOut);
});

export function popupOpen(popup) {
  document.addEventListener('keydown', popupOverlayListener);
  popupToggle(popup);
}

export function popupClose(popup) {
  document.removeEventListener('keydown', popupOverlayListener);
  popupToggle(popup);
  setTimeout(popupCleanFields, fadeEffectTimeOut*100, popup);
}

function popupOverlayListener(evt) {
  const popup = document.querySelector('.popup_is-opened');
  if (popup && evt.key == "Escape") {
    popupClose(popup);
  }
}

function popupToggle(popup) {
  popup.classList.toggle('popup_is-opened');
}

function popupCleanFields(popup) {
  const fieldList = Array.from(popup.querySelectorAll('.popup__field'));
  fieldList.forEach((field) => {
    field.value = '';
  })
}
