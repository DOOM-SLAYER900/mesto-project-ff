const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-35",
  headers: {
    authorization: "fd732c30-2a2d-43fe-b40a-380c50279641",
    "Content-Type": "application/json",
  },
};
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
  }
};

export const getProfileData = fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers,
}).then(checkResponse);

export const serverProfileEditing = (newProfileValue) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,

    body: JSON.stringify({
      name: newProfileValue.name,
      about: newProfileValue.about,
    }),
  }).then(checkResponse);
};

export const serverAvatarUpdate = (newAvatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,

    body: JSON.stringify({
      avatar: newAvatarLink,
    }),
  }).then(checkResponse);
};

export const getInitialCards = fetch(`${config.baseUrl}/cards`, {
  headers: config.headers,
}).then(checkResponse);

export const postNewCard = (newCardValue) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(newCardValue),
  }).then(checkResponse);
};

export const deleteServerCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};

export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
};

export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};
