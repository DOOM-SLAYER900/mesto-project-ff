import { cardTemplate, popupImage } from "./index.js"


export function createCard(cardElement, func, func2, func3) {
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImageSrc = (cardItem.querySelector(".card__image").src =
    cardElement.link);
  const cardImageAlt = (cardItem.querySelector(".card__image").alt =
    cardElement.name);
  const cardTitle = (cardItem.querySelector(".card__title").textContent =
    cardElement.name);
  const deleteButton = cardItem
    .querySelector(".card__delete-button")
    .addEventListener("click", () => func(cardItem));
  const likeButton = cardItem
    .querySelector(".card__like-button")
    .addEventListener("click", function (evt) {
      func2(evt.target);
    });
  const cardImage = cardItem
    .querySelector(".card__image")
    .addEventListener("click", function () {
      func3(popupImage, cardImageSrc, cardImageAlt, cardTitle);
    });
  return cardItem;
}

export function deleteFunc(cardForRemove) {
  cardForRemove.remove();
};

export function likeFunc(like) {
  like.classList.toggle("card__like-button_is-active");
};
