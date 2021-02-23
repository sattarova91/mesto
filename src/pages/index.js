import '../pages/index.css';
import Card from '../scripts/components/Card.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithConfirm from '../scripts/components/PopupWithConfirm.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import FormValidator from '../scripts/components/FormValidator.js';
import EditPopup from '../scripts/components/EditPopup.js';
import Section from '../scripts/components/Section.js';
import Api from '../scripts/components/Api.js';
import UserInfo from '../scripts/components/UserInfo.js';

import {
  validatorSelectors,
  popupAddOpenButton,
  popupEditOpenButton,
  popupUpdateAvatarButton
} from '../scripts/utils/constants.js';

//////////////////////////////////////////

//////////////////////////////////////////


const API = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    authorization: 'bde13069-7cbc-4063-9ad5-2d5660d9e188',
    'Content-Type': 'application/json'
  }
});

const CURRENT_USER = new UserInfo({
  nameSelector: '.profile__info-name',
  aboutSelector: '.profile__info-job',
  avatarSelector: '.profile__avatar'
});

//////// AVATAR
const updateAvatarFormValidator = new FormValidator(validatorSelectors, document.querySelector('.popup-update-avatar'));
updateAvatarFormValidator.enableValidation();

const popupUpdateAvatar = new PopupWithForm(
  '.popup-update-avatar',
  { validate: () => {
      updateAvatarFormValidator.validate();
    },
    submit: (inputValues) => {
      popupUpdateAvatar.lock();
      API.updateCurrentUserAvatar(inputValues.avatar).then((data) => {
        CURRENT_USER.setUserInfo(data);
      }).finally(() => {
        popupUpdateAvatar.unlock();
      });
    }
 }
);

popupUpdateAvatarButton.addEventListener('click', function() {
  popupUpdateAvatar.open();
});
////////

//////// User Edit

const editFormValidator = new FormValidator(validatorSelectors, document.querySelector('.popup-edit'));
editFormValidator.enableValidation();

const popupEdit = new EditPopup(
  '.popup-edit',
  { validate: () => {
      editFormValidator.validate();
    },
    submit: (inputValues) => {
      popupEdit.lock();
      API.updateCurrentUser({
        name: inputValues.name,
        about: inputValues.job
      }).then((data) => {
        CURRENT_USER.setUserInfo(data);
      }).finally(() => {
        popupEdit.unlock();
      });
    }
  }
);

popupEditOpenButton.addEventListener('click', function() {
  popupEdit.open(CURRENT_USER.getUserInfo());
});

//////// Add Card

const addFormValidator = new FormValidator(validatorSelectors, document.querySelector('.popup-add'));
addFormValidator.enableValidation();

const popupOpenImg = new PopupWithImage('.popup-open-img');

const popupConfirmCard = new PopupWithConfirm(
  '.popup-confirm-card',
  { confirm: (card) => {
      API.deleteCard(card._data._id).then(() => {
        card.delete();
      });
    }
  }
);

//////// Data Init


Promise.all([
  API.getCurrentUser(),
  API.getInitialCards()
]).then(([currentUserData, apiCards]) => {
  CURRENT_USER.setUserInfo(currentUserData);

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

  const cardsSection = new Section({
    items: apiCards.reverse(),
    renderer: renderCard
  }, '.elements');
  cardsSection.renderItems();

  function renderCard(card) {
    const c = new Card(
      currentUserData._id,
      card, '.card__template', {
        handleCardClick: (name, link) => {
          popupOpenImg.open(name, link);
        },
        handleDeleteClick: () => {
          popupConfirmCard.open(c);
        },
        handeLikeClick: () => {
          if(c.isOwnLiked()) {
            API.unlikeCard(c._data._id).then(() => {
              c._data.likes.splice(c.ownLikePos(), 1);
              c.updateData(c._data);
            });
          } else {
            API.likeCard(c._data._id).then((newData) => {
              c.updateData(newData);
            });
          }
        }
      }
    );
    cardsSection.addItem(c.generateCard());
  }
}).catch((err)=>{     //попадаем сюда если один из промисов завершится ошибкой
  console.log(err);
});


