export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    form.addEventListener("submit", function (evt) {
      evt.preventDefault();
      setEventListeners(form, config);
    });
    setEventListeners(form, config);
  });
}

const showInputError = (form, input, errorMessage, config) => {
  input.classList.add(config.inputErrorClass);
  const error = form.querySelector(`.${input.id}-error`);
  error.textContent = errorMessage;
  error.classList.add(config.errorClass);
};

export const hideInputError = (form, input, config) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  error.classList.remove(config.errorClass);
  error.textContent = "";
};

const checkInputValidity = (form, input, config) => {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, config);
  } else {
    hideInputError(form, input, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((form) => {
    return !form.validity.valid;
  });
};

const setEventListeners = (form, config) => {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, button, config);
  inputList.forEach((input) => {
    input.addEventListener("input", function () {
      checkInputValidity(form, input, config);
      toggleButtonState(inputList, button, config);
    });
  });
};

const toggleButtonState = (inputList, button, config) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(config.inactiveButtonClass);
    button.setAttribute("disabled", "true");
  } else {
    button.classList.remove(config.inactiveButtonClass);
    button.removeAttribute("disabled", "true");
  }
};

export function clearValidation(config, form) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  inputList.forEach((input) => {
    hideInputError(form, input, config);
  });
  toggleButtonState(inputList, button, config);
  form.reset();
}
