import { cardList, createCard, deleteFunc, likeFunc } from "./card.js";
const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
export const popupImage = document.querySelector(".popup_type_image");

const buttonProfileEdit = document.querySelector(".profile__edit-button");
const buttonNewCard = document.querySelector(".profile__add-button");

const editProfileForm = document.forms.editProfile;
const editProfileName = editProfileForm.elements.name;
const editProfileDescription = editProfileForm.elements.description;
const createCardForm = document.forms.newPlace;
const createCardName = createCardForm.elements.placeName;
const createCardLink = createCardForm.elements.link;

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function openPopup(popup) {
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

function closePopup(evt) {
  const buttonClosingPopup = evt.currentTarget.querySelector(".popup__close");
  if (evt.target === buttonClosingPopup || evt.target === evt.currentTarget) {
    evt.currentTarget.classList.remove("popup_is-opened");
  }
}

function submitProfileEditing(evt) {
  evt.preventDefault();
  const NewProfileName = editProfileName.value;
  const NewProfileDescription = editProfileDescription.value;
  profileName.textContent = NewProfileName;
  profileDescription.textContent = NewProfileDescription;
  popupProfileEdit.classList.remove("popup_is-opened");
  editProfileForm.reset();
}

function submitCardCreate(evt) {
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
