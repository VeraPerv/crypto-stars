// import{currentDatumOfSeller} from './modal.js'; ранее из модал js
import{currentDatumOfSeller} from './modal-sell.js';
import{currentUser} from './user-profile.js';
import{PASSWORD,ErrorText,errorMessage} from './constance.js';
import {sendData} from './api.js';
import { hideElement,showElement } from './utils.js';

const modalBuyForm = document.querySelector('.modal-buy');
const buyPaymentInput = modalBuyForm.querySelector('#buy-payment');
const buyReceivingInput = modalBuyForm.querySelector('#buy-receiving');
const buyPasswordInput = modalBuyForm.querySelector('#buy-password');
const modalBuyExchangeRate = modalBuyForm.querySelector('#transaction-buy-exchange');

const modalBuySelect = modalBuyForm.querySelector('#modal-buy-select');
const modalValidationMessageError = modalBuyForm.querySelector('.modal__validation-message--error');

const modalValidationMessageSuccess = modalBuyForm.querySelector('.modal__validation-message--success');

const userProfileContainer = document.querySelector('.user-profile');

/**Вся форма */
const pristine = new Pristine(modalBuyForm, {
  classTo: 'custom-input',
  errorClass: 'custom-input__error',
  errorTextParent: 'custom-input',
});

buyPasswordInput.addEventListener('input',() => {
  hideElement(modalValidationMessageError);
  hideElement(modalValidationMessageSuccess);
});


hideElement(modalValidationMessageError);
hideElement(modalValidationMessageSuccess);

const validateSelectPayment = () => {
  if(modalBuySelect.value === 'Выберите платёжную систему') {
    return false;
  }
  return true;
};

const getErrorSellSelectPaymentMessage = () => {
  if(modalBuySelect.value === 'Выберите платёжную систему') {
    return errorMessage.PAYCARD;
  }
};


/**функция валидации */
const validatePayment = () => {
  console.log(currentDatumOfSeller[0]);
  console.log(currentUser[0]);
  /*максимальная сумма = amount продавца в кексах* курс продавца*/
  const maxAmount = currentDatumOfSeller[0].balance.amount * currentDatumOfSeller[0].exchangeRate;
  /** Мин сумма = вэлью инпута >= currentSeller.minAmount currentSeller*/
  const isMin = buyPaymentInput.value >= currentDatumOfSeller[0].minAmount;
  /** Максимальная сумма = вэлью инпута <= maxAmount*/
  const isMax = buyPaymentInput.value <= maxAmount;

  return (isMin && isMax);
  //return true;
};

const getErrorPaymentMessage = () => {
  const maxAmount = currentDatumOfSeller[0].balance.amount * currentDatumOfSeller[0].exchangeRate;
  if (buyPaymentInput.value < currentDatumOfSeller[0].minAmount) {
    return `Минимальная сумма ${currentDatumOfSeller[0].minAmount} ₽`;
  }
  if (buyPaymentInput.value > currentDatumOfSeller[0].balance.amount * currentDatumOfSeller[0].exchangeRate) {
    return `Максимальная сумма ${(maxAmount).toFixed(2)} ₽`;
  }
};

const validateReceiving = () => {
  const isMin = buyReceivingInput .value >= 1;
  const isMax = buyReceivingInput .value <= currentDatumOfSeller[0].balance.amount;

  return (isMin && isMax);
};

const getErrorReceivingMessage = () => {
  console.log(currentUser[0].balances[1].amount)
  //pristine.reset();
  if ( buyReceivingInput.value < 1) {
    return errorMessage.KEKS;
  }
  if ( buyReceivingInput.value > currentUser[0].balances[1].amount) {

    return `Максимальная сумма ${currentDatumOfSeller[0].balance.amount} КЕКС`;
  }
};

/**Добавляем валидатор на конкретное поле */
pristine.addValidator(modalBuySelect,validateSelectPayment,getErrorSellSelectPaymentMessage);
pristine.addValidator(buyReceivingInput,validateReceiving,getErrorReceivingMessage);
pristine.addValidator(buyPaymentInput,validatePayment, getErrorPaymentMessage);

export const onBuyPaymentChange = () => {
  buyReceivingInput.value = buyPaymentInput.value / parseFloat(modalBuyExchangeRate.textContent);
  hideElement(modalValidationMessageSuccess);
  hideElement(modalValidationMessageError);
  pristine.validate();
};

export const onReceivingChange = () => {
  buyPaymentInput.value = buyReceivingInput.value * parseFloat(modalBuyExchangeRate.textContent);
  hideElement(modalValidationMessageSuccess);
  hideElement(modalValidationMessageError);
  pristine.validate();
};

const getErrorBuyPassword = () => {
  if (buyPasswordInput.value !== PASSWORD) {
    return errorMessage.PASSWORD;
  }
};

const validateBuyPassword = () => buyPasswordInput.value === PASSWORD;

pristine.addValidator(buyPasswordInput,validateBuyPassword,getErrorBuyPassword);

/**Слушаем всю форму */
modalBuyForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  hideElement(modalValidationMessageSuccess);
  hideElement(modalValidationMessageError);
  const isValid = pristine.validate();
  if (isValid) {
    hideElement(modalValidationMessageError);
    console.log('Можно отправлять');
    //blockSubmitBtn();
    const formData = new FormData(evt.target);
    sendData(formData)
      .then(() => {
        showElement(modalValidationMessageSuccess);
        pristine.reset();
        modalBuyForm.reset();
        console.log('бай форм в then отправка')
    })
    .catch(() => {
      throw new Error(ErrorText.SEND_DATA);
    })
    .finally(() => {
      //разблокируем кнопку
    })
  } else {
    showElement(modalValidationMessageError);
    hideElement(modalValidationMessageSuccess);
    console.log('Форма невалидна');
  }
});
