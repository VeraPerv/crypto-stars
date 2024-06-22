// import{currentDatumOfBuyer} from './modal.js'; ранее из модал js
import{currentDatumOfBuyer} from './modal-buy.js';
import{currentUser,userProfileContainer} from './user-profile.js';
import{PASSWORD,ErrorText,errorMessage} from './constance.js';
import{sendData} from './api.js';
import { hideElement,showElement } from './utils.js';

const modalSellForm = document.querySelector('.modal-sell');
const sellPaymentInput = modalSellForm.querySelector('#sell-payment');
const sellReceivingInput = modalSellForm.querySelector('#sell-receiving');
const modalSellExchangeRate = modalSellForm.querySelector('#transaction-sell-exchange');

const sellPassword = modalSellForm.querySelector('#sell-password');

export const modalValidationMessageSuccess = modalSellForm.querySelector('.modal__validation-message--success');
const modalValidationMessageError = modalSellForm.querySelector('.modal__validation-message--error');

const modalSellSelect = modalSellForm.querySelector('#modal-sell-select');

const buyer = {
  currentBuyer: []
};

const pristine = new Pristine(modalSellForm, {
  classTo: 'custom-input',
  errorClass: 'custom-input__error',
  errorTextParent: 'custom-input',
});

sellPassword.addEventListener('input',() => {
  hideElement(modalValidationMessageError);
  hideElement(modalValidationMessageSuccess);
});


hideElement(modalValidationMessageError);
hideElement(modalValidationMessageSuccess);
//showElement(modalValidationMessageError);


const validateSelectPayment = () => {
  if(modalSellSelect.value === 'Выберите платёжную систему') {
    return false;
  }
  return true;
};

const getErrorSellSelectPaymentMessage = () => {
  if(modalSellSelect.value === 'Выберите платёжную систему') {
    return errorMessage.PAYCARD;
  }
};

const validateSellReceiving = () => {
  buyer.currentBuyer = currentDatumOfBuyer[0];
  const {balance, minAmount} = buyer.currentBuyer;
  console.log(buyer.currentBuyer)
  // const isMin = sellReceivingInput.value >= currentDatumOfBuyer[0].minAmount;
  // const isMax = sellReceivingInput.value <= currentDatumOfBuyer[0].balance.amount;
  const isMin = sellReceivingInput.value >= minAmount;
  const isMax = sellReceivingInput.value <= balance.amount;
  return (isMin && isMax);
};

const getErrorSellReceivingMessage = () => {
  const {minAmount,balance} = buyer.currentBuyer;
  // if (sellReceivingInput.value < currentDatumOfBuyer[0].minAmount) {
  //   return `Минимальная сумма ${currentDatumOfBuyer[0].minAmount} ₽`;
  // }
  // if (sellReceivingInput.value > currentDatumOfBuyer[0].balance.amount) {
  //   return `Максимальная сумма ${(currentDatumOfBuyer[0].balance.amount)} ₽`;
  // }
  if (sellReceivingInput.value < minAmount) {
    return `Минимальная сумма ${minAmount} ₽`;
  }
  if (sellReceivingInput.value > balance.amount) {
    return `Максимальная сумма ${(balance.amount)} ₽`;
  }
};

const validateSellPayment = () => {
const currentUserDatum = currentUser[0];
const {balances} = currentUserDatum;


const keksBalance = balances.find((balance) => balance.currency === 'KEKS');
  const isMin = sellPaymentInput.value >= 1;
  // const isMax = sellPaymentInput.value <= currentUser[0].balances[1].amount;
  const isMax = sellPaymentInput.value <= keksBalance.amount;
  return (isMin && isMax);
};

const getErrorSellPaymentMessage = () => {
  const currentUserDatum = currentUser[0];
  const {balances} = currentUserDatum;
  const keksBalance = balances.find((balance) => balance.currency === 'KEKS');

  if (sellPaymentInput.value < 1) {
    return errorMessage.KEKS;
  }
  // if (sellPaymentInput.value > currentUser[0].balances[1].amount) {
  //   return `Максимальная сумма ${currentUser[0].balances[1].amount} КЕКС`;
  // }
  if (sellPaymentInput.value > keksBalance.amount) {
    return `Максимальная сумма ${keksBalance.amount} КЕКС`;
  }
};
export const onSellPaymentChange = () => {
  sellReceivingInput.value = sellPaymentInput.value * parseFloat(modalSellExchangeRate.textContent);

  hideElement(modalValidationMessageError);
  hideElement(modalValidationMessageSuccess);
  pristine.validate();
};

export const onSellReceivingChange = () => {
  sellPaymentInput.value = sellReceivingInput.value / parseFloat(modalSellExchangeRate.textContent);

  hideElement(modalValidationMessageError);
  hideElement(modalValidationMessageSuccess);
  pristine.validate();
};

const validateSellPassword = () => sellPassword.value === PASSWORD;
const getErrorSellPassword = () => {
  if (sellPassword.value !== PASSWORD) {
    return errorMessage.PASSWORD;
  }
};

pristine.addValidator(sellReceivingInput,validateSellReceiving,getErrorSellReceivingMessage);
pristine.addValidator(sellPaymentInput,validateSellPayment,getErrorSellPaymentMessage);
pristine.addValidator(sellPassword,validateSellPassword,getErrorSellPassword);
pristine.addValidator(modalSellSelect,validateSelectPayment,getErrorSellSelectPaymentMessage);


modalSellForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  hideElement(modalValidationMessageSuccess);
  hideElement(modalValidationMessageError);
  const isValid = pristine.validate();

  if (isValid ) {
    hideElement(modalValidationMessageError);
    console.log('Можно отправлять');
    //blockSubmitBtn();
    const formData = new FormData(evt.target);
    sendData(formData)
      .then(() => {
        showElement(modalValidationMessageSuccess);
        pristine.reset();
        modalSellForm.reset();
        console.log('бай форм в then отправка')
    })
    .catch(() => {
      //showErrorMessageForSending();
      hideElement(userProfileContainer);
      throw new Error(ErrorText.SEND_DATA);
    })
    .finally(() => {
      //разблокируем кнопку
    })
  } else {
    showElement(modalValidationMessageError);
    hideElement(modalValidationMessageSuccess);
    console.log('Можно отправлять');
  }
});
export {pristine}

