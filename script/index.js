
const popup = document.querySelector('.popup-edit')
const popupOpenButton = document.querySelector('.profile__edit-button')
const popupCloseButton = popup.querySelector('.popup__close')


function popupToggle () {
  popup.classList.toggle('popup_is-opened')
}

popupOpenButton.addEventListener('click', popupToggle)
popupCloseButton.addEventListener('click', popupToggle)

const profileName = document.querySelector('.profile__info-name')
const profileJob = document.querySelector('.profile__info-job')
const popupJob = document.querySelector('.popup__field[name="job"]')
const popupName = document.querySelector('.popup__field[name="name"]')


function fillPopupFields () {
  popupJob.value = profileJob.textContent
  popupName.value = profileName.textContent
}

popupOpenButton.addEventListener('click', fillPopupFields)

const submitButton = document.querySelector('.popup__save-button')

function submitPopup (evt) {
  evt.preventDefault();
  profileJob.textContent = popupJob.value
  profileName.textContent = popupName.value
}

submitButton.addEventListener('click', submitPopup)
submitButton.addEventListener('click', popupToggle)
