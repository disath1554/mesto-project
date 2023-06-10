/*Valid*/
/*Valid*/
export const enableValidation = (settingsValid) => {
        
    const showInputError = (formElement, inputElement, errorMessage) => {
        const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
        inputElement.classList.add(settingsValid.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(settingsValid.errorClass);
    };
      
    const hideInputError =  (formElement, inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
        inputElement.classList.remove(settingsValid.inputErrorClass);
        errorElement.classList.remove(settingsValid.errorClass);
        errorElement.textContent = '';
    };
    
    const checkInputValidity = (formElement, inputElement) => {
        if (inputElement.validity.valueMissing) {
            inputElement.setCustomValidity(inputElement.dataset.errorEmpty);
      } else if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
      } else {
        inputElement.setCustomValidity("");
      }
    
        if (!inputElement.validity.valid) {
          showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
          hideInputError(formElement, inputElement);
        }
    };
    
    const hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        })
      }; 
    
    const toggleButtonState = (inputList, buttonElement) => {
        if (hasInvalidInput(inputList)) {
            buttonElement.disabled = true;
            buttonElement.classList.add(settingsValid.inactiveButtonClass);
        } else {
            buttonElement.disabled = false;
            buttonElement.classList.remove(settingsValid.inactiveButtonClass);
        }
    }; 
    
    const setEventListeners = (formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(settingsValid.inputSelector));
        const buttonElement = formElement.querySelector(settingsValid.submitButtonSelector);
        toggleButtonState(inputList, buttonElement);
        
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
            });
        });
    };
    const formList = Array.from(document.querySelectorAll(settingsValid.formSelector)); 
     formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement);
  }); 
    
};