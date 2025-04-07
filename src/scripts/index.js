import { createCard, deleteFunc, likeFunc } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getProfileData,
  serverProfileEditing,
  serverAvatarUpdate,
  postNewCard,
  deleteServerCard,
  putLike,
  deleteLike,
  getInitialCards,
} from "./api.js";
import "../pages/index.css";

export const cardList = document.querySelector(".places__list");

export const popupUpdateAvatar = document.querySelector(
  ".popup_type_update-avatar"
);
export const popupProfileEdit = document.querySelector(".popup_type_edit");
export const popupNewCard = document.querySelector(".popup_type_new-card");
export const popupImage = document.querySelector(".popup_type_image");
export const popups = document.querySelectorAll(".popup");

export const buttonpUpdateAvatar = document.querySelector(
  ".profile__update-avatar-button"
);
export const buttonProfileEdit = document.querySelector(
  ".profile__edit-button"
);
export const buttonNewCard = document.querySelector(".profile__add-button");

export const updateAvatarForm = document.forms.updateAvatar;
export const updateAvatarLink = updateAvatarForm.elements.link;
export const editProfileForm = document.forms.editProfile;
export const editProfileName = editProfileForm.elements.name;
export const editProfileDescription = editProfileForm.elements.description;
export const createCardForm = document.forms.newPlace;
export const createCardName = createCardForm.elements.placeName;
export const createCardLink = createCardForm.elements.link;

export const profileName = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileImage = document.querySelector(".profile__image");
export let currentUser = null;
export const logError = (error) => {
  console.error("Ошибка:", error);
};
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  spanErrorClass: ".popup__input-error",
};

function openImagePopup(src, alt, title) {
  const imageInPopup = popupImage.querySelector(".popup__image");
  const imageTitle = popupImage.querySelector(".popup__caption");
  openPopup(popupImage);
  imageInPopup.src = src;
  imageInPopup.alt = alt;
  imageTitle.textContent = title;
}

function submitAvatarUpdate(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";
  const newAvatarLink = updateAvatarLink.value;
  profileImage.style.backgroundImage = `url(${newAvatarLink})`;
  serverAvatarUpdate(newAvatarLink)
    .catch(logError)
    .finally(() => {
      submitButton.textContent = "Сохранить";
    });
  updateAvatarForm.reset();
  closePopup(popupUpdateAvatar);
}

function submitProfileEditing(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";
  const newProfileName = editProfileName.value;
  const newProfileDescription = editProfileDescription.value;
  const newProfileValue = {
    name: newProfileName,
    about: newProfileDescription,
  };
  profileName.textContent = newProfileName;
  profileDescription.textContent = newProfileDescription;
  serverProfileEditing(newProfileValue)
    .catch(logError)
    .finally(() => {
      submitButton.textContent = "Сохранить";
    });
  closePopup(popupProfileEdit);
}

function submitCardCreate(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";
  const cardName = createCardName.value;
  const imageLink = createCardLink.value;
  const newCardValue = { name: cardName, link: imageLink };
  postNewCard(newCardValue)
    .then((card) => {
      const cardValue = card;
      cardList.prepend(
        createCard(
          cardValue,
          likeFunc,
          openImagePopup,
          deleteFunc,
          currentUser,
          deleteServerCard,
          putLike,
          deleteLike
        )
      );
      createCardForm.reset();
      closePopup(popupNewCard);
    })
    .catch(logError)
    .finally(() => {
      submitButton.textContent = "Сохранить";
    });
}

buttonpUpdateAvatar.addEventListener("click", function () {
  const form = popupUpdateAvatar.querySelector(validationConfig.formSelector);
  clearValidation(validationConfig, form);
  openPopup(popupUpdateAvatar);
});
updateAvatarForm.addEventListener("submit", submitAvatarUpdate);

buttonProfileEdit.addEventListener("click", function () {
  editProfileName.value = profileName.textContent;
  editProfileDescription.value = profileDescription.textContent;
  openPopup(popupProfileEdit);
});
editProfileForm.addEventListener("submit", submitProfileEditing);

buttonNewCard.addEventListener("click", function () {
  const form = popupUpdateAvatar.querySelector(validationConfig.formSelector);
  clearValidation(validationConfig, form);
  openPopup(popupNewCard);
});
createCardForm.addEventListener("submit", submitCardCreate);

popups.forEach((openPopup) => {
  openPopup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup_is-opened") ||
      evt.target.classList.contains("popup__close")
    ) {
      closePopup(openPopup);
      if (openPopup.querySelector(validationConfig.formSelector)) {
        const form = openPopup.querySelector(validationConfig.formSelector);
        clearValidation(validationConfig, form);
      }
    }
  });
});

enableValidation(validationConfig);

Promise.all([getProfileData, getInitialCards])
  .then(([profileInfo, cards]) => {
    profileName.textContent = profileInfo.name;
    profileDescription.textContent = profileInfo.about;
    profileImage.style.backgroundImage = `url(${profileInfo.avatar})`;
    currentUser = profileInfo;
    cards.forEach(function addCard(cardValue) {
      cardList.append(
        createCard(
          cardValue,
          likeFunc,
          openImagePopup,
          deleteFunc,
          currentUser,
          deleteServerCard,
          putLike,
          deleteLike
        )
      );
    });
  })
  .catch(logError);
