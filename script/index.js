
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


function fillPopupFields () {
  popupJob.value = profileJob.textContent
  popupName.value = profileName.textContent
}

popupEditOpenButton.addEventListener('click', fillPopupFields)

const submitEditButton = popupEdit.querySelector('.popup-edit__save-button')

function submitEditPopup (evt) {
  evt.preventDefault();
  profileJob.textContent = popupJob.value
  profileName.textContent = popupName.value
}

submitEditButton.addEventListener('click', submitEditPopup)
submitEditButton.addEventListener('click', () => {popupToggle(popupEdit)})

const popupAdd = document.querySelector('.popup-add')
const popupAddOpenButton = document.querySelector('.profile__add-button')
const popupAddCloseButton = popupAdd.querySelector('.popup__close')


popupAddOpenButton.addEventListener('click', () => {popupToggle(popupAdd)})
popupAddCloseButton.addEventListener('click', () => {popupToggle(popupAdd)})

