import '../pages/index.css';
import {API} from '../scripts/components/Api.js';
import ApiCard from '../scripts/components/ApiCard.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import ApiUserInfo from '../scripts/components/ApiUserInfo.js';
import FormValidator from '../scripts/components/FormValidator.js';
import EditPopup from '../scripts/components/EditPopup.js';
import Section from '../scripts/components/Section.js';
import {
  validatorSelectors,
  initialCards,
  popupAddOpenButton,
  popupEditOpenButton
} from '../scripts/utils/constants.js';


//////////////////////////////////////////
const editFormValidator = new FormValidator(validatorSelectors, document.querySelector('.popup-edit'));
editFormValidator.enableValidation();

const user = new ApiUserInfo({
  nameSelector: '.profile__info-name',
  infoSelector: '.profile__info-job',
  avatarSelector: '.profile__avatar'
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
      API.addCard(card).then((apiCard) => {
        renderCard(apiCard);
      });
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
  items: [],
  renderer: renderCard
}, '.elements');

function renderCard(card) {
  const c = new ApiCard(card, '.card__template', () => {
    popupOpenImg.open(card.name, card.link);
  });
  cardsSection.addItem(c.generateCard());
}

API.getInitialCards().then((apiCards) => {
  apiCards.reverse().forEach(renderCard);
});
