import { initialCards } from "./cards.js";
import { createCard, deleteFunc, likeFunc } from "./card.js";
import {
  openPopup,
  closePopup,
} from "./modal.js";
import "../pages/index.css";

export const cardList = document.querySelector(".places__list");

export const popupProfileEdit = document.querySelector(".popup_type_edit");
export const popupNewCard = document.querySelector(".popup_type_new-card");
export const popupImage = document.querySelector(".popup_type_image");
export const popups = document.querySelectorAll('.popup');

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

function openImagePopup(popup, src, alt, title) {
  const imageInPopup = popup.querySelector(".popup__image");
  const imageTitle = popup.querySelector(".popup__caption");
  openPopup(popup);
  imageInPopup.src = src;
  imageInPopup.alt = alt;
  imageTitle.textContent = title;
};

function submitProfileEditing(evt) {
  evt.preventDefault();
  const NewProfileName = editProfileName.value;
  const NewProfileDescription = editProfileDescription.value;
  profileName.textContent = NewProfileName;
  profileDescription.textContent = NewProfileDescription;
  closePopup(popupProfileEdit);
  editProfileForm.reset();
};

function submitCardCreate(evt) {
  evt.preventDefault();
  const cardName = createCardName.value;
  const imageLink = createCardLink.value;
  const newCardValue = { name: cardName, link: imageLink };
  cardList.prepend(
    createCard(newCardValue, deleteFunc, likeFunc, openImagePopup)
  );
  closePopup(popupNewCard);
  createCardForm.reset();
};

initialCards.forEach(function addCard(cardValue) {
  cardList.append(createCard(cardValue, deleteFunc, likeFunc, openImagePopup));
});

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
  openPopup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_is-opened')) {
          closePopup(openPopup)
      }
      if (evt.target.classList.contains('popup__close')) {
        closePopup(openPopup)
      }
  })
});
