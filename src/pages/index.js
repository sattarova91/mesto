import '../pages/index.css';
import ApiCard from '../scripts/components/ApiCard.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithConfirm from '../scripts/components/PopupWithConfirm.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import FormValidator from '../scripts/components/FormValidator.js';
import EditPopup from '../scripts/components/EditPopup.js';
import Section from '../scripts/components/Section.js';
import {
  validatorSelectors,
  popupAddOpenButton,
  popupEditOpenButton,
  popupUpdateAvatarButton,
  API,
  CURRENT_USER
} from '../scripts/utils/constants.js';

//////////////////////////////////////////

//////////////////////////////////////////
const updateAvatarFormValidator = new FormValidator(validatorSelectors, document.querySelector('.popup-update-avatar'));
updateAvatarFormValidator.enableValidation();

const popupUpdateAvatar = new PopupWithForm(
  '.popup-update-avatar',
  { validate: () => {
      updateAvatarFormValidator.validate();
    },
    submit: (inputValues) => {
      popupUpdateAvatar.lock();
      CURRENT_USER.updateUserAvatar(inputValues.avatar).finally(() => {
        popupUpdateAvatar.unlock();
      });
    }
 }
);

popupUpdateAvatarButton.addEventListener('click', function() {
  popupUpdateAvatar.open();
});
//////////////////////////////////////////
const editFormValidator = new FormValidator(validatorSelectors, document.querySelector('.popup-edit'));
editFormValidator.enableValidation();



const popupEdit = new EditPopup(
  '.popup-edit',
  { validate: () => {
      editFormValidator.validate();
    },
    submit: (inputValues) => {
      popupEdit.lock();
      CURRENT_USER.setUserInfo({
        name: inputValues.name,
        about: inputValues.job
      }).finally(() => {
        popupEdit.unlock();
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

      popupAdd.lock();
      API.addCard(card).then((apiCard) => {
        renderCard(apiCard);
      }).finally(() => {
        popupAdd.unlock();
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

const popupConfirmCard = new PopupWithConfirm(
  '.popup-confirm-card',
  { confirm: (card) => {
      card.delete();
    }
  }
);


const cardsSection = new Section({
  items: [],
  renderer: renderCard
}, '.elements');

function renderCard(card) {
  const c = new ApiCard(
    card, '.card__template', {
      handleCardClick: (name, link) => {
        popupOpenImg.open(name, link);
      },
      handleDeleteClick: () => {
        popupConfirmCard.open(c);
      }
    }
  );
  cardsSection.addItem(c.generateCard());
}

API.getInitialCards().then((apiCards) => {
  apiCards.reverse().forEach(renderCard);
});
