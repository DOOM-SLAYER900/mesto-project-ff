export function closeOnEscape(evt) {
  if (evt.key === "Escape") {
    const openedpopup = document.querySelector(".popup_is-opened");
    openedpopup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closeOnEscape);
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeOnEscape);
}

export function closePopup(evt) {
  evt.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeOnEscape);
}
