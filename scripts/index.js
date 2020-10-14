/* import Card form './card.js'; */

const fadeEffectTimeOut = 2;
//POPUP EDIT
const popupList = Array.from(document.querySelectorAll('.popup'));
const popupEdit = document.querySelector('.popup-edit');
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupEditForm = popupEdit.querySelector('.popup-edit__form');
const cardsContainer = document.querySelector('.elements');



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

function popupOpen(popup) {
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

class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.elements__title').textContent = this._name;
    this._element.querySelector('.elements__img').src = this._link;
    this._element.querySelector('.elements__img').alt = this._name;

    this._likeButton = this._element.querySelector('.elements__like-button');
    this._deleteButton = this._element.querySelector('.elements__delete-button');
    this._cardImg = this._element.querySelector('.elements__img');

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handleLikeClick);
    this._deleteButton.addEventListener('click', this._handleDeleteClick);
    this._cardImg.addEventListener('click', () => {
      this._handleImgClick();
    });
  }

  _handleLikeClick(evt) {
    toggleCssClass(evt.target, 'elements__like-button_liked');
  }

  _handleDeleteClick(evt) {
    evt.target.parentElement.remove();
  }

  _handleImgClick() {
    popupOpenImg.querySelector('.popup-open-img__card-image').src = this._link;
    popupOpenImg.querySelector('.popup-open-img__title').textContent = this._name;
    popupOpen(popupOpenImg);
  }
}

cards.forEach((cardData) => {
  const card = new Card(cardData, '.card__template');
  const cardElement = card.generateCard();
  cardsContainer.append(cardElement);

})



/*
const cardTemplate = document.querySelector('#cards').content;

// формирует #document-fragment секции .elements со всеми нужными полями
// и листенарами
function renderCard(card) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.elements__title').textContent = card.name;

  const cardImg = cardElement.querySelector('.elements__img');
  cardImg.src = card.link;
  cardImg.alt = card.name;
  cardImg.addEventListener('click', () => {
    popupOpenImg.querySelector('.popup-open-img__card-image').src = card.link;
    popupOpenImg.querySelector('.popup-open-img__title').textContent = card.name;
    popupOpen(popupOpenImg);
  });

  const likeButton = cardElement.querySelector('.elements__like-button');
  likeButton.addEventListener('click', () => {
    toggleCssClass(likeButton, 'elements__like-button_liked');
  });

  const deleteButton = cardElement.querySelector('.elements__delete-button');
  deleteButton.addEventListener('click', (evt) => {
    evt.target.parentElement.remove();
  });

  return cardElement;
}

function renderInitialCards() {
  cards.forEach((card) => {
    const cardElement = renderCard(card);
    cardsContainer.append(cardElement);
  });

}
 */
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

const popupOpenImg = document.querySelector('.popup-open-img');
const popupOpenImgTitle = popupOpenImg.querySelector('.popup-open-img__title');

// Everything else

/* renderInitialCards(); */
