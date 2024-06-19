import{currentDatumOfSeller} from './modal.js';
import{currentUser} from './user-profile.js';
import{PASSWORD} from './constance.js';

const modalBuyForm = document.querySelector('.modal-buy');
const buyPaymentInput = modalBuyForm.querySelector('#buy-payment');
const buyReceivingInput = modalBuyForm.querySelector('#buy-receiving');
const buyPasswordInput = modalBuyForm.querySelector('#buy-password');
const modalBuyExchangeRate = modalBuyForm.querySelector('#transaction-buy-exchange');
console.log(buyPasswordInput)

//let message = '';
//const getErrorMessage = () => message;

const errorMessage = {
  KEKS: 'Не менее одного кекса',
  PASSWORD: 'Неверный пароль',
};

const Messages = {
  ERROR_KEKS: 'Хотя бы один КЕКС',
  ERROR_PASSWORD: 'Неверный пароль',
};


/**Вся форма */
const pristine = new Pristine(modalBuyForm, {
  classTo: 'custom-input',
  errorClass: 'custom-input__error',
  errorTextParent: 'custom-input',
});

/**функция валидации */
const validatePayment = () => {
  console.log(currentDatumOfSeller[0]);
  console.log(currentUser[0]);
  /*максимальная сумма = amount продавца в кексах* курс продавца*/
  const maxAmount = currentDatumOfSeller[0].balance.amount * currentDatumOfSeller[0].exchangeRate;
  /** Мин сумма = вэлью инпута >= currentSeller.minAmount currentSeller*/
  const isValidMin = buyPaymentInput.value >= currentDatumOfSeller[0].minAmount;
  /** Максимальная сумма = вэлью инпута <= maxAmount*/
  const isValidMax = buyPaymentInput.value <= maxAmount;

  return (isValidMin && isValidMax);
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
  const isValidMin = buyReceivingInput .value >= 1;
  const isValidMax = buyReceivingInput .value <= currentDatumOfSeller[0].balance.amount;

  return (isValidMin && isValidMax);
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
pristine.addValidator(buyReceivingInput,validateReceiving,getErrorReceivingMessage);
pristine.addValidator(buyPaymentInput,validatePayment, getErrorPaymentMessage);

export const onBuyPaymentChange = () => {
  buyReceivingInput.value = buyPaymentInput.value / parseFloat(modalBuyExchangeRate.textContent);
  pristine.validate(buyReceivingInput);
  pristine.validate(buyReceivingInput);
};

export const onReceivingChange = () => {
  buyPaymentInput.value = buyReceivingInput.value * parseFloat(modalBuyExchangeRate.textContent);
  pristine.validate(buyReceivingInput);
  pristine.validate(buyReceivingInput);
};

const getErrorBuyPassword = () => {
  if (buyPasswordInput.value !== PASSWORD) {
    return errorMessage.PASSWORD;
  }
}

const validateBuyPassword = () => buyPasswordInput.value === PASSWORD;

pristine.addValidator(buyPasswordInput,validateBuyPassword,getErrorBuyPassword);

/**Слушаем всю форму */
modalBuyForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  //validatePayment();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});



 // if(!isValidMin) {
  //   message = `Сумма не должна быть меньше ${currentDatumOfSeller[0].minAmount}`;
  //   return false;
  // }
  // if(isValidMax) {
  //   message = `Сумма должна быть не больше ${ maxAmount}`;
  //   return false;
  // }

  // const pristineBuyForm = {
  //   pristine: [],
  // };
