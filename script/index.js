//POPUP EDIT

const popupEdit = document.querySelector('.popup-edit')
const popupEditOpenButton = document.querySelector('.profile__edit-button')
const popupEditCloseButton = popupEdit.querySelector('.popup__close')


function popupToggle(popup) {
  popup.classList.toggle('popup_is-opened')
}

popupEditOpenButton.addEventListener('click', () => { popupToggle(popupEdit) })
popupEditCloseButton.addEventListener('click', () => { popupToggle(popupEdit) })

const profileName = document.querySelector('.profile__info-name')
const profileJob = document.querySelector('.profile__info-job')
const popupJob = popupEdit.querySelector('.popup__field[name="job"]')
const popupName = popupEdit.querySelector('.popup__field[name="name"]')


function fillPopupEditFields() {
  popupJob.value = profileJob.textContent
  popupName.value = profileName.textContent
}

popupEditOpenButton.addEventListener('click', fillPopupEditFields)

const popupEditForm = popupEdit.querySelector('.popup-edit__form')

popupEditForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileJob.textContent = popupJob.value
  profileName.textContent = popupName.value
  popupToggle(popupEdit);
})

//CARDS UI

// LIKE CARD

function likeToggle(likeButton) {
  likeButton.classList.toggle('elements__like-button_liked')
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
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const cardTemplate = document.querySelector('#cards').content;
const cardsContainer = document.querySelector('.elements');

// формирует #document-fragment секции .elements со всеми нужными полями
// и листенарами
function renderCard(card) {
  const cardHTML = cardTemplate.cloneNode(true);

  cardHTML.querySelector('.elements__title').textContent = card.name;

  const cardImg = cardHTML.querySelector('.elements__img');
  cardImg.src = card.link;
  cardImg.alt = card.name;
  cardImg.addEventListener('click', () => {
    popupOpenImg.querySelector('.popup-open-img__card-image').src = card.link
    popupOpenImg.querySelector('.popup-open-img__title').textContent = card.name
    popupToggle(popupOpenImg)
  });

  const likeButton = cardHTML.querySelector('.elements__like-button');
  likeButton.addEventListener('click', () => { likeToggle(likeButton) });

  const deleteButton = cardHTML.querySelector('.elements__delete-button');
  deleteButton.addEventListener('click', (evt) => {
    evt.target.parentElement.remove()
  })

  return cardHTML
}

function renderInitialCards() {
  cards.forEach((card) => {
    const cardHTML = renderCard(card)
    cardsContainer.append(cardHTML);
  });

}

//POPUP ADD CARD

const popupAdd = document.querySelector('.popup-add');
const popupAddOpenButton = document.querySelector('.profile__add-button');
const popupAddCloseButton = popupAdd.querySelector('.popup__close');
const popupAddTitle = popupAdd.querySelector('.popup-add__field[name="title"]');
const popupAddLink = popupAdd.querySelector('.popup-add__field[name="link"]');

function popupAddCleanFields() {
  popupAddLink.value = '';
  popupAddTitle.value = '';
}

popupAddOpenButton.addEventListener('click', () => { popupToggle(popupAdd) });
popupAddCloseButton.addEventListener('click', () => {
  popupToggle(popupAdd);
  popupAddCleanFields();
});

const popupAddForm = popupAdd.querySelector('.popup-add__form');
popupAddForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const card = {
    name: popupAddTitle.value,
    link: popupAddLink.value
  };
  if (!card.name || !card.link) {
    alert('Заполните поля "название" и "ссылка" у карточки');
    return false;
  }

  const cardHTML = renderCard(card);

  cardsContainer.prepend(cardHTML);

  popupToggle(popupAdd);
  popupAddCleanFields();
});

//OPEN CARD IMG

const popupOpenImg = document.querySelector('.popup-open-img');
const popupOpenImgCloseButton = popupOpenImg.querySelector('.popup-open-img__close');
const popupOpenImgTitle = popupOpenImg.querySelector('.popup-open-img__title');

popupOpenImgCloseButton.addEventListener('click', () => { popupToggle(popupOpenImg) });

// Everything else

renderInitialCards();
