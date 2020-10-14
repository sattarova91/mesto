import {Card} from './card.js';

const fadeEffectTimeOut = 2;
const popupList = Array.from(document.querySelectorAll('.popup'));
const popupEdit = document.querySelector('.popup-edit');
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupEditForm = popupEdit.querySelector('.popup-edit__form');
const cardsContainer = document.querySelector('.elements');

export const popupOpenImg = document.querySelector('.popup-open-img');


function popupToggle(popup) {
  popup.classList.toggle('popup_is-opened');
}

function popupCleanFields(popup) {
  const fieldList = Array.from(popup.querySelectorAll('.popup__field'));
  fieldList.forEach((field) => {
    field.value = '';
  })
}

function popupOverlayListener(evt) {
  const popup = document.querySelector('.popup_is-opened');
  if (popup && evt.key == "Escape") {
    popupClose(popup);
  }
}

function addCssFadeEffect(element, num) {
  element.style.transition = `visibility .${num}s,opacity .${num*2}s ease-in-out`;
}

popupList.forEach((popup) => {
  addCssFadeEffect(popup, fadeEffectTimeOut);
});


function popupClose(popup) {
  document.removeEventListener('keydown', popupOverlayListener);
  popupToggle(popup);
  setTimeout(popupCleanFields, fadeEffectTimeOut*100, popup);
}

export function popupOpen(popup) {
  const form = popup.querySelector('.popup__form');
  if (form) {
    const validator = new FormValidator(formValidatorSelectors, form);
    validator.validate();
  }
  document.addEventListener('keydown', popupOverlayListener);
  popupToggle(popup);
}

function fillPopupEditFields() {
  popupJob.value = profileJob.textContent;
  popupName.value = profileName.textContent;
}

popupEditOpenButton.addEventListener('click', () => {
  fillPopupEditFields();
  popupOpen(popupEdit);
});


const profileName = document.querySelector('.profile__info-name');
const profileJob = document.querySelector('.profile__info-job');
const popupJob = popupEdit.querySelector('.popup__field[name="job"]');
const popupName = popupEdit.querySelector('.popup__field[name="name"]');


popupEditForm.addEventListener('submit', () => {
  profileJob.textContent = popupJob.value;
  profileName.textContent = popupName.value;
  popupClose(popupEdit);
});


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

// LIKE CARD

function toggleCssClass(element, cssClass) {
  element.classList.toggle(cssClass);
}


const cards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкaл',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

cards.forEach((cardData) => {
  const card = new Card(cardData, '.card__template');
  const cardElement = card.generateCard();
  cardsContainer.append(cardElement);

});

//POPUP ADD CARD

const popupAdd = document.querySelector('.popup-add');
const popupAddOpenButton = document.querySelector('.profile__add-button');
const popupAddTitle = popupAdd.querySelector('.popup-add__field[name="title"]');
const popupAddLink = popupAdd.querySelector('.popup-add__field[name="link"]');

popupAddOpenButton.addEventListener('click', () => { popupOpen(popupAdd) });

const popupAddForm = popupAdd.querySelector('.popup-add__form');
popupAddForm.addEventListener('submit', () => {
  const cardData = {
    name: popupAddTitle.value,
    link: popupAddLink.value
  };
  if (!cardData.name || !cardData.link) {
    alert('Заполните поля "название" и "ссылка" у карточки');
    return false;
  }

  const card = new Card(cardData, '.card__template');
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);

  popupClose(popupAdd);
});

//OPEN CARD IMG



// Everything else

/* renderInitialCards(); */
