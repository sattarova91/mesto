import '../pages/index.css';
import ApiCard from '../scripts/components/ApiCard.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import FormValidator from '../scripts/components/FormValidator.js';
import EditPopup from '../scripts/components/EditPopup.js';
import Section from '../scripts/components/Section.js';
import {
  validatorSelectors,
  popupAddOpenButton,
  popupEditOpenButton,
  API,
  CURRENT_USER
} from '../scripts/utils/constants.js';


//////////////////////////////////////////
const editFormValidator = new FormValidator(validatorSelectors, document.querySelector('.popup-edit'));
editFormValidator.enableValidation();



const popupEdit = new EditPopup(
  '.popup-edit',
  { validate: () => {
      editFormValidator.validate();
    },
    submit: (inputValues) => {
      CURRENT_USER.setUserInfo({
        name: inputValues.name,
        about: inputValues.job
      });
    }
  }
);

popupEditOpenButton.addEventListener('click', function() {
  popupEdit.open(CURRENT_USER.getUserInfo());
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
