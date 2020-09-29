//POPUP EDIT

const popupEdit = document.querySelector('.popup-edit')
const popupEditOpenButton = document.querySelector('.profile__edit-button')
const popupEditForm = popupEdit.querySelector('.popup-edit__form')


function popupToggle(popup) {
  popup.classList.toggle('popup_is-opened')
}

function popupCleanFields(popup) {
  const fieldList = Array.from(popup.querySelectorAll('.popup__field'));
  fieldList.forEach((field) => {
    field.value = '';
  })
}

function popupClose(popup) {
  popupToggle(popup)
  popupCleanFields(popup)
}

function popupOpen(popup) {
  const form = popup.querySelector('.popup__form')
  if (form) {
    const fieldList = Array.from(popup.querySelectorAll('.popup__field'))
    const button = popup.querySelector('.popup__save-button');
    toggleButtonState(
      {
        submitButtonSelector: '.popup__save-button',
        inactiveButtonClass: 'popup__save-button_disabled'
      },
      fieldList,
      button
    )
  }
  popupToggle(popup)
}

popupEditOpenButton.addEventListener('click', () => {
  fillPopupEditFields()
  popupOpen(popupEdit)
})

const profileName = document.querySelector('.profile__info-name')
const profileJob = document.querySelector('.profile__info-job')
const popupJob = popupEdit.querySelector('.popup__field[name="job"]')
const popupName = popupEdit.querySelector('.popup__field[name="name"]')



function fillPopupEditFields() {
  popupJob.value = profileJob.textContent
  popupName.value = profileName.textContent
}

popupEditForm.addEventListener('submit', (evt) => {
  profileJob.textContent = popupJob.value
  profileName.textContent = popupName.value
  popupClose(popupEdit);
})


const setAllPopupEventListeners = () => {
  popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach(setPopupEventListeners)
}

const setPopupEventListeners = (popup) => {
  const form = popup.querySelector('.popup__form')
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
  })
  const popupCloseButton = popup.querySelector('.popup__close')
  popupCloseButton.addEventListener('click', () => {
    popupClose(popup)
  })
}

document.addEventListener('keydown', (evt) => {
  const popup = document.querySelector('.popup_is-opened')

  if (popup && evt.key == "Escape") {
    popupClose(popup);
  }
})

setAllPopupEventListeners()


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
    popupOpen(popupOpenImg)
  });

  const likeButton = cardHTML.querySelector('.elements__like-button');
  likeButton.addEventListener('click', (evt) => {
    likeToggle(likeButton)
  });

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
const popupAddTitle = popupAdd.querySelector('.popup-add__field[name="title"]');
const popupAddLink = popupAdd.querySelector('.popup-add__field[name="link"]');

popupAddOpenButton.addEventListener('click', () => { popupOpen(popupAdd) });

const popupAddForm = popupAdd.querySelector('.popup-add__form');
popupAddForm.addEventListener('submit', (evt) => {
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

  popupClose(popupAdd)
});

//OPEN CARD IMG

const popupOpenImg = document.querySelector('.popup-open-img');
const popupOpenImgTitle = popupOpenImg.querySelector('.popup-open-img__title');

// Everything else

renderInitialCards();
