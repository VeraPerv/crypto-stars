import {arrOfSellers} from './filter-contractors.js';
import {getCurrentDatum,Currency,hideElement,showElement,isEscapeKey,hideSuccessErrorMessages } from './utils.js';
import{currentUser} from './user-profile.js';
import{onBuyPaymentChange,onReceivingChange,pristine} from './modal-buy-validation.js';

const modalBuyForm = document.querySelector('.modal-buy');
const body = document.querySelector('body');
const modalBuy = document.querySelector('.modal--buy');
const modalBuySelect = modalBuy.querySelector('#modal-buy-select');
const modalBuyCryptoWallet = modalBuy.querySelector('#modal-buy-crypto-wallet');
const modalBuyIcon = modalBuy.querySelector('#transaction-buy-icon');
const modalBuyName = modalBuy.querySelector('#modal-buy-name');
const modalBuyExchangeRate = modalBuy.querySelector('#transaction-buy-exchange');
const modalBuyLimit = modalBuy.querySelector('#transaction-buy-limit');
const buyIdHiddenInput = modalBuy.querySelector('#contractor-id');
const buyExchangeRateHiddenInput = modalBuy.querySelector('#exchange-rate');
const buySendingCurrencyHiddenInput = modalBuy.querySelector('#sending-currency');
const buyReceivingCurrencyHiddenInput = modalBuy.querySelector('#receiving-currency');

const buyPaymentInput = modalBuy.querySelector('#buy-payment');
const buyReceivingInput = modalBuy.querySelector('#buy-receiving');

// const modalValidationMessageSuccess = modalBuy.querySelector('.modal__validation-message--success');
// const modalValidationMessageError = modalBuy.querySelector('.modal__validation-message--error');


const modalBuyCloseBtn = modalBuy.querySelector('.modal__close-btn');
const modalBuyOverlay = modalBuy.querySelector('.modal__overlay');

const modalBuyBankCard = modalBuy.querySelector('#modal-buy-bank-card');
const currentDatumOfSeller = [];
const currentPayMethods = [];
/**в массив опций селекта помещаю все опции из разметки */
//const selectOptionsArr = [...modalBuySelect.options];


const onDocumentKeydownForBuy = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideElement(modalBuy);
  }
};

const resetBuyFormValidation = () => {
  hideSuccessErrorMessages();
  // hideElement(modalValidationMessageError);
  // hideElement(modalValidationMessageSuccess);
  pristine.reset();
  modalBuyForm.reset();
};

const closeBuyModal = () => {
  body.classList.remove('scroll-lock');
  hideElement(modalBuy);
  document.removeEventListener('keydown',onDocumentKeydownForBuy);
  modalBuyCloseBtn.removeEventListener('click',closeBuyModal);
  modalBuyOverlay.removeEventListener('click',closeBuyModal);

  resetBuyFormValidation();
  // hideElement(modalValidationMessageError);
  // hideElement(modalValidationMessageSuccess);
  // pristine.reset();
  // modalBuyForm.reset();
   //очищ удал
};

const openBuyModal = () => {
  body.classList.add('scroll-lock');
  showElement(modalBuy);
  document.addEventListener('keydown',onDocumentKeydownForBuy);
  modalBuyOverlay.addEventListener('click',closeBuyModal);
  modalBuyCloseBtn.addEventListener('click',closeBuyModal);
};

const fillSelectBuyOptions = (arrOfMethods) => {
//debugger; ЗДЕСЬ
  currentPayMethods.length = 0;
  currentPayMethods.push(...arrOfMethods);

const firstElement = modalBuySelect.children[0];//пл система
  modalBuySelect.textContent = '';
  modalBuySelect.appendChild(firstElement);

  for (const method of arrOfMethods) {
    const methodName = method.provider;
    //const methodOption = document.createElement('option');
    const selectOption = document.createElement('option');
    selectOption.textContent = methodName;
    selectOption.value = methodName;
    modalBuySelect.appendChild(selectOption);
  }
};

