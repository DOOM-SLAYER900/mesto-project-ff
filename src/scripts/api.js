const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-35",
  headers: {
    authorization: "fd732c30-2a2d-43fe-b40a-380c50279641",
    "Content-Type": "application/json",
  },
};

export const profileData = (namePlace, avatarPlace, aboutPlace) => {
  fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((res) => res.json())
    .then((result) => {
      namePlace.textContent = result.name;
      aboutPlace.textContent = result.about;
      avatarPlace.style.backgroundImage = `url(${result.avatar})`;
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    });
};

export const serverProfileEditing = (NewProfileValue, button) => {
  fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,

    body: JSON.stringify({
      name: NewProfileValue.name,
      about: NewProfileValue.about,
    }),
  })
    .catch((error) => {
      console.error("Ошибка:", error);
    })
    .finally(() => {
      button.textContent = "Сохранить";
    });
};

export const serverAvatarUpdate = (NewAvatarLink, button) => {
  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,

    body: JSON.stringify({
      avatar: NewAvatarLink,
    }),
  })
    .catch((error) => {
      console.error("Ошибка:", error);
    })
    .finally(() => {
      button.textContent = "Сохранить";
    });
};

export const initialServerCards = fetch(`${config.baseUrl}/cards`, {
  headers: config.headers,
})
  .then((res1) => {
    if (res1.ok) {
      return res1.json();
    }
  })
  .catch((error) => {
    console.error("Ошибка:", error);
  });

export const serverProfileData = fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers,
})
  .then((res2) => {
    if (res2.ok) {
      return res2.json();
    }
  })
  .catch((error) => {
    console.error("Ошибка:", error);
  });

export const postNewCard = (newCardValue) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(newCardValue),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    });
};

export const deleteServerCard = (cardId) => {
  fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).catch((error) => {
    console.error("Ошибка:", error);
  });
};

export const putLike = (cardId) => {
  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    });
};

export const deleteLike = (cardId) => {
  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    });
};
