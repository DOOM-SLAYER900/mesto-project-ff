// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

function addCard(card) {
  card.forEach(function (cardElement) {
    const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
    const deleteButton = cardItem.querySelector(".card__delete-button");

    cardItem.querySelector(".card__image").src = cardElement.link;
    cardItem.querySelector(".card__image").alt = cardElement.name;
    cardItem.querySelector(".card__title").textContent = cardElement.name;

    cardList.append(cardItem);
    deleteCard(cardItem);
  });
};

function deleteCard(cardItem) {
  const deleteButton = cardItem.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    cardItem.remove();
  });
};

addCard(initialCards);