const onModalBuySelectChange = (evt) => {
  hideSuccessErrorMessages();
  // hideElement(modalValidationMessageSuccess);
  // hideElement(modalValidationMessageError);
  if(evt.target.value !== 'Cash in person') {
    console.log(currentPayMethods)
    const isNecessaryObj = currentPayMethods.find((payObj) => payObj.provider === evt.target.value);
    modalBuyBankCard.value = isNecessaryObj.accountNumber;
  } else {
    modalBuyBankCard.value = '';
  }
};
// const fillcryptoWallet = (datum,inputRow) => {
//   inputRow.value = datum.wallet.address;
// };
const fillSellModal = (evt) => {
  const currentRow = evt.target.closest('.users-list__table-row');
  const currentDatum = arrOfSellers.find(({id}) => id === currentRow.dataset.rowId);
  const user = currentUser[0];
  const {wallet} = user;
  getCurrentDatum(currentDatum,currentDatumOfSeller);
  //console.log(currentDatum)
  const {paymentMethods,exchangeRate,id:currentId,userName,minAmount,balance,isVerified} = currentDatum;
  fillSelectBuyOptions(paymentMethods)
  //modalBuyCryptoWallet.value = currentUser[0].wallet.address;
  modalBuyCryptoWallet.value = wallet.address;
  //fillcryptoWallet(currentUser[0],modalBuyCryptoWallet);

  hideElement(modalBuyIcon);

  modalBuyName.textContent = userName;
  modalBuyExchangeRate.textContent = `${exchangeRate} ₽`;
  modalBuyLimit.textContent = `${minAmount} ₽ - ${Math.round(exchangeRate * balance.amount)} ₽`;
  if(isVerified) {
    showElement(modalBuyIcon);
  }
  buyIdHiddenInput.value = currentId;
  buyExchangeRateHiddenInput.value = exchangeRate;
  buySendingCurrencyHiddenInput.value = Currency.RUBLE;
  buyReceivingCurrencyHiddenInput.value = Currency.KEKS;
};


buyPaymentInput.addEventListener('input', onBuyPaymentChange);
buyReceivingInput.addEventListener('input',onReceivingChange);

modalBuySelect.addEventListener('change',onModalBuySelectChange);


