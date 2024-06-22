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
const modalBuyCloseBtn = modalBuy.querySelector('.modal__close-btn');

const modalBuyOverlay = modalBuy.querySelector('.modal__overlay');
const modalBuyBankCard = modalBuy.querySelector('#modal-buy-bank-card');
const currentDatumOfSeller = [];
const currentPayMethods = [];


const onDocumentKeydownForBuy = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideElement(modalBuy);
  }
};

const resetBuyFormValidation = () => {
  hideSuccessErrorMessages();
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
};

const openBuyModal = () => {
  body.classList.add('scroll-lock');
  showElement(modalBuy);
  document.addEventListener('keydown',onDocumentKeydownForBuy);
  modalBuyOverlay.addEventListener('click',closeBuyModal);
  modalBuyCloseBtn.addEventListener('click',closeBuyModal);
};

const fillSelectBuyOptions = (arrOfMethods) => {
  currentPayMethods.length = 0;
  currentPayMethods.push(...arrOfMethods);
  const firstElement = modalBuySelect.children[0];
  modalBuySelect.textContent = '';
  modalBuySelect.appendChild(firstElement);

  for (const method of arrOfMethods) {
    const methodName = method.provider;
    const selectOption = document.createElement('option');
    selectOption.textContent = methodName;
    selectOption.value = methodName;
    modalBuySelect.appendChild(selectOption);
  }
};

const onModalBuySelectChange = (evt) => {
  hideSuccessErrorMessages();
  if(evt.target.value !== 'Cash in person') {
    const isNecessaryObj = currentPayMethods.find((payObj) => payObj.provider === evt.target.value);
    modalBuyBankCard.value = isNecessaryObj.accountNumber;
  } else {
    modalBuyBankCard.value = '';
  }
};

const fillSellModal = (evt) => {
  const currentRow = evt.target.closest('.users-list__table-row');
  const currentDatum = arrOfSellers.find(({id}) => id === currentRow.dataset.rowId);
  const user = currentUser[0];
  const {wallet} = user;
  const {paymentMethods,exchangeRate,id:currentId,userName,minAmount,balance,isVerified} = currentDatum;

  getCurrentDatum(currentDatum,currentDatumOfSeller);
  fillSelectBuyOptions(paymentMethods);
  hideElement(modalBuyIcon);

  modalBuyCryptoWallet.value = wallet.address;
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


export {currentDatumOfSeller,openBuyModal,fillSellModal};
