import{currentDatumOfSeller} from './modal-sell.js';
import{currentUser} from './user-profile.js';
import{PASSWORD,ErrorText,errorMessage} from './constance.js';
import {sendData} from './api.js';
import { hideElement,showElement,hideSuccessErrorMessages } from './utils.js';

const modalBuyForm = document.querySelector('.modal-buy');
const buyPaymentInput = modalBuyForm.querySelector('#buy-payment');
const buyReceivingInput = modalBuyForm.querySelector('#buy-receiving');
const buyPasswordInput = modalBuyForm.querySelector('#buy-password');
const modalBuyExchangeRate = modalBuyForm.querySelector('#transaction-buy-exchange');

const modalBuySelect = modalBuyForm.querySelector('#modal-buy-select');
const modalValidationMessageError = modalBuyForm.querySelector('.modal__validation-message--error');

const modalValidationMessageSuccess = modalBuyForm.querySelector('.modal__validation-message--success');

const seller = {
  currentSeller:[]
};

const pristine = new Pristine(modalBuyForm, {
  classTo: 'custom-input',
  errorClass: 'custom-input__error',
  errorTextParent: 'custom-input',
});

buyPasswordInput.addEventListener('input',() => {
  hideSuccessErrorMessages();
});

hideSuccessErrorMessages();

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

const validatePayment = () => {
  seller.currentSeller = currentDatumOfSeller[0];
  const {balance,exchangeRate,minAmount} = seller.currentSeller;
  const maxAmount = balance.amount * exchangeRate;
  const isMin = buyPaymentInput.value >= minAmount;
  const isMax = buyPaymentInput.value <= maxAmount;
  return (isMin && isMax);
};

const getErrorPaymentMessage = () => {
  const {balance,exchangeRate,minAmount} = seller.currentSeller;
  const maxAmount = balance.amount * exchangeRate;
  if (buyPaymentInput.value < minAmount) {
    return `Минимальная сумма ${minAmount} ₽`;
  }
  if (buyPaymentInput.value > balance.amount * exchangeRate) {
    return `Максимальная сумма ${(maxAmount).toFixed(2)} ₽`;
  }
};

const validateReceiving = () => {
  const {balance} = seller.currentSeller;
  const isMin = buyReceivingInput .value >= 1;
  const isMax = buyReceivingInput .value <= balance.amount;

  return (isMin && isMax);
};

const getErrorReceivingMessage = () => {
  const {balance:sellerBalance} = seller.currentSeller;
  const currentUserDatum = currentUser[0];
  const {balances} = currentUserDatum;
  const keksBalance = balances.find((balance) => balance.currency === 'KEKS');
  if ( buyReceivingInput.value < 1) {
    return errorMessage.KEKS;
  }
  if ( buyReceivingInput.value > keksBalance.amount) {
    return `Максимальная сумма ${sellerBalance.amount} КЕКС`;
  }
};

pristine.addValidator(modalBuySelect,validateSelectPayment,getErrorSellSelectPaymentMessage);
pristine.addValidator(buyReceivingInput,validateReceiving,getErrorReceivingMessage);
pristine.addValidator(buyPaymentInput,validatePayment, getErrorPaymentMessage);

const onBuyPaymentChange = () => {
  buyReceivingInput.value = buyPaymentInput.value / parseFloat(modalBuyExchangeRate.textContent);
  hideSuccessErrorMessages();
  pristine.validate();
};

const onReceivingChange = () => {
  buyPaymentInput.value = buyReceivingInput.value * parseFloat(modalBuyExchangeRate.textContent);
  hideSuccessErrorMessages();
  pristine.validate();
};

const getErrorBuyPassword = () => {
  if (buyPasswordInput.value !== PASSWORD) {
    return errorMessage.PASSWORD;
  }
};

const validateBuyPassword = () => buyPasswordInput.value === PASSWORD;

pristine.addValidator(buyPasswordInput,validateBuyPassword,getErrorBuyPassword);

modalBuyForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  hideSuccessErrorMessages();
  const isValid = pristine.validate();
  if (isValid) {
    hideElement(modalValidationMessageError);
    const formData = new FormData(evt.target);
    sendData(formData)
      .then(() => {
        showElement(modalValidationMessageSuccess);
        pristine.reset();
        modalBuyForm.reset();
      })
      .catch(() => {
        throw new Error(ErrorText.SEND_DATA);
      })
      .finally(() => {
      //разблокируем кнопку
      });
  } else {
    showElement(modalValidationMessageError);
    hideElement(modalValidationMessageSuccess);
  }
});

export {pristine,modalValidationMessageSuccess,onReceivingChange,onBuyPaymentChange,modalValidationMessageError};
