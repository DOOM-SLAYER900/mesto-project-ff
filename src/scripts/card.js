export const cardTemplate = document.querySelector("#card-template").content;

export const deleteCallback = (id, card) => {
  delSerCard(id)
    .then(() => delFunc(card))
    .catch((error) => {
      console.error("Ошибка:", error);
    });
};

export function createCard(
  newCardValue,
  likeFunc,
  openPopupFunc,
  delFunc,
  user,
  delSerCard,
  putLike,
  deleteLike
) {
  const deleteCallback = (id, card) => {
    delSerCard(id)
      .then(() => delFunc(card))
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  };
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImageSrc = (cardItem.querySelector(".card__image").src =
    newCardValue.link);
  const cardImageAlt = (cardItem.querySelector(".card__image").alt =
    newCardValue.name);
  const cardTitle = (cardItem.querySelector(".card__title").textContent =
    newCardValue.name);
  const deleteButton = cardItem.querySelector(".card__delete-button");
  if (newCardValue.owner._id === user._id) {
    deleteButton.style.display = "block";
    deleteButton.addEventListener("click", () =>
      deleteCallback(newCardValue._id, cardItem)
    );
  }
  const likeCounter = cardItem.querySelector(".card__like-counter");
  likeCounter.textContent = newCardValue.likes.length;
  const likeButton = cardItem.querySelector(".card__like-button");
  likeButton.addEventListener("click", function (evt) {
    newCardValue,
      likeFunc(evt.target, newCardValue, likeCounter, putLike, deleteLike);
  });
  if (newCardValue.likes.some((like) => like._id === user._id)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  const cardImage = cardItem
    .querySelector(".card__image")
    .addEventListener("click", function () {
      openPopupFunc(cardImageSrc, cardImageAlt, cardTitle);
    });
  return cardItem;
}

export function deleteFunc(cardForRemove) {
  cardForRemove.remove();
}

export function likeFunc(like, cardValue, likeCounter, putLike, deleteLike) {
  const likeMethod = like.classList.contains("card__like-button_is-active")
    ? deleteLike
    : putLike;
  likeMethod(cardValue._id)
    .then((res) => {
      likeCounter.textContent = res.likes.length;
      like.classList.toggle("card__like-button_is-active");
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    });
}
