export const cardTemplate = document.querySelector("#card-template").content;

export function createCard(newCardValue, delFunc, likeFunc, openPopupFunc) {
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImageSrc = (cardItem.querySelector(".card__image").src =
    newCardValue.link);
  const cardImageAlt = (cardItem.querySelector(".card__image").alt =
    newCardValue.name);
  const cardTitle = (cardItem.querySelector(".card__title").textContent =
    newCardValue.name);
  const deleteButton = cardItem
    .querySelector(".card__delete-button")
    .addEventListener("click", () => delFunc(cardItem));
  const likeButton = cardItem
    .querySelector(".card__like-button")
    .addEventListener("click", function (evt) {
      likeFunc(evt.target);
    });
  const cardImage = cardItem
    .querySelector(".card__image")
    .addEventListener("click", function () {
      openPopupFunc(cardImageSrc, cardImageAlt, cardTitle);
    });
  return cardItem;
};

export function deleteFunc(cardForRemove) {
  cardForRemove.remove();
};

export function likeFunc(like) {
  like.classList.toggle("card__like-button_is-active");
};
