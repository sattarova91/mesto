import '../pages/index.css';
import Card from '../scripts/components/Card.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import FormValidator from '../scripts/components/FormValidator.js';
import EditPopup from '../scripts/components/EditPopup.js';
import Section from '../scripts/components/Section.js';
import {
  validatorSelectors,
  initialCards,
  popupAddOpenButton,
  popupEditOpenButton,
  FADE_EFFECT_TIMEOUT
} from '../scripts/utils/constants.js';

//////////////////////////////////////////

const editFormValidator = new FormValidator(validatorSelectors, document.querySelector('.popup-edit'));
editFormValidator.enableValidation();

const user = new UserInfo({
  nameSelector: '.profile__info-name',
  infoSelector: '.profile__info-job'
});

const popupEdit = new EditPopup(
  '.popup-edit',
  { validate: () => {
      editFormValidator.validate();
    },
    submit: (inputValues) => {
      user.setUserInfo({
        name: inputValues.name,
        info: inputValues.job
      });
    }
  }
);

popupEditOpenButton.addEventListener('click', function() {
  popupEdit.open(user.getUserInfo());
});

//////////////////////////////////////////
const addFormValidator = new FormValidator(validatorSelectors, document.querySelector('.popup-add'));
addFormValidator.enableValidation();

const popupAdd = new PopupWithForm(
  '.popup-add',
  { submit: (inputValues) => {
      const card = {
        name : inputValues.title,
        link : inputValues.link
      };
      addCard(card);
    },
    validate: () => {
      addFormValidator.validate();
    }
  }
);

popupAddOpenButton.addEventListener('click', function() {
  popupAdd.open();
});

///////////////////////////////////////////

const popupOpenImg = new PopupWithImage('.popup-open-img');

const cardsSection = new Section({
  items: initialCards,
  renderer: addCard
}, '.elements');

function addCard(card) {
  const c = new Card(card, '.card__template', () => {
    popupOpenImg.open(card.name, card.link);
  });
  cardsSection.addItem(c.generateCard());
}

cardsSection.renderItems();
