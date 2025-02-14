// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

function createCard(cardElement) {
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImageSrc = (cardItem.querySelector(".card__image").src =
    cardElement.link);
  const cardImageAlt = (cardItem.querySelector(".card__image").alt =
    cardElement.name);
  const cardTitle = (cardItem.querySelector(".card__title").textContent =
    cardElement.name);
  const deleteButton = cardItem.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);
  return cardItem;
}

function deleteCard() {
  const deleteButton = cardList.querySelector(".card__delete-button");
  const cardForRemove = deleteButton.closest(".card");
  cardForRemove.remove();
}

initialCards.forEach(function addCard(cardValue) {
  cardList.append(createCard(cardValue));
});