export {currentDatumOfSeller,openBuyModal,fillSellModal}
/**в модал бай валид


// import {arrOfSellers} from './filter-contractors.js';
// import {getCurrentDatum,Currency,hideElement,showElement,isEscapeKey } from './utils.js';
// import{currentUser} from './user-profile.js';
// import{onBuyPaymentChange,onReceivingChange,pristine} from './modal-buy-validation.js';

// const body = document.querySelector('body');
// const modalBuy = document.querySelector('.modal--buy');
// const modalBuySelect = modalBuy.querySelector('#modal-buy-select');
// const modalBuyCryptoWallet = modalBuy.querySelector('#modal-buy-crypto-wallet');
// const modalBuyIcon = modalBuy.querySelector('#transaction-buy-icon');
// const modalBuyName = modalBuy.querySelector('#modal-buy-name');
// const modalBuyExchangeRate = modalBuy.querySelector('#transaction-buy-exchange');
// const modalBuyLimit = modalBuy.querySelector('#transaction-buy-limit');
// const buyIdHiddenInput = modalBuy.querySelector('#contractor-id');
// const buyExchangeRateHiddenInput = modalBuy.querySelector('#exchange-rate');
// const buySendingCurrencyHiddenInput = modalBuy.querySelector('#sending-currency');
// const buyReceivingCurrencyHiddenInput = modalBuy.querySelector('#receiving-currency');

// const modalBuyCloseBtn = modalBuy.querySelector('.modal__close-btn');
// const modalBuyOverlay = modalBuy.querySelector('.modal__overlay');

// const buyPaymentInput = modalBuy.querySelector('#buy-payment');
// const buyReceivingInput = modalBuy.querySelector('#buy-receiving');

// const modalValidationMessageSuccess = modalBuy.querySelector('.modal__validation-message--success');
// const modalValidationMessageError = modalBuy.querySelector('.modal__validation-message--error');

// const modalBuyBankCard = modalBuy.querySelector('#modal-buy-bank-card');

// const currentDatumOfSeller = [];
// const currentPayMethods = [];
// const selectOptionsArr = [...modalBuySelect.options];

// const modalBuyForm = document.querySelector('.modal-buy');

// const onDocumentKeydownForBuy = (evt) => {
//   if (isEscapeKey(evt)) {
//     evt.preventDefault();
//     hideElement(modalBuy);
//     hideElement(modalValidationMessageError);
//     hideElement(modalValidationMessageSuccess);
//     modalBuyForm.reset();
//     pristine.reset();
//   }
// };


// const closeBuyModal = () => {
//   hideElement(modalBuy);
//   body.classList.remove('scroll-lock');
//   document.removeEventListener('keydown',onDocumentKeydownForBuy);
//   modalBuyCloseBtn.removeEventListener('click',closeBuyModal);
//   modalBuyOverlay.removeEventListener('click',closeBuyModal);
//   modalBuyForm.reset();
//   pristine.reset();
//   hideElement(modalValidationMessageError);
//   hideElement(modalValidationMessageSuccess);
//    //очищ удал
// };

// const openBuyModal = () => {
//   showElement(modalBuy);
//   body.classList.add('scroll-lock');
//   document.addEventListener('keydown',onDocumentKeydownForBuy);
//   modalBuyOverlay.addEventListener('click',closeBuyModal);
//   modalBuyCloseBtn.addEventListener('click',closeBuyModal);
// };


// const onModalBuySelectChange = (evt) => {

//   hideElement(modalValidationMessageSuccess);
//   hideElement(modalValidationMessageError);
//   if(evt.target.value !== 'Cash in person') {
//     const isNecessaryObj = currentPayMethods.find((payObj) => payObj.provider === evt.target.value);
//     modalBuyBankCard.value = isNecessaryObj.accountNumber;
//   } else {
//     modalBuyBankCard.value = '';
//   }
// };

// export const fillSelectOptions = (arrOfOptions,arrOfMethods) => {
//   //currentPayMethods.length = 0;
//   currentPayMethods.push(...arrOfMethods);
//   console.log(arrOfMethods)
//   arrOfOptions.forEach((option) => {
//     const isNecessary = arrOfMethods.some((element) => option.value === element.provider);
//     if(!isNecessary && option.value !== 'Выберите платёжную систему') {
//       option.remove();
//     }
//   });
// };
// const fillcryptoWallet = (datum,inputRow) => {
//   inputRow.value = datum.wallet.address;
// };
// const fillSellModal = (evt) => {
//   const currentRow = evt.target.closest('.users-list__table-row');
//   const currentDatum = arrOfSellers.find(({id}) => id === currentRow.dataset.rowId);
//   getCurrentDatum(currentDatum,currentDatumOfSeller);
//   //console.log(currentDatum)
//   const {paymentMethods,exchangeRate,id:currentId,userName,minAmount,balance,isVerified} = currentDatum;

//     //console.log(currentDatum)
//   // console.log(paymentMethods)
//   // console.log(currentRow)
//   //fillModalBuyBankCard(paymentMethods)

//   fillSelectOptions(selectOptionsArr,paymentMethods);

//   modalBuyCryptoWallet.value = currentUser[0].wallet.address;

//   fillcryptoWallet(currentUser[0],modalBuyCryptoWallet)

//   hideElement(modalBuyIcon);

//   modalBuyName.textContent = userName;
//   modalBuyExchangeRate.textContent = `${exchangeRate} ₽`;
//   modalBuyLimit.textContent = `${minAmount} ₽ - ${Math.round(exchangeRate * balance.amount)} ₽`;
//   if(isVerified) {
//     showElement(modalBuyIcon);
//   }
//   buyIdHiddenInput.value = currentId;
//   buyExchangeRateHiddenInput.value = exchangeRate;
//   buySendingCurrencyHiddenInput.value = Currency.RUBLE;
//   buyReceivingCurrencyHiddenInput.value = Currency.KEKS;
// };


// buyPaymentInput.addEventListener('input', onBuyPaymentChange);
// buyReceivingInput.addEventListener('input',onReceivingChange);

// modalBuySelect.addEventListener('change',onModalBuySelectChange);


// export {currentDatumOfSeller,openBuyModal,fillSellModal}
// /**в модал бай валидейшен */
