import { createCard, deleteFunc, likeFunc } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  profileData,
  serverProfileEditing,
  serverAvatarUpdate,
  initialServerCards,
  serverProfileData,
  postNewCard,
  deleteServerCard,
  putLike,
  deleteLike,
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
export let userIdNewCard = null;

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
  const NewAvatarLink = updateAvatarLink.value;
  profileImage.style.backgroundImage = `url(${NewAvatarLink})`;
  serverAvatarUpdate(NewAvatarLink, submitButton);
  updateAvatarForm.reset();
  closePopup(popupUpdateAvatar);
}

function submitProfileEditing(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";
  const NewProfileName = editProfileName.value;
  const NewProfileDescription = editProfileDescription.value;
  const NewProfileValue = {
    name: NewProfileName,
    about: NewProfileDescription,
  };
  profileName.textContent = NewProfileName;
  profileDescription.textContent = NewProfileDescription;
  serverProfileEditing(NewProfileValue, submitButton);
  closePopup(popupProfileEdit);

}

function submitCardCreate(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";
  const cardName = createCardName.value;
  const imageLink = createCardLink.value;
  const newCardValue = { name: cardName, link: imageLink };
  Promise.all([serverProfileData, postNewCard(newCardValue)])
    .then(([profileInfo, card]) => {
      const cardValue = card;
      console.log(cardValue);
      cardList.prepend(
        createCard(
          cardValue,
          likeFunc,
          openImagePopup,
          deleteFunc,
          profileInfo,
          deleteServerCard,
          putLike,
          deleteLike
        )
      );
      createCardForm.reset();
      closePopup(popupNewCard);
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    })
    .finally(() => {
      submitButton.textContent = "Сохранить";
    });
}

buttonpUpdateAvatar.addEventListener("click", function () {
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
  openPopup(popupNewCard);
});
createCardForm.addEventListener("submit", submitCardCreate);

popups.forEach((openPopup) => {
  openPopup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      clearValidation(openPopup);
      closePopup(openPopup);
    }
    if (evt.target.classList.contains("popup__close")) {
      clearValidation(openPopup);
      closePopup(openPopup);
    }
  });
});

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
profileData(profileName, profileImage, profileDescription);

Promise.all([serverProfileData, initialServerCards]).then(
  ([profileInfo, cards]) => {
    cards.forEach(function addCard(cardValue) {
      cardList.append(
        createCard(
          cardValue,
          likeFunc,
          openImagePopup,
          deleteFunc,
          profileInfo,
          deleteServerCard,
          putLike,
          deleteLike
        )
      );
    });
  }
);
