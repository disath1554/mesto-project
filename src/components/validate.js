/*Valid*/
       
const showInputError = (settingsValid, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(settingsValid.inputErrorClass);
      errorElement.textContent = errorMessage;
        errorElement.classList.add(settingsValid.errorClass);
};

const hideInputError =  (settingsValid, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(settingsValid.inputErrorClass);
      errorElement.classList.remove(settingsValid.errorClass);
        errorElement.textContent = '';
};
    
const checkInputValidity = (settingsValid, formElement, inputElement) => {
  if (inputElement.validity.valueMissing) {
      inputElement.setCustomValidity(inputElement.dataset.errorEmpty);
    } else if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
  }
    
  if (!inputElement.validity.valid) {
        showInputError(settingsValid, formElement, inputElement, inputElement.validationMessage);
      } else {
        hideInputError(settingsValid, formElement, inputElement);
  }
};
    
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
    })
}; 
    
const toggleButtonState = (settingsValid, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
      buttonElement.classList.add(settingsValid.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
        buttonElement.classList.remove(settingsValid.inactiveButtonClass);
    }
}; 
    
const setEventListeners = (settingsValid, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(settingsValid.inputSelector));
    const buttonElement = formElement.querySelector(settingsValid.submitButtonSelector);
      toggleButtonState(settingsValid, inputList, buttonElement);
        
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(settingsValid, formElement, inputElement);
        toggleButtonState(settingsValid, inputList, buttonElement);
    });
  });
};

const enableValidation = (settingsValid) => {    
  const formList = Array.from(document.querySelectorAll(settingsValid.formSelector)); 
     formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(settingsValid, formElement);
  }); 
};

export {enableValidation, hideInputError, checkInputValidity, toggleButtonState};