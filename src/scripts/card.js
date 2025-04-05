export const cardTemplate = document.querySelector("#card-template").content;

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
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImageSrc = (cardItem.querySelector(".card__image").src =
    newCardValue.link);
  const cardImageAlt = (cardItem.querySelector(".card__image").alt =
    newCardValue.name);
  const cardTitle = (cardItem.querySelector(".card__title").textContent =
    newCardValue.name);
  const deleteButton = cardItem.querySelector(".card__delete-button");
  if (newCardValue.owner !== undefined) {
    if (newCardValue.owner._id === user._id) {
      deleteButton.style.display = "block";
      deleteButton.addEventListener("click", () => delFunc(cardItem));
      deleteButton.addEventListener("click", () =>
        delSerCard(newCardValue._id)
      );
    }
  } else {
    deleteButton.style.display = "block";
    deleteButton.addEventListener("click", () => delFunc(cardItem));
    deleteButton.addEventListener("click", () => delSerCard(newCardValue._id));
  }
  const likeCounter = cardItem.querySelector(".card__like-counter");
  likeCounter.textContent = newCardValue.likes.length;
  const likeButton = cardItem.querySelector(".card__like-button");
  likeButton.addEventListener("click", function (evt) {
    likeFunc(evt.target, newCardValue, likeCounter, putLike, deleteLike, user);
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

export function likeFunc(
  like,
  cardValue,
  likeCounter,
  putLike,
  deleteLike,
  user
) {
  like.classList.toggle("card__like-button_is-active");
  let count = cardValue.likes.length;
  if (like.classList.contains("card__like-button_is-active")) {
    putLike(cardValue._id);
    count++;
    likeCounter.textContent = count;
  } else {
    deleteLike(cardValue._id);
    likeCounter.textContent = count;
  }
  if (cardValue.likes.some((like) => like._id === user._id)) {
    count--;
    likeCounter.textContent = count;
  }
}
