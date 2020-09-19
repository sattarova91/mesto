//POPUP EDIT

const popupEdit = document.querySelector('.popup-edit')
const popupEditOpenButton = document.querySelector('.profile__edit-button')
const popupEditCloseButton = popupEdit.querySelector('.popup__close')


function popupToggle (popup) {
  popup.classList.toggle('popup_is-opened')
}

popupEditOpenButton.addEventListener('click', () => {popupToggle(popupEdit)})
popupEditCloseButton.addEventListener('click', () => {popupToggle(popupEdit)})

const profileName = document.querySelector('.profile__info-name')
const profileJob = document.querySelector('.profile__info-job')
const popupJob = popupEdit.querySelector('.popup__field[name="job"]')
const popupName = popupEdit.querySelector('.popup__field[name="name"]')


function fillPopupEditFields () {
  popupJob.value = profileJob.textContent
  popupName.value = profileName.textContent
}

popupEditOpenButton.addEventListener('click', fillPopupEditFields)

const submitEditButton = popupEdit.querySelector('.popup-edit__save-button')

function submitEditPopup (evt) {
  evt.preventDefault();
  profileJob.textContent = popupJob.value
  profileName.textContent = popupName.value
}

submitEditButton.addEventListener('click', submitEditPopup)
submitEditButton.addEventListener('click', () => {popupToggle(popupEdit)})

//CARDS UI

// LIKE CARD

function likeToggle (likeButton) {
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

function renderCard(card)  {
  let cardHTML = cardTemplate.cloneNode(true);
  cardHTML.querySelector('.elements__title').textContent = card.name;
  cardHTML.querySelector('.elements__img').src = card.link;
  cardHTML.querySelector('.elements__img').alt = card.name;
  cardsContainer.prepend(cardHTML);

  let cardImg = cardsContainer.querySelector('.elements__img');
  cardImg.addEventListener('click', (evt) => {
    popupToggle(popupOpenImg)
    let cardHTML = evt.target.parentElement
    popupOpenImg.querySelector('.popup-open-img__card-image').src = cardHTML.querySelector('.elements__img').src
    popupOpenImg.querySelector('.popup-open-img__title').textContent = cardHTML.querySelector('.elements__title').textContent

  });

  let likeButton = cardsContainer.querySelector('.elements__like-button');
  likeButton.addEventListener('click', () => {likeToggle(likeButton)});

  let deleteButton = cardsContainer.querySelector('.elements__delete-button');
  deleteButton.addEventListener('click', (evt) =>{
    evt.target.parentElement.remove()
  })
}

function renderCards() {
  cards.reverse().forEach(renderCard);
}

function addCard(card) {
  if (!card.name || !card.link) {
    alert('Заполните поля "название" и "ссылка" у карточки');
  } else {
    renderCard(card);
  }
}

//POPUP ADD CARD

const popupAdd = document.querySelector('.popup-add');
const popupAddOpenButton = document.querySelector('.profile__add-button');
const popupAddCloseButton = popupAdd.querySelector('.popup__close');
const popupAddCreateButton = popupAdd.querySelector('.popup-add__add-button');
const popupAddTitle = popupAdd.querySelector('.popup-add__field[name="title"]');
const popupAddLink = popupAdd.querySelector('.popup-add__field[name="link"]');

function popudAddCleanFields() {
  popupAddLink.value = '';
  popupAddTitle.value = '';
}

popupAddOpenButton.addEventListener('click', () => {popupToggle(popupAdd)});
popupAddCloseButton.addEventListener('click', () => {
  popupToggle(popupAdd);
  popudAddCleanFields();
});

popupAddCreateButton.addEventListener('click', () => {popupToggle(popupAdd)});
popupAddCreateButton.addEventListener('click', () => {
  addCard( {
    name: popupAddTitle.value,
    link: popupAddLink.value
  })
  popudAddCleanFields();
});

popupAddCreateButton.addEventListener('click', () => {
  popupAddLink.value = '';
  popupAddTitle.value = '';
});

renderCards();

//OPEN CARD IMG

const popupOpenImg = document.querySelector('.popup-open-img');
const popupOpenImgCloseButton = popupOpenImg.querySelector('.popup-open-img__close');
const popupOpenImgTitle = popupOpenImg.querySelector('.popup-open-img__title');

popupOpenImgCloseButton.addEventListener('click', () => {popupToggle(popupOpenImg)});
