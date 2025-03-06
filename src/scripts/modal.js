import { createCard, deleteFunc, likeFunc } from "./card.js";
import {
  cardList,
  popupProfileEdit,
  popupNewCard,
  editProfileForm,
  editProfileName,
  editProfileDescription,
  createCardForm,
  createCardName,
  createCardLink,
  profileName,
  profileDescription,
} from "./index.js";

export function openPopup(popup) {
  if (popup === popupProfileEdit) {
    editProfileName.value = profileName.textContent;
    editProfileDescription.value = profileDescription.textContent;
  };
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      popup.classList.remove("popup_is-opened");
    }
  });
}

export function openImagePopup(popup, src, alt, title) {
  const imageInPopup = popup.querySelector(".popup__image");
  const imageTitle = popup.querySelector(".popup__caption");
  popup.classList.add("popup_is-opened");
  imageInPopup.src = src;
  imageInPopup.alt = alt;
  imageTitle.textContent = title;
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      popup.classList.remove("popup_is-opened");
    }
  });
}

export function closePopup(evt) {
  const buttonClosingPopup = evt.currentTarget.querySelector(".popup__close");
  if (evt.target === buttonClosingPopup || evt.target === evt.currentTarget) {
    evt.currentTarget.classList.remove("popup_is-opened");
  }
}

export function submitProfileEditing(evt) {
  evt.preventDefault();
  const NewProfileName = editProfileName.value;
  const NewProfileDescription = editProfileDescription.value;
  profileName.textContent = NewProfileName;
  profileDescription.textContent = NewProfileDescription;
  popupProfileEdit.classList.remove("popup_is-opened");
  editProfileForm.reset();
}

export function submitCardCreate(evt) {
  evt.preventDefault();
  const cardName = createCardName.value;
  const imageLink = createCardLink.value;
  const newCardValue = { name: cardName, link: imageLink };
  cardList.prepend(
    createCard(newCardValue, deleteFunc, likeFunc, openImagePopup)
  );
  popupNewCard.classList.remove("popup_is-opened");
  createCardForm.reset();
}
