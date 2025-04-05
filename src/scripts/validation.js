export function enableValidation({
  formSelector: formSel,
  inputSelector: input,
  submitButtonSelector: button,
  inactiveButtonClass: buttonDisabled,
  inputErrorClass: popupInputTypeError,
  errorClass: popupErrorVisible,
}) {
  const formList = Array.from(document.querySelectorAll(formSel));
  formList.forEach((form) => {
    form.addEventListener("submit", function (evt) {
      evt.preventDefault();
      setEventListeners(
        form,
        input,
        button,
        buttonDisabled,
        popupErrorVisible,
        popupInputTypeError
      );
    });
    setEventListeners(
      form,
      input,
      button,
      buttonDisabled,
      popupErrorVisible,
      popupInputTypeError
    );
  });
}

const showInputError = (
  form,
  inputElement,
  errorMessage,
  popupErrorVisible,
  popupInputTypeError
) => {
  inputElement.classList.add(popupInputTypeError);
  const error = form.querySelector(`.${inputElement.id}-error`);
  error.textContent = errorMessage;
  error.classList.add(popupErrorVisible);
};

export const hideInputError = (
  form,
  inputElement,
  popupErrorVisible,
  popupInputTypeError
) => {
  const error = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(popupInputTypeError);
  error.classList.remove(popupErrorVisible);
  error.textContent = "";
};

const checkInputValidity = (
  form,
  inputElement,
  popupErrorVisible,
  popupInputTypeError
) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      form,
      inputElement,
      inputElement.validationMessage,
      popupErrorVisible,
      popupInputTypeError
    );
  } else {
    hideInputError(form, inputElement, popupErrorVisible, popupInputTypeError);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((form) => {
    return !form.validity.valid;
  });
};

const setEventListeners = (
  form,
  input,
  button,
  buttonDisabled,
  popupErrorVisible,
  popupInputTypeError
) => {
  const inputList = Array.from(form.querySelectorAll(input));
  const buttonElement = form.querySelector(button);
  toggleButtonState(inputList, buttonElement, buttonDisabled);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(
        form,
        inputElement,
        popupErrorVisible,
        popupInputTypeError
      );
      toggleButtonState(inputList, buttonElement, buttonDisabled);
    });
  });
};

const toggleButtonState = (inputList, buttonElement, buttonDisabledClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(buttonDisabledClass);
    buttonElement.setAttribute("disabled", "true");
  } else {
    buttonElement.classList.remove(buttonDisabledClass);
    buttonElement.removeAttribute("disabled", "true");
  }
};

export function clearValidation(popup) {
  if (popup.querySelector(".popup__form")) {
    const popupForm = popup.querySelector(".popup__form");
    const inputSelector = popupForm.querySelectorAll(".popup__input");
    const popupInputError = popupForm.querySelectorAll(".popup__input-error");
    inputSelector.forEach((input) => {
      input.classList.remove("popup__input_type_error");
    });
    popupInputError.forEach((ErrorElement) => {
      ErrorElement.classList.remove("popup__error_visible");
      ErrorElement.textContent = "";
    });
    popupForm.reset();
  }
}
