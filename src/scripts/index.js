import { initialCards } from "./cards.js";
import { createCard, deleteFunc, likeFunc } from "./card.js";
import {
  openPopup,
  openImagePopup,
  closePopup,
  submitProfileEditing,
  submitCardCreate,
} from "./modal.js";

import "../pages/index.css";

export const cardTemplate = document.querySelector("#card-template").content;
export const cardList = document.querySelector(".places__list");

export const popupProfileEdit = document.querySelector(".popup_type_edit");
export const popupNewCard = document.querySelector(".popup_type_new-card");
export const popupImage = document.querySelector(".popup_type_image");

export const buttonProfileEdit = document.querySelector(
  ".profile__edit-button"
);
export const buttonNewCard = document.querySelector(".profile__add-button");

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

initialCards.forEach(function addCard(cardValue) {
  cardList.append(createCard(cardValue, deleteFunc, likeFunc, openImagePopup));
});

buttonProfileEdit.addEventListener("click", function () {
  openPopup(popupProfileEdit);
});
popupProfileEdit.addEventListener("click", function (evt) {
  closePopup(evt);
});
editProfileForm.addEventListener("submit", submitProfileEditing);

buttonNewCard.addEventListener("click", function () {
  openPopup(popupNewCard);
});
popupNewCard.addEventListener("click", function (evt) {
  closePopup(evt);
});
createCardForm.addEventListener("submit", submitCardCreate);

popupImage.addEventListener("click", function (evt) {
  closePopup(evt);
});
