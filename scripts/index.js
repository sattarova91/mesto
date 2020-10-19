import {Card} from './card.js';
import {cards, formValidatorSelectors} from './constants.js';
import {FormValidator} from './formValidator.js';
import {popupList, popupOpenImg, popupOpen, popupClose} from './utils.js';

const cardsContainer = document.querySelector('.elements');



///////////////////  POPUP EDIT ////////////////////////////////
const popupEdit = document.querySelector('.popup-edit');

const popupEditForm = popupEdit.querySelector('.popup-edit__form');
const popupEditValidator = new FormValidator(formValidatorSelectors, popupEditForm);
popupEditValidator.enableValidation();

const popupEditOpenButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__info-name');
const profileJob = document.querySelector('.profile__info-job');
const popupJob = popupEdit.querySelector('.popup__field[name="job"]');
const popupName = popupEdit.querySelector('.popup__field[name="name"]');

popupEditForm.addEventListener('submit', () => {
  profileJob.textContent = popupJob.value;
  profileName.textContent = popupName.value;
  popupClose(popupEdit);
});

function fillPopupEditFields() {
  popupJob.value = profileJob.textContent;
  popupName.value = profileName.textContent;
}

popupEditOpenButton.addEventListener('click', () => {
  fillPopupEditFields();
  popupEditValidator.validate();
  popupOpen(popupEdit);
});
////////////////////////////////////////////////////////////////

const setPopupEventListeners = (popup) => {
  const form = popup.querySelector('.popup__form');
  if (form) {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  }

  popup.addEventListener('click', (evt) => {
    if (evt.target == evt.currentTarget) {
      // клик был совершен по оверлею, а не по его дочерним элементам
      popupClose(popup);
    }
  });
  const popupCloseButton = popup.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', () => {
    popupClose(popup);
  });
}

const setAllPopupEventListeners = () => {
  popupList.forEach(setPopupEventListeners);
}

setAllPopupEventListeners();


//CARDS UI

function toggleCssClass(element, cssClass) {
  element.classList.toggle(cssClass);
}

cards.forEach((cardData) => {
  const card = new Card(cardData, '.card__template');
  const cardElement = card.generateCard();
  cardsContainer.append(cardElement);

});

///////////////////  POPUP ADD /////////////////////////////////
const popupAdd = document.querySelector('.popup-add');

const popupAddForm = popupAdd.querySelector('.popup-add__form');
const popupAddValidator = new FormValidator(formValidatorSelectors, popupAddForm);
popupAddValidator.enableValidation();

const popupAddOpenButton = document.querySelector('.profile__add-button');
const popupAddTitle = popupAdd.querySelector('.popup-add__field[name="title"]');
const popupAddLink = popupAdd.querySelector('.popup-add__field[name="link"]');

popupAddOpenButton.addEventListener('click', () => {
  popupAddValidator.validate();
  popupOpen(popupAdd);
});

popupAddForm.addEventListener('submit', () => {
  const cardData = {
    name: popupAddTitle.value,
    link: popupAddLink.value
  };

  const card = new Card(cardData, '.card__template');
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);

  popupClose(popupAdd);
});


////////////////////////////////////////////////////////////////

